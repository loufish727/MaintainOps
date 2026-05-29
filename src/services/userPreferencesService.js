(function () {
  const PREFERENCE_COLUMNS = "user_id, shop_reference_favorites, updated_at";

  function getUserPreferences(supabaseClient, userId) {
    return supabaseClient
      .from("user_preferences")
      .select(PREFERENCE_COLUMNS)
      .eq("user_id", userId)
      .maybeSingle();
  }

  function saveShopReferenceFavorites(supabaseClient, userId, favorites) {
    return supabaseClient
      .from("user_preferences")
      .upsert({
        user_id: userId,
        shop_reference_favorites: Array.isArray(favorites) ? favorites.filter(Boolean) : [],
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" })
      .select(PREFERENCE_COLUMNS)
      .single();
  }

  window.MaintainOpsUserPreferencesService = {
    getUserPreferences,
    saveShopReferenceFavorites,
  };
})();
