const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const migrationPath = path.join(root, "supabase", "migrations", "202607201200_work_order_type_taxonomy.sql");

(async () => {
  const { PGlite } = await import("@electric-sql/pglite");
  const database = new PGlite();

  try {
    await database.exec(`
      create table public.work_orders (
        id integer generated always as identity primary key,
        type text not null default 'reactive',
        constraint work_orders_type_check
          check (type in ('request', 'reactive', 'preventive', 'inspection', 'corrective'))
      );

      insert into public.work_orders (type)
      values ('request'), ('reactive'), ('preventive'), ('inspection'), ('corrective');

      create function public.enforce_work_order_assignment_role()
      returns trigger
      language plpgsql
      as $$
      begin
        raise exception 'assignment guard fired';
      end;
      $$;

      create trigger enforce_work_order_assignment_role
      before update on public.work_orders
      for each row
      execute function public.enforce_work_order_assignment_role();
    `);

    await database.exec(fs.readFileSync(migrationPath, "utf8"));

    const migrated = await database.query(`
      select type, count(*)::integer as count
      from public.work_orders
      group by type
      order by type
    `);
    assert.deepEqual(migrated.rows, [
      { type: "corrective", count: 3 },
      { type: "preventive", count: 2 },
    ]);

    const column = await database.query(`
      select column_default
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'work_orders'
        and column_name = 'type'
    `);
    assert.match(column.rows[0].column_default, /corrective/);

    await database.exec("insert into public.work_orders (type) values ('fabrication')");
    const fabrication = await database.query("select count(*)::integer as count from public.work_orders where type = 'fabrication'");
    assert.equal(fabrication.rows[0].count, 1);

    for (const legacyType of ["request", "reactive", "inspection"]) {
      await assert.rejects(
        database.exec(`insert into public.work_orders (type) values ('${legacyType}')`),
        /work_orders_type_check/
      );
    }

    const trigger = await database.query(`
      select tgenabled
      from pg_trigger
      where tgrelid = 'public.work_orders'::regclass
        and tgname = 'enforce_work_order_assignment_role'
    `);
    assert.equal(trigger.rows[0].tgenabled, "O");
    await assert.rejects(
      database.exec("update public.work_orders set type = type where id = 1"),
      /assignment guard fired/
    );

    console.log("work order type migration smoke passed");
  } finally {
    await database.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
