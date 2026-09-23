(()=>{var Tp=0,Gu=1,Ap=2;var gf=1,wh=2,vi=3,Vn=0,Rn=1,$t=2,ci=0,rr=1,Gn=2,Wu=3,Xu=4,Rp=5,fs=100,Cp=101,Pp=102,Ip=103,Lp=104,Dp=200,Up=201,Np=202,Op=203,dc=204,fc=205,Fp=206,Bp=207,kp=208,zp=209,Hp=210,Vp=211,Gp=212,Wp=213,Xp=214,qp=0,Yp=1,$p=2,yo=3,Kp=4,Zp=5,Jp=6,Qp=7,_f=0,jp=1,em=2,zi=0,Eh=1,Th=2,Ah=3,pa=4,tm=5,Rh=6,Ch=7,qu="attached",nm="detached",yf=300,hr=301,ur=302,Kr=303,pc=304,rl=306,ms=1e3,Ct=1001,Zr=1002,xn=1003,Ph=1004;var nr=1005;var Ht=1006,Gr=1007;var ii=1008;var wi=1009,xf=1010,vf=1011,Jr=1012,Ih=1013,gs=1014,En=1015,vn=1016,Lh=1017,Dh=1018,dr=1020,Mf=35902,Sf=1021,bf=1022,zn=1023,wf=1024,Ef=1025,ar=1026,fr=1027,Uh=1028,Nh=1029,Tf=1030,Oh=1031;var Fh=1033,fo=33776,po=33777,mo=33778,go=33779,mc=35840,gc=35841,_c=35842,yc=35843,xc=36196,vc=37492,Mc=37496,Sc=37808,bc=37809,wc=37810,Ec=37811,Tc=37812,Ac=37813,Rc=37814,Cc=37815,Pc=37816,Ic=37817,Lc=37818,Dc=37819,Uc=37820,Nc=37821,_o=36492,Oc=36494,Fc=36495,Af=36283,Bc=36284,kc=36285,zc=36286;var pr=2300,mr=2301,Il=2302,Yu=2400,$u=2401,Ku=2402,im=2500;var Rf=0,al=1,ma=2,sm=3200,rm=3201,Cf=0,am=1,Fi="",vt="srgb",en="srgb-linear",Bh="display-p3",ol="display-p3-linear",xo="linear",Tt="srgb",vo="rec709",Mo="p3";var Us=7680;var Zu=519,om=512,lm=513,cm=514,Pf=515,hm=516,um=517,dm=518,fm=519,Hc=35044,If=35048;var Ju="300 es",bi=2e3,So=2001,Hi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let i=this._listeners[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}},_n=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Qu=1234567,or=Math.PI/180,gr=180/Math.PI;function Hn(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(_n[s&255]+_n[s>>8&255]+_n[s>>16&255]+_n[s>>24&255]+"-"+_n[e&255]+_n[e>>8&255]+"-"+_n[e>>16&15|64]+_n[e>>24&255]+"-"+_n[t&63|128]+_n[t>>8&255]+"-"+_n[t>>16&255]+_n[t>>24&255]+_n[n&255]+_n[n>>8&255]+_n[n>>16&255]+_n[n>>24&255]).toLowerCase()}function Jt(s,e,t){return Math.max(e,Math.min(t,s))}function kh(s,e){return(s%e+e)%e}function pm(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function mm(s,e,t){return s!==e?(t-s)/(e-s):0}function Wr(s,e,t){return(1-t)*s+t*e}function gm(s,e,t,n){return Wr(s,e,1-Math.exp(-t*n))}function _m(s,e=1){return e-Math.abs(kh(s,e*2)-e)}function ym(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function xm(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function vm(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Mm(s,e){return s+Math.random()*(e-s)}function Sm(s){return s*(.5-Math.random())}function bm(s){s!==void 0&&(Qu=s);let e=Qu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function wm(s){return s*or}function Em(s){return s*gr}function Tm(s){return(s&s-1)===0&&s!==0}function Am(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Rm(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Cm(s,e,t,n,i){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":s.set(o*h,l*u,l*d,o*c);break;case"YZY":s.set(l*d,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*d,o*h,o*c);break;case"XZX":s.set(o*h,l*g,l*f,o*c);break;case"YXY":s.set(l*f,o*h,l*g,o*c);break;case"ZYZ":s.set(l*g,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function ni(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function bt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var dn={DEG2RAD:or,RAD2DEG:gr,generateUUID:Hn,clamp:Jt,euclideanModulo:kh,mapLinear:pm,inverseLerp:mm,lerp:Wr,damp:gm,pingpong:_m,smoothstep:ym,smootherstep:xm,randInt:vm,randFloat:Mm,randFloatSpread:Sm,seededRandom:bm,degToRad:wm,radToDeg:Em,isPowerOfTwo:Tm,ceilPowerOfTwo:Am,floorPowerOfTwo:Rm,setQuaternionFromProperEuler:Cm,normalize:bt,denormalize:ni},he=class s{constructor(e=0,t=0){s.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Jt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},lt=class s{constructor(e,t,n,i,r,a,o,l,c){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c)}set(e,t,n,i,r,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=i[0],m=i[3],p=i[6],M=i[1],y=i[4],S=i[7],F=i[2],A=i[5],C=i[8];return r[0]=a*_+o*M+l*F,r[3]=a*m+o*y+l*A,r[6]=a*p+o*S+l*C,r[1]=c*_+h*M+u*F,r[4]=c*m+h*y+u*A,r[7]=c*p+h*S+u*C,r[2]=d*_+f*M+g*F,r[5]=d*m+f*y+g*A,r[8]=d*p+f*S+g*C,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,g=t*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return e[0]=u*_,e[1]=(i*c-h*n)*_,e[2]=(o*n-i*a)*_,e[3]=d*_,e[4]=(h*t-i*l)*_,e[5]=(i*r-o*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ll.makeScale(e,t)),this}rotate(e){return this.premultiply(Ll.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ll.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ll=new lt;function Lf(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Qr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Pm(){let s=Qr("canvas");return s.style.display="block",s}var ju={};function zh(s){s in ju||(ju[s]=!0,console.warn(s))}function Im(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var ed=new lt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),td=new lt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ca={[en]:{transfer:xo,primaries:vo,toReference:s=>s,fromReference:s=>s},[vt]:{transfer:Tt,primaries:vo,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[ol]:{transfer:xo,primaries:Mo,toReference:s=>s.applyMatrix3(td),fromReference:s=>s.applyMatrix3(ed)},[Bh]:{transfer:Tt,primaries:Mo,toReference:s=>s.convertSRGBToLinear().applyMatrix3(td),fromReference:s=>s.applyMatrix3(ed).convertLinearToSRGB()}},Lm=new Set([en,ol]),gt={enabled:!0,_workingColorSpace:en,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Lm.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;let n=Ca[e].toReference,i=Ca[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return Ca[s].primaries},getTransfer:function(s){return s===Fi?xo:Ca[s].transfer}};function lr(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Dl(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Ns,Vc=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ns===void 0&&(Ns=Qr("canvas")),Ns.width=e.width,Ns.height=e.height;let n=Ns.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ns}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Qr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=lr(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(lr(t[n]/255)*255):t[n]=lr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Dm=0,bo=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Dm++}),this.uuid=Hn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Ul(i[a].image)):r.push(Ul(i[a]))}else r=Ul(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function Ul(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Vc.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Um=0,un=class s extends Hi{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=Ct,i=Ct,r=Ht,a=ii,o=zn,l=wi,c=s.DEFAULT_ANISOTROPY,h=Fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Um++}),this.uuid=Hn(),this.name="",this.source=new bo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new he(0,0),this.repeat=new he(1,1),this.center=new he(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==yf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ms:e.x=e.x-Math.floor(e.x);break;case Ct:e.x=e.x<0?0:1;break;case Zr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ms:e.y=e.y-Math.floor(e.y);break;case Ct:e.y=e.y<0?0:1;break;case Zr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};un.DEFAULT_IMAGE=null;un.DEFAULT_MAPPING=yf;un.DEFAULT_ANISOTROPY=1;var Et=class s{constructor(e=0,t=0,n=0,i=1){s.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(c+1)/2,S=(f+1)/2,F=(p+1)/2,A=(h+d)/4,C=(u+_)/4,P=(g+m)/4;return y>S&&y>F?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=A/n,r=C/n):S>F?S<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(S),n=A/i,r=P/i):F<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(F),n=C/r,i=P/r),this.set(n,i,r,t),this}let M=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-_)/M,this.z=(d-h)/M,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Gc=class extends Hi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Et(0,0,e,t),this.scissorTest=!1,this.viewport=new Et(0,0,e,t);let i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ht,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new un(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new bo(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Tn=class extends Gc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},wo=class extends un{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=xn,this.minFilter=xn,this.wrapR=Ct,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Wc=class extends un{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=xn,this.minFilter=xn,this.wrapR=Ct,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Cn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==d||c!==f||h!==g){let m=1-o,p=l*d+c*f+h*g+u*_,M=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){let F=Math.sqrt(y),A=Math.atan2(F,p*M);m=Math.sin(m*A)/F,o=Math.sin(o*A)/F}let S=o*M;if(l=l*m+d*S,c=c*m+f*S,h=h*m+g*S,u=u*m+_*S,m===1-o){let F=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=F,c*=F,h*=F,u*=F}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-o*f,e[t+2]=c*g+h*f+o*d-l*u,e[t+3]=h*g-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(r/2),d=l(n/2),f=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>u){let f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>u){let f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Jt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,r=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},T=class s{constructor(e=0,t=0,n=0){s.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(nd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(nd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-r*i),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=i+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Nl.copy(this).projectOnVector(e),this.sub(Nl)}reflect(e){return this.sub(Nl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Jt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Nl=new T,nd=new Cn,Wn=class{constructor(e=new T(1/0,1/0,1/0),t=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(jn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(jn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,jn):jn.fromBufferAttribute(r,a),jn.applyMatrix4(e.matrixWorld),this.expandByPoint(jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Pa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Pa.copy(n.boundingBox)),Pa.applyMatrix4(e.matrixWorld),this.union(Pa)}let i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,jn),jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ir),Ia.subVectors(this.max,Ir),Os.subVectors(e.a,Ir),Fs.subVectors(e.b,Ir),Bs.subVectors(e.c,Ir),Ii.subVectors(Fs,Os),Li.subVectors(Bs,Fs),as.subVectors(Os,Bs);let t=[0,-Ii.z,Ii.y,0,-Li.z,Li.y,0,-as.z,as.y,Ii.z,0,-Ii.x,Li.z,0,-Li.x,as.z,0,-as.x,-Ii.y,Ii.x,0,-Li.y,Li.x,0,-as.y,as.x,0];return!Ol(t,Os,Fs,Bs,Ia)||(t=[1,0,0,0,1,0,0,0,1],!Ol(t,Os,Fs,Bs,Ia))?!1:(La.crossVectors(Ii,Li),t=[La.x,La.y,La.z],Ol(t,Os,Fs,Bs,Ia))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(pi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},pi=[new T,new T,new T,new T,new T,new T,new T,new T],jn=new T,Pa=new Wn,Os=new T,Fs=new T,Bs=new T,Ii=new T,Li=new T,as=new T,Ir=new T,Ia=new T,La=new T,os=new T;function Ol(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){os.fromArray(s,r);let o=i.x*Math.abs(os.x)+i.y*Math.abs(os.y)+i.z*Math.abs(os.z),l=e.dot(os),c=t.dot(os),h=n.dot(os);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Nm=new Wn,Lr=new T,Fl=new T,On=class{constructor(e=new T,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Nm.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Lr.subVectors(e,this.center);let t=Lr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Lr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Fl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Lr.copy(e.center).add(Fl)),this.expandByPoint(Lr.copy(e.center).sub(Fl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},mi=new T,Bl=new T,Da=new T,Di=new T,kl=new T,Ua=new T,zl=new T,_s=class{constructor(e=new T,t=new T(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,mi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=mi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(mi.copy(this.origin).addScaledVector(this.direction,t),mi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Bl.copy(e).add(t).multiplyScalar(.5),Da.copy(t).sub(e).normalize(),Di.copy(this.origin).sub(Bl);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Da),o=Di.dot(this.direction),l=-Di.dot(Da),c=Di.lengthSq(),h=Math.abs(1-a*a),u,d,f,g;if(h>0)if(u=a*l-o,d=a*o-l,g=r*h,u>=0)if(d>=-g)if(d<=g){let _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Bl).addScaledVector(Da,d),f}intersectSphere(e,t){mi.subVectors(e.center,this.origin);let n=mi.dot(this.direction),i=mi.dot(mi)-n*n,r=e.radius*e.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,mi)!==null}intersectTriangle(e,t,n,i,r){kl.subVectors(t,e),Ua.subVectors(n,e),zl.crossVectors(kl,Ua);let a=this.direction.dot(zl),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Di.subVectors(this.origin,e);let l=o*this.direction.dot(Ua.crossVectors(Di,Ua));if(l<0)return null;let c=o*this.direction.dot(kl.cross(Di));if(c<0||l+c>a)return null;let h=-o*Di.dot(zl);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Qe=class s{constructor(e,t,n,i,r,a,o,l,c,h,u,d,f,g,_,m){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c,h,u,d,f,g,_,m)}set(e,t,n,i,r,a,o,l,c,h,u,d,f,g,_,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/ks.setFromMatrixColumn(e,0).length(),r=1/ks.setFromMatrixColumn(e,1).length(),a=1/ks.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=a*h,f=a*u,g=o*h,_=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-_*c,t[9]=-o*l,t[2]=_-d*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d+_*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=_+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d-_*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*h,f=a*u,g=o*h,_=o*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){let d=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=a*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Om,e,Fm)}lookAt(e,t,n){let i=this.elements;return Un.subVectors(e,t),Un.lengthSq()===0&&(Un.z=1),Un.normalize(),Ui.crossVectors(n,Un),Ui.lengthSq()===0&&(Math.abs(n.z)===1?Un.x+=1e-4:Un.z+=1e-4,Un.normalize(),Ui.crossVectors(n,Un)),Ui.normalize(),Na.crossVectors(Un,Ui),i[0]=Ui.x,i[4]=Na.x,i[8]=Un.x,i[1]=Ui.y,i[5]=Na.y,i[9]=Un.y,i[2]=Ui.z,i[6]=Na.z,i[10]=Un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],M=n[3],y=n[7],S=n[11],F=n[15],A=i[0],C=i[4],P=i[8],b=i[12],x=i[1],L=i[5],H=i[9],z=i[13],B=i[2],te=i[6],V=i[10],se=i[14],ee=i[3],Ee=i[7],Me=i[11],Pe=i[15];return r[0]=a*A+o*x+l*B+c*ee,r[4]=a*C+o*L+l*te+c*Ee,r[8]=a*P+o*H+l*V+c*Me,r[12]=a*b+o*z+l*se+c*Pe,r[1]=h*A+u*x+d*B+f*ee,r[5]=h*C+u*L+d*te+f*Ee,r[9]=h*P+u*H+d*V+f*Me,r[13]=h*b+u*z+d*se+f*Pe,r[2]=g*A+_*x+m*B+p*ee,r[6]=g*C+_*L+m*te+p*Ee,r[10]=g*P+_*H+m*V+p*Me,r[14]=g*b+_*z+m*se+p*Pe,r[3]=M*A+y*x+S*B+F*ee,r[7]=M*C+y*L+S*te+F*Ee,r[11]=M*P+y*H+S*V+F*Me,r[15]=M*b+y*z+S*se+F*Pe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*l*u-i*c*u-r*o*d+n*c*d+i*o*f-n*l*f)+_*(+t*l*f-t*c*d+r*a*d-i*a*f+i*c*h-r*l*h)+m*(+t*c*u-t*o*f-r*a*u+n*a*f+r*o*h-n*c*h)+p*(-i*o*h-t*l*u+t*o*d+i*a*u-n*a*d+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],M=u*m*c-_*d*c+_*l*f-o*m*f-u*l*p+o*d*p,y=g*d*c-h*m*c-g*l*f+a*m*f+h*l*p-a*d*p,S=h*_*c-g*u*c+g*o*f-a*_*f-h*o*p+a*u*p,F=g*u*l-h*_*l-g*o*d+a*_*d+h*o*m-a*u*m,A=t*M+n*y+i*S+r*F;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/A;return e[0]=M*C,e[1]=(_*d*r-u*m*r-_*i*f+n*m*f+u*i*p-n*d*p)*C,e[2]=(o*m*r-_*l*r+_*i*c-n*m*c-o*i*p+n*l*p)*C,e[3]=(u*l*r-o*d*r-u*i*c+n*d*c+o*i*f-n*l*f)*C,e[4]=y*C,e[5]=(h*m*r-g*d*r+g*i*f-t*m*f-h*i*p+t*d*p)*C,e[6]=(g*l*r-a*m*r-g*i*c+t*m*c+a*i*p-t*l*p)*C,e[7]=(a*d*r-h*l*r+h*i*c-t*d*c-a*i*f+t*l*f)*C,e[8]=S*C,e[9]=(g*u*r-h*_*r-g*n*f+t*_*f+h*n*p-t*u*p)*C,e[10]=(a*_*r-g*o*r+g*n*c-t*_*c-a*n*p+t*o*p)*C,e[11]=(h*o*r-a*u*r-h*n*c+t*u*c+a*n*f-t*o*f)*C,e[12]=F*C,e[13]=(h*_*i-g*u*i+g*n*d-t*_*d-h*n*m+t*u*m)*C,e[14]=(g*o*i-a*_*i-g*n*l+t*_*l+a*n*m-t*o*m)*C,e[15]=(a*u*i-h*o*i+h*n*l-t*u*l-a*n*d+t*o*d)*C,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,g=r*u,_=a*h,m=a*u,p=o*u,M=l*c,y=l*h,S=l*u,F=n.x,A=n.y,C=n.z;return i[0]=(1-(_+p))*F,i[1]=(f+S)*F,i[2]=(g-y)*F,i[3]=0,i[4]=(f-S)*A,i[5]=(1-(d+p))*A,i[6]=(m+M)*A,i[7]=0,i[8]=(g+y)*C,i[9]=(m-M)*C,i[10]=(1-(d+_))*C,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,r=ks.set(i[0],i[1],i[2]).length(),a=ks.set(i[4],i[5],i[6]).length(),o=ks.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],ei.copy(this);let c=1/r,h=1/a,u=1/o;return ei.elements[0]*=c,ei.elements[1]*=c,ei.elements[2]*=c,ei.elements[4]*=h,ei.elements[5]*=h,ei.elements[6]*=h,ei.elements[8]*=u,ei.elements[9]*=u,ei.elements[10]*=u,t.setFromRotationMatrix(ei),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,a,o=bi){let l=this.elements,c=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i),f,g;if(o===bi)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===So)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=bi){let l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(a-r),d=(t+e)*c,f=(n+i)*h,g,_;if(o===bi)g=(a+r)*u,_=-2*u;else if(o===So)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ks=new T,ei=new Qe,Om=new T(0,0,0),Fm=new T(1,1,1),Ui=new T,Na=new T,Un=new T,id=new Qe,sd=new Cn,Xn=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Jt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Jt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Jt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Jt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Jt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return id.makeRotationFromQuaternion(e),this.setFromRotationMatrix(id,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return sd.setFromEuler(this),this.setFromQuaternion(sd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Xn.DEFAULT_ORDER="XYZ";var jr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Bm=0,rd=new T,zs=new Cn,gi=new Qe,Oa=new T,Dr=new T,km=new T,zm=new Cn,ad=new T(1,0,0),od=new T(0,1,0),ld=new T(0,0,1),cd={type:"added"},Hm={type:"removed"},Hs={type:"childadded",child:null},Hl={type:"childremoved",child:null},kt=class s extends Hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Bm++}),this.uuid=Hn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new T,t=new Xn,n=new Cn,i=new T(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Qe},normalMatrix:{value:new lt}}),this.matrix=new Qe,this.matrixWorld=new Qe,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return zs.setFromAxisAngle(e,t),this.quaternion.multiply(zs),this}rotateOnWorldAxis(e,t){return zs.setFromAxisAngle(e,t),this.quaternion.premultiply(zs),this}rotateX(e){return this.rotateOnAxis(ad,e)}rotateY(e){return this.rotateOnAxis(od,e)}rotateZ(e){return this.rotateOnAxis(ld,e)}translateOnAxis(e,t){return rd.copy(e).applyQuaternion(this.quaternion),this.position.add(rd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ad,e)}translateY(e){return this.translateOnAxis(od,e)}translateZ(e){return this.translateOnAxis(ld,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(gi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Oa.copy(e):Oa.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Dr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gi.lookAt(Dr,Oa,this.up):gi.lookAt(Oa,Dr,this.up),this.quaternion.setFromRotationMatrix(gi),i&&(gi.extractRotation(i.matrixWorld),zs.setFromRotationMatrix(gi),this.quaternion.premultiply(zs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(cd),Hs.child=e,this.dispatchEvent(Hs),Hs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Hm),Hl.child=e,this.dispatchEvent(Hl),Hl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),gi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),gi.multiply(e.parent.matrixWorld)),e.applyMatrix4(gi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(cd),Hs.child=e,this.dispatchEvent(Hs),Hs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Dr,e,km),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Dr,zm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};kt.DEFAULT_UP=new T(0,1,0);kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ti=new T,_i=new T,Vl=new T,yi=new T,Vs=new T,Gs=new T,hd=new T,Gl=new T,Wl=new T,Xl=new T,Bi=class s{constructor(e=new T,t=new T,n=new T){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),ti.subVectors(e,t),i.cross(ti);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){ti.subVectors(i,t),_i.subVectors(n,t),Vl.subVectors(e,t);let a=ti.dot(ti),o=ti.dot(_i),l=ti.dot(Vl),c=_i.dot(_i),h=_i.dot(Vl),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,yi)===null?!1:yi.x>=0&&yi.y>=0&&yi.x+yi.y<=1}static getInterpolation(e,t,n,i,r,a,o,l){return this.getBarycoord(e,t,n,i,yi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,yi.x),l.addScaledVector(a,yi.y),l.addScaledVector(o,yi.z),l)}static isFrontFacing(e,t,n,i){return ti.subVectors(n,t),_i.subVectors(e,t),ti.cross(_i).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ti.subVectors(this.c,this.b),_i.subVectors(this.a,this.b),ti.cross(_i).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,a,o;Vs.subVectors(i,n),Gs.subVectors(r,n),Gl.subVectors(e,n);let l=Vs.dot(Gl),c=Gs.dot(Gl);if(l<=0&&c<=0)return t.copy(n);Wl.subVectors(e,i);let h=Vs.dot(Wl),u=Gs.dot(Wl);if(h>=0&&u<=h)return t.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Vs,a);Xl.subVectors(e,r);let f=Vs.dot(Xl),g=Gs.dot(Xl);if(g>=0&&f<=g)return t.copy(r);let _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Gs,o);let m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return hd.subVectors(r,i),o=(u-h)/(u-h+(f-g)),t.copy(i).addScaledVector(hd,o);let p=1/(m+_+d);return a=_*p,o=d*p,t.copy(n).addScaledVector(Vs,a).addScaledVector(Gs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Df={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ni={h:0,s:0,l:0},Fa={h:0,s:0,l:0};function ql(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var Ne=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=vt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,gt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=gt.workingColorSpace){return this.r=e,this.g=t,this.b=n,gt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=gt.workingColorSpace){if(e=kh(e,1),t=Jt(t,0,1),n=Jt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=ql(a,r,e+1/3),this.g=ql(a,r,e),this.b=ql(a,r,e-1/3)}return gt.toWorkingColorSpace(this,i),this}setStyle(e,t=vt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=vt){let n=Df[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=lr(e.r),this.g=lr(e.g),this.b=lr(e.b),this}copyLinearToSRGB(e){return this.r=Dl(e.r),this.g=Dl(e.g),this.b=Dl(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=vt){return gt.fromWorkingColorSpace(yn.copy(this),e),Math.round(Jt(yn.r*255,0,255))*65536+Math.round(Jt(yn.g*255,0,255))*256+Math.round(Jt(yn.b*255,0,255))}getHexString(e=vt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=gt.workingColorSpace){gt.fromWorkingColorSpace(yn.copy(this),t);let n=yn.r,i=yn.g,r=yn.b,a=Math.max(n,i,r),o=Math.min(n,i,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=gt.workingColorSpace){return gt.fromWorkingColorSpace(yn.copy(this),t),e.r=yn.r,e.g=yn.g,e.b=yn.b,e}getStyle(e=vt){gt.fromWorkingColorSpace(yn.copy(this),e);let t=yn.r,n=yn.g,i=yn.b;return e!==vt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Ni),this.setHSL(Ni.h+e,Ni.s+t,Ni.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ni),e.getHSL(Fa);let n=Wr(Ni.h,Fa.h,t),i=Wr(Ni.s,Fa.s,t),r=Wr(Ni.l,Fa.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},yn=new Ne;Ne.NAMES=Df;var Vm=0,Pn=class extends Hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vm++}),this.uuid=Hn(),this.name="",this.type="Material",this.blending=rr,this.side=Vn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=dc,this.blendDst=fc,this.blendEquation=fs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ne(0,0,0),this.blendAlpha=0,this.depthFunc=yo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Zu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Us,this.stencilZFail=Us,this.stencilZPass=Us,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==rr&&(n.blending=this.blending),this.side!==Vn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==dc&&(n.blendSrc=this.blendSrc),this.blendDst!==fc&&(n.blendDst=this.blendDst),this.blendEquation!==fs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==yo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Zu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Us&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Us&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Us&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}onBeforeRender(){console.warn("Material: onBeforeRender() has been removed.")}},Pt=class extends Pn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xn,this.combine=_f,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Si=Gm();function Gm(){let s=new ArrayBuffer(4),e=new Float32Array(s),t=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}let r=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(c&8388608)===0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,r[l]=c|h}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:a,offsetTable:o}}function Wm(s){Math.abs(s)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),s=Jt(s,-65504,65504),Si.floatView[0]=s;let e=Si.uint32View[0],t=e>>23&511;return Si.baseTable[t]+((e&8388607)>>Si.shiftTable[t])}function Xm(s){let e=s>>10;return Si.uint32View[0]=Si.mantissaTable[Si.offsetTable[e]+(s&1023)]+Si.exponentTable[e],Si.floatView[0]}var ga={toHalfFloat:Wm,fromHalfFloat:Xm},Zt=new T,Ba=new he,rn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Hc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return zh("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ba.fromBufferAttribute(this,t),Ba.applyMatrix3(e),this.setXY(t,Ba.x,Ba.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix3(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix4(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyNormalMatrix(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.transformDirection(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ni(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=bt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ni(t,this.array)),t}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ni(t,this.array)),t}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ni(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ni(t,this.array)),t}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),i=bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),i=bt(i,this.array),r=bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Hc&&(e.usage=this.usage),e}};var Eo=class extends rn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var To=class extends rn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var dt=class extends rn{constructor(e,t,n){super(new Float32Array(e),t,n)}},qm=0,kn=new Qe,Yl=new kt,Ws=new T,Nn=new Wn,Ur=new Wn,hn=new T,Ot=class s extends Hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qm++}),this.uuid=Hn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Lf(e)?To:Eo)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new lt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return kn.makeRotationFromQuaternion(e),this.applyMatrix4(kn),this}rotateX(e){return kn.makeRotationX(e),this.applyMatrix4(kn),this}rotateY(e){return kn.makeRotationY(e),this.applyMatrix4(kn),this}rotateZ(e){return kn.makeRotationZ(e),this.applyMatrix4(kn),this}translate(e,t,n){return kn.makeTranslation(e,t,n),this.applyMatrix4(kn),this}scale(e,t,n){return kn.makeScale(e,t,n),this.applyMatrix4(kn),this}lookAt(e){return Yl.lookAt(e),Yl.updateMatrix(),this.applyMatrix4(Yl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ws).negate(),this.translate(Ws.x,Ws.y,Ws.z),this}setFromPoints(e){let t=[];for(let n=0,i=e.length;n<i;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new dt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];Nn.setFromBufferAttribute(r),this.morphTargetsRelative?(hn.addVectors(this.boundingBox.min,Nn.min),this.boundingBox.expandByPoint(hn),hn.addVectors(this.boundingBox.max,Nn.max),this.boundingBox.expandByPoint(hn)):(this.boundingBox.expandByPoint(Nn.min),this.boundingBox.expandByPoint(Nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new On);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new T,1/0);return}if(e){let n=this.boundingSphere.center;if(Nn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Ur.setFromBufferAttribute(o),this.morphTargetsRelative?(hn.addVectors(Nn.min,Ur.min),Nn.expandByPoint(hn),hn.addVectors(Nn.max,Ur.max),Nn.expandByPoint(hn)):(Nn.expandByPoint(Ur.min),Nn.expandByPoint(Ur.max))}Nn.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)hn.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(hn));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)hn.fromBufferAttribute(o,c),l&&(Ws.fromBufferAttribute(e,c),hn.add(Ws)),i=Math.max(i,n.distanceToSquared(hn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new rn(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let P=0;P<n.count;P++)o[P]=new T,l[P]=new T;let c=new T,h=new T,u=new T,d=new he,f=new he,g=new he,_=new T,m=new T;function p(P,b,x){c.fromBufferAttribute(n,P),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,x),d.fromBufferAttribute(r,P),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,x),h.sub(c),u.sub(c),f.sub(d),g.sub(d);let L=1/(f.x*g.y-g.x*f.y);isFinite(L)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(L),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(L),o[P].add(_),o[b].add(_),o[x].add(_),l[P].add(m),l[b].add(m),l[x].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let P=0,b=M.length;P<b;++P){let x=M[P],L=x.start,H=x.count;for(let z=L,B=L+H;z<B;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}let y=new T,S=new T,F=new T,A=new T;function C(P){F.fromBufferAttribute(i,P),A.copy(F);let b=o[P];y.copy(b),y.sub(F.multiplyScalar(F.dot(b))).normalize(),S.crossVectors(A,b);let L=S.dot(l[P])<0?-1:1;a.setXYZW(P,y.x,y.y,y.z,L)}for(let P=0,b=M.length;P<b;++P){let x=M[P],L=x.start,H=x.count;for(let z=L,B=L+H;z<B;z+=3)C(e.getX(z+0)),C(e.getX(z+1)),C(e.getX(z+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new rn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new T,r=new T,a=new T,o=new T,l=new T,c=new T,h=new T,u=new T;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)hn.fromBufferAttribute(e,t),hn.normalize(),e.setXYZ(t,hn.x,hn.y,hn.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),f=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new rn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},ud=new Qe,ls=new _s,ka=new On,dd=new T,Xs=new T,qs=new T,Ys=new T,$l=new T,za=new T,Ha=new he,Va=new he,Ga=new he,fd=new T,pd=new T,md=new T,Wa=new T,Xa=new T,Xt=class extends kt{constructor(e=new Ot,t=new Pt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(r&&o){za.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&($l.fromBufferAttribute(u,e),a?za.addScaledVector($l,h):za.addScaledVector($l.sub(t),h))}t.add(za)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ka.copy(n.boundingSphere),ka.applyMatrix4(r),ls.copy(e.ray).recast(e.near),!(ka.containsPoint(ls.origin)===!1&&(ls.intersectSphere(ka,dd)===null||ls.origin.distanceToSquared(dd)>(e.far-e.near)**2))&&(ud.copy(r).invert(),ls.copy(e.ray).applyMatrix4(ud),!(n.boundingBox!==null&&ls.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ls)))}_computeIntersections(e,t,n){let i,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){let m=d[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),y=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let S=M,F=y;S<F;S+=3){let A=o.getX(S),C=o.getX(S+1),P=o.getX(S+2);i=qa(this,p,e,n,c,h,u,A,C,P),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let M=o.getX(m),y=o.getX(m+1),S=o.getX(m+2);i=qa(this,a,e,n,c,h,u,M,y,S),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){let m=d[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),y=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let S=M,F=y;S<F;S+=3){let A=S,C=S+1,P=S+2;i=qa(this,p,e,n,c,h,u,A,C,P),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let M=m,y=m+1,S=m+2;i=qa(this,a,e,n,c,h,u,M,y,S),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}};function Ym(s,e,t,n,i,r,a,o){let l;if(e.side===Rn?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,e.side===Vn,o),l===null)return null;Xa.copy(o),Xa.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(Xa);return c<t.near||c>t.far?null:{distance:c,point:Xa.clone(),object:s}}function qa(s,e,t,n,i,r,a,o,l,c){s.getVertexPosition(o,Xs),s.getVertexPosition(l,qs),s.getVertexPosition(c,Ys);let h=Ym(s,e,t,n,Xs,qs,Ys,Wa);if(h){i&&(Ha.fromBufferAttribute(i,o),Va.fromBufferAttribute(i,l),Ga.fromBufferAttribute(i,c),h.uv=Bi.getInterpolation(Wa,Xs,qs,Ys,Ha,Va,Ga,new he)),r&&(Ha.fromBufferAttribute(r,o),Va.fromBufferAttribute(r,l),Ga.fromBufferAttribute(r,c),h.uv1=Bi.getInterpolation(Wa,Xs,qs,Ys,Ha,Va,Ga,new he)),a&&(fd.fromBufferAttribute(a,o),pd.fromBufferAttribute(a,l),md.fromBufferAttribute(a,c),h.normal=Bi.getInterpolation(Wa,Xs,qs,Ys,fd,pd,md,new T),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new T,materialIndex:0};Bi.getNormal(Xs,qs,Ys,u.normal),h.face=u}return h}var hi=class s extends Ot{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new dt(c,3)),this.setAttribute("normal",new dt(h,3)),this.setAttribute("uv",new dt(u,2));function g(_,m,p,M,y,S,F,A,C,P,b){let x=S/C,L=F/P,H=S/2,z=F/2,B=A/2,te=C+1,V=P+1,se=0,ee=0,Ee=new T;for(let Me=0;Me<V;Me++){let Pe=Me*L-z;for(let ze=0;ze<te;ze++){let Ye=ze*x-H;Ee[_]=Ye*M,Ee[m]=Pe*y,Ee[p]=B,c.push(Ee.x,Ee.y,Ee.z),Ee[_]=0,Ee[m]=0,Ee[p]=A>0?1:-1,h.push(Ee.x,Ee.y,Ee.z),u.push(ze/C),u.push(1-Me/P),se+=1}}for(let Me=0;Me<P;Me++)for(let Pe=0;Pe<C;Pe++){let ze=d+Pe+te*Me,Ye=d+Pe+te*(Me+1),ie=d+(Pe+1)+te*(Me+1),ue=d+(Pe+1)+te*Me;l.push(ze,Ye,ue),l.push(Ye,ie,ue),ee+=6}o.addGroup(f,ee,b),f+=ee,d+=se}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function _r(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function wn(s){let e={};for(let t=0;t<s.length;t++){let n=_r(s[t]);for(let i in n)e[i]=n[i]}return e}function $m(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Uf(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:gt.workingColorSpace}var Ji={clone:_r,merge:wn},Km=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,an=class extends Pn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Km,this.fragmentShader=Zm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=_r(e.uniforms),this.uniformsGroups=$m(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Ao=class extends kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qe,this.projectionMatrix=new Qe,this.projectionMatrixInverse=new Qe,this.coordinateSystem=bi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Oi=new T,gd=new he,_d=new he,sn=class extends Ao{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=gr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(or*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return gr*2*Math.atan(Math.tan(or*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z),Oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z)}getViewSize(e,t){return this.getViewBounds(e,gd,_d),t.subVectors(_d,gd)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(or*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},$s=-90,Ks=1,Xc=class extends kt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new sn($s,Ks,e,t);i.layers=this.layers,this.add(i);let r=new sn($s,Ks,e,t);r.layers=this.layers,this.add(r);let a=new sn($s,Ks,e,t);a.layers=this.layers,this.add(a);let o=new sn($s,Ks,e,t);o.layers=this.layers,this.add(o);let l=new sn($s,Ks,e,t);l.layers=this.layers,this.add(l);let c=new sn($s,Ks,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===bi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===So)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Ro=class extends un{constructor(e,t,n,i,r,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:hr,super(e,t,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},qc=class extends Tn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ro(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ht}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new hi(5,5,5),r=new an({name:"CubemapFromEquirect",uniforms:_r(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Rn,blending:ci});r.uniforms.tEquirect.value=t;let a=new Xt(i,r),o=t.minFilter;return t.minFilter===ii&&(t.minFilter=Ht),new Xc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}},Kl=new T,Jm=new T,Qm=new lt,Mi=class{constructor(e=new T(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Kl.subVectors(n,t).cross(Jm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Kl),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Qm.getNormalMatrix(e),i=this.coplanarPoint(Kl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},cs=new On,Ya=new T,ea=class{constructor(e=new Mi,t=new Mi,n=new Mi,i=new Mi,r=new Mi,a=new Mi){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=bi){let n=this.planes,i=e.elements,r=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],g=i[9],_=i[10],m=i[11],p=i[12],M=i[13],y=i[14],S=i[15];if(n[0].setComponents(l-r,d-c,m-f,S-p).normalize(),n[1].setComponents(l+r,d+c,m+f,S+p).normalize(),n[2].setComponents(l+a,d+h,m+g,S+M).normalize(),n[3].setComponents(l-a,d-h,m-g,S-M).normalize(),n[4].setComponents(l-o,d-u,m-_,S-y).normalize(),t===bi)n[5].setComponents(l+o,d+u,m+_,S+y).normalize();else if(t===So)n[5].setComponents(o,u,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),cs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),cs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(cs)}intersectsSprite(e){return cs.center.set(0,0,0),cs.radius=.7071067811865476,cs.applyMatrix4(e.matrixWorld),this.intersectsSphere(cs)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Ya.x=i.normal.x>0?e.max.x:e.min.x,Ya.y=i.normal.y>0?e.max.y:e.min.y,Ya.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ya)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Nf(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function jm(s){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){let h=l.array,u=l._updateRange,d=l.updateRanges;if(s.bindBuffer(c,o),u.count===-1&&d.length===0&&s.bufferSubData(c,0,h),d.length!==0){for(let f=0,g=d.length;f<g;f++){let _=d[f];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}u.count!==-1&&(s.bufferSubData(c,u.offset*h.BYTES_PER_ELEMENT,h,u.offset,u.count),u.count=-1),l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(s.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var yr=class s extends Ot{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=e/o,d=t/l,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){let M=p*d-a;for(let y=0;y<c;y++){let S=y*u-r;g.push(S,-M,0),_.push(0,0,1),m.push(y/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<o;M++){let y=M+c*p,S=M+c*(p+1),F=M+1+c*(p+1),A=M+1+c*p;f.push(y,S,A),f.push(S,F,A)}this.setIndex(f),this.setAttribute("position",new dt(g,3)),this.setAttribute("normal",new dt(_,3)),this.setAttribute("uv",new dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},e0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,t0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,n0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,i0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,s0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,r0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,a0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT )
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN )
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,o0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,l0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,c0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,h0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,u0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,d0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,f0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,p0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,m0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,g0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,y0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,x0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,v0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,M0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,S0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,b0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,w0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,E0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,T0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,A0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,R0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,C0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,P0="gl_FragColor = linearToOutputTexel( gl_FragColor );",I0=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,L0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,D0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif

#endif`,U0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,N0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,O0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,F0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,B0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,k0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,z0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,H0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,V0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,G0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,W0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,X0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,q0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Y0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,$0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,K0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Z0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,J0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Q0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,j0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,eg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,tg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ng=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ig=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ag=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );

	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,og=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,lg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,cg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ug=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,dg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,fg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,pg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,gg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_g=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,yg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,xg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Sg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,bg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,wg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Eg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Tg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ag=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Rg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Cg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Pg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ig=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Lg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Dg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ug=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ng=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;

		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Og=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Fg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Bg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,kg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,zg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Hg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Gg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Wg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Xg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,qg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Yg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,$g=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;

				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;

				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;

		#else

			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );

		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Kg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Zg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Jg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Qg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,jg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,e_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,t_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,n_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,i_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,s_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,r_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,a_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,o_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,l_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,c_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,h_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,u_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,d_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,f_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,p_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,m_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,g_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,__=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,y_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,v_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,M_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,S_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,b_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,w_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,E_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,T_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,A_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,R_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,C_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,P_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,I_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,L_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ot={alphahash_fragment:e0,alphahash_pars_fragment:t0,alphamap_fragment:n0,alphamap_pars_fragment:i0,alphatest_fragment:s0,alphatest_pars_fragment:r0,aomap_fragment:a0,aomap_pars_fragment:o0,batching_pars_vertex:l0,batching_vertex:c0,begin_vertex:h0,beginnormal_vertex:u0,bsdfs:d0,iridescence_fragment:f0,bumpmap_pars_fragment:p0,clipping_planes_fragment:m0,clipping_planes_pars_fragment:g0,clipping_planes_pars_vertex:_0,clipping_planes_vertex:y0,color_fragment:x0,color_pars_fragment:v0,color_pars_vertex:M0,color_vertex:S0,common:b0,cube_uv_reflection_fragment:w0,defaultnormal_vertex:E0,displacementmap_pars_vertex:T0,displacementmap_vertex:A0,emissivemap_fragment:R0,emissivemap_pars_fragment:C0,colorspace_fragment:P0,colorspace_pars_fragment:I0,envmap_fragment:L0,envmap_common_pars_fragment:D0,envmap_pars_fragment:U0,envmap_pars_vertex:N0,envmap_physical_pars_fragment:q0,envmap_vertex:O0,fog_vertex:F0,fog_pars_vertex:B0,fog_fragment:k0,fog_pars_fragment:z0,gradientmap_pars_fragment:H0,lightmap_pars_fragment:V0,lights_lambert_fragment:G0,lights_lambert_pars_fragment:W0,lights_pars_begin:X0,lights_toon_fragment:Y0,lights_toon_pars_fragment:$0,lights_phong_fragment:K0,lights_phong_pars_fragment:Z0,lights_physical_fragment:J0,lights_physical_pars_fragment:Q0,lights_fragment_begin:j0,lights_fragment_maps:eg,lights_fragment_end:tg,logdepthbuf_fragment:ng,logdepthbuf_pars_fragment:ig,logdepthbuf_pars_vertex:sg,logdepthbuf_vertex:rg,map_fragment:ag,map_pars_fragment:og,map_particle_fragment:lg,map_particle_pars_fragment:cg,metalnessmap_fragment:hg,metalnessmap_pars_fragment:ug,morphinstance_vertex:dg,morphcolor_vertex:fg,morphnormal_vertex:pg,morphtarget_pars_vertex:mg,morphtarget_vertex:gg,normal_fragment_begin:_g,normal_fragment_maps:yg,normal_pars_fragment:xg,normal_pars_vertex:vg,normal_vertex:Mg,normalmap_pars_fragment:Sg,clearcoat_normal_fragment_begin:bg,clearcoat_normal_fragment_maps:wg,clearcoat_pars_fragment:Eg,iridescence_pars_fragment:Tg,opaque_fragment:Ag,packing:Rg,premultiplied_alpha_fragment:Cg,project_vertex:Pg,dithering_fragment:Ig,dithering_pars_fragment:Lg,roughnessmap_fragment:Dg,roughnessmap_pars_fragment:Ug,shadowmap_pars_fragment:Ng,shadowmap_pars_vertex:Og,shadowmap_vertex:Fg,shadowmask_pars_fragment:Bg,skinbase_vertex:kg,skinning_pars_vertex:zg,skinning_vertex:Hg,skinnormal_vertex:Vg,specularmap_fragment:Gg,specularmap_pars_fragment:Wg,tonemapping_fragment:Xg,tonemapping_pars_fragment:qg,transmission_fragment:Yg,transmission_pars_fragment:$g,uv_pars_fragment:Kg,uv_pars_vertex:Zg,uv_vertex:Jg,worldpos_vertex:Qg,background_vert:jg,background_frag:e_,backgroundCube_vert:t_,backgroundCube_frag:n_,cube_vert:i_,cube_frag:s_,depth_vert:r_,depth_frag:a_,distanceRGBA_vert:o_,distanceRGBA_frag:l_,equirect_vert:c_,equirect_frag:h_,linedashed_vert:u_,linedashed_frag:d_,meshbasic_vert:f_,meshbasic_frag:p_,meshlambert_vert:m_,meshlambert_frag:g_,meshmatcap_vert:__,meshmatcap_frag:y_,meshnormal_vert:x_,meshnormal_frag:v_,meshphong_vert:M_,meshphong_frag:S_,meshphysical_vert:b_,meshphysical_frag:w_,meshtoon_vert:E_,meshtoon_frag:T_,points_vert:A_,points_frag:R_,shadow_vert:C_,shadow_frag:P_,sprite_vert:I_,sprite_frag:L_},we={common:{diffuse:{value:new Ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new lt}},envmap:{envMap:{value:null},envMapRotation:{value:new lt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new lt},normalScale:{value:new he(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0},uvTransform:{value:new lt}},sprite:{diffuse:{value:new Ne(16777215)},opacity:{value:1},center:{value:new he(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}}},li={basic:{uniforms:wn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.fog]),vertexShader:ot.meshbasic_vert,fragmentShader:ot.meshbasic_frag},lambert:{uniforms:wn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new Ne(0)}}]),vertexShader:ot.meshlambert_vert,fragmentShader:ot.meshlambert_frag},phong:{uniforms:wn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new Ne(0)},specular:{value:new Ne(1118481)},shininess:{value:30}}]),vertexShader:ot.meshphong_vert,fragmentShader:ot.meshphong_frag},standard:{uniforms:wn([we.common,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.roughnessmap,we.metalnessmap,we.fog,we.lights,{emissive:{value:new Ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag},toon:{uniforms:wn([we.common,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.gradientmap,we.fog,we.lights,{emissive:{value:new Ne(0)}}]),vertexShader:ot.meshtoon_vert,fragmentShader:ot.meshtoon_frag},matcap:{uniforms:wn([we.common,we.bumpmap,we.normalmap,we.displacementmap,we.fog,{matcap:{value:null}}]),vertexShader:ot.meshmatcap_vert,fragmentShader:ot.meshmatcap_frag},points:{uniforms:wn([we.points,we.fog]),vertexShader:ot.points_vert,fragmentShader:ot.points_frag},dashed:{uniforms:wn([we.common,we.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ot.linedashed_vert,fragmentShader:ot.linedashed_frag},depth:{uniforms:wn([we.common,we.displacementmap]),vertexShader:ot.depth_vert,fragmentShader:ot.depth_frag},normal:{uniforms:wn([we.common,we.bumpmap,we.normalmap,we.displacementmap,{opacity:{value:1}}]),vertexShader:ot.meshnormal_vert,fragmentShader:ot.meshnormal_frag},sprite:{uniforms:wn([we.sprite,we.fog]),vertexShader:ot.sprite_vert,fragmentShader:ot.sprite_frag},background:{uniforms:{uvTransform:{value:new lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ot.background_vert,fragmentShader:ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new lt}},vertexShader:ot.backgroundCube_vert,fragmentShader:ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ot.cube_vert,fragmentShader:ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ot.equirect_vert,fragmentShader:ot.equirect_frag},distanceRGBA:{uniforms:wn([we.common,we.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ot.distanceRGBA_vert,fragmentShader:ot.distanceRGBA_frag},shadow:{uniforms:wn([we.lights,we.fog,{color:{value:new Ne(0)},opacity:{value:1}}]),vertexShader:ot.shadow_vert,fragmentShader:ot.shadow_frag}};li.physical={uniforms:wn([li.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new lt},clearcoatNormalScale:{value:new he(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new lt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new lt},sheen:{value:0},sheenColor:{value:new Ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new lt},transmissionSamplerSize:{value:new he},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new lt},attenuationDistance:{value:0},attenuationColor:{value:new Ne(0)},specularColor:{value:new Ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new lt},anisotropyVector:{value:new he},anisotropyMap:{value:null},anisotropyMapTransform:{value:new lt}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag};var $a={r:0,b:0,g:0},hs=new Xn,D_=new Qe;function U_(s,e,t,n,i,r,a){let o=new Ne(0),l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(M){let y=M.isScene===!0?M.background:null;return y&&y.isTexture&&(y=(M.backgroundBlurriness>0?t:e).get(y)),y}function _(M){let y=!1,S=g(M);S===null?p(o,l):S&&S.isColor&&(p(S,1),y=!0);let F=s.xr.getEnvironmentBlendMode();F==="additive"?n.buffers.color.setClear(0,0,0,1,a):F==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(M,y){let S=g(y);S&&(S.isCubeTexture||S.mapping===rl)?(h===void 0&&(h=new Xt(new hi(1,1,1),new an({name:"BackgroundCubeMaterial",uniforms:_r(li.backgroundCube.uniforms),vertexShader:li.backgroundCube.vertexShader,fragmentShader:li.backgroundCube.fragmentShader,side:Rn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(F,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),hs.copy(y.backgroundRotation),hs.x*=-1,hs.y*=-1,hs.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(hs.y*=-1,hs.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(D_.makeRotationFromEuler(hs)),h.material.toneMapped=gt.getTransfer(S.colorSpace)!==Tt,(u!==S||d!==S.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=S,d=S.version,f=s.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new Xt(new yr(2,2),new an({name:"BackgroundMaterial",uniforms:_r(li.background.uniforms),vertexShader:li.background.vertexShader,fragmentShader:li.background.fragmentShader,side:Vn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=gt.getTransfer(S.colorSpace)!==Tt,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=S,d=S.version,f=s.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,y){M.getRGB($a,Uf(s)),n.buffers.color.setClear($a.r,$a.g,$a.b,y,a)}return{getClearColor:function(){return o},setClearColor:function(M,y=1){o.set(M),l=y,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,p(o,l)},render:_,addToRenderList:m}}function N_(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,a=!1;function o(x,L,H,z,B){let te=!1,V=u(z,H,L);r!==V&&(r=V,c(r.object)),te=f(x,z,H,B),te&&g(x,z,H,B),B!==null&&e.update(B,s.ELEMENT_ARRAY_BUFFER),(te||a)&&(a=!1,S(x,L,H,z),B!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return s.createVertexArray()}function c(x){return s.bindVertexArray(x)}function h(x){return s.deleteVertexArray(x)}function u(x,L,H){let z=H.wireframe===!0,B=n[x.id];B===void 0&&(B={},n[x.id]=B);let te=B[L.id];te===void 0&&(te={},B[L.id]=te);let V=te[z];return V===void 0&&(V=d(l()),te[z]=V),V}function d(x){let L=[],H=[],z=[];for(let B=0;B<t;B++)L[B]=0,H[B]=0,z[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:H,attributeDivisors:z,object:x,attributes:{},index:null}}function f(x,L,H,z){let B=r.attributes,te=L.attributes,V=0,se=H.getAttributes();for(let ee in se)if(se[ee].location>=0){let Me=B[ee],Pe=te[ee];if(Pe===void 0&&(ee==="instanceMatrix"&&x.instanceMatrix&&(Pe=x.instanceMatrix),ee==="instanceColor"&&x.instanceColor&&(Pe=x.instanceColor)),Me===void 0||Me.attribute!==Pe||Pe&&Me.data!==Pe.data)return!0;V++}return r.attributesNum!==V||r.index!==z}function g(x,L,H,z){let B={},te=L.attributes,V=0,se=H.getAttributes();for(let ee in se)if(se[ee].location>=0){let Me=te[ee];Me===void 0&&(ee==="instanceMatrix"&&x.instanceMatrix&&(Me=x.instanceMatrix),ee==="instanceColor"&&x.instanceColor&&(Me=x.instanceColor));let Pe={};Pe.attribute=Me,Me&&Me.data&&(Pe.data=Me.data),B[ee]=Pe,V++}r.attributes=B,r.attributesNum=V,r.index=z}function _(){let x=r.newAttributes;for(let L=0,H=x.length;L<H;L++)x[L]=0}function m(x){p(x,0)}function p(x,L){let H=r.newAttributes,z=r.enabledAttributes,B=r.attributeDivisors;H[x]=1,z[x]===0&&(s.enableVertexAttribArray(x),z[x]=1),B[x]!==L&&(s.vertexAttribDivisor(x,L),B[x]=L)}function M(){let x=r.newAttributes,L=r.enabledAttributes;for(let H=0,z=L.length;H<z;H++)L[H]!==x[H]&&(s.disableVertexAttribArray(H),L[H]=0)}function y(x,L,H,z,B,te,V){V===!0?s.vertexAttribIPointer(x,L,H,B,te):s.vertexAttribPointer(x,L,H,z,B,te)}function S(x,L,H,z){_();let B=z.attributes,te=H.getAttributes(),V=L.defaultAttributeValues;for(let se in te){let ee=te[se];if(ee.location>=0){let Ee=B[se];if(Ee===void 0&&(se==="instanceMatrix"&&x.instanceMatrix&&(Ee=x.instanceMatrix),se==="instanceColor"&&x.instanceColor&&(Ee=x.instanceColor)),Ee!==void 0){let Me=Ee.normalized,Pe=Ee.itemSize,ze=e.get(Ee);if(ze===void 0)continue;let Ye=ze.buffer,ie=ze.type,ue=ze.bytesPerElement,Ie=ie===s.INT||ie===s.UNSIGNED_INT||Ee.gpuType===Ih;if(Ee.isInterleavedBufferAttribute){let be=Ee.data,nt=be.stride,rt=Ee.offset;if(be.isInstancedInterleavedBuffer){for(let ct=0;ct<ee.locationSize;ct++)p(ee.location+ct,be.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=be.meshPerAttribute*be.count)}else for(let ct=0;ct<ee.locationSize;ct++)m(ee.location+ct);s.bindBuffer(s.ARRAY_BUFFER,Ye);for(let ct=0;ct<ee.locationSize;ct++)y(ee.location+ct,Pe/ee.locationSize,ie,Me,nt*ue,(rt+Pe/ee.locationSize*ct)*ue,Ie)}else{if(Ee.isInstancedBufferAttribute){for(let be=0;be<ee.locationSize;be++)p(ee.location+be,Ee.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=Ee.meshPerAttribute*Ee.count)}else for(let be=0;be<ee.locationSize;be++)m(ee.location+be);s.bindBuffer(s.ARRAY_BUFFER,Ye);for(let be=0;be<ee.locationSize;be++)y(ee.location+be,Pe/ee.locationSize,ie,Me,Pe*ue,Pe/ee.locationSize*be*ue,Ie)}}else if(V!==void 0){let Me=V[se];if(Me!==void 0)switch(Me.length){case 2:s.vertexAttrib2fv(ee.location,Me);break;case 3:s.vertexAttrib3fv(ee.location,Me);break;case 4:s.vertexAttrib4fv(ee.location,Me);break;default:s.vertexAttrib1fv(ee.location,Me)}}}}M()}function F(){P();for(let x in n){let L=n[x];for(let H in L){let z=L[H];for(let B in z)h(z[B].object),delete z[B];delete L[H]}delete n[x]}}function A(x){if(n[x.id]===void 0)return;let L=n[x.id];for(let H in L){let z=L[H];for(let B in z)h(z[B].object),delete z[B];delete L[H]}delete n[x.id]}function C(x){for(let L in n){let H=n[L];if(H[x.id]===void 0)continue;let z=H[x.id];for(let B in z)h(z[B].object),delete z[B];delete H[x.id]}}function P(){b(),a=!0,r!==i&&(r=i,c(r.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:P,resetDefaultState:b,dispose:F,releaseStatesOfGeometry:A,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function O_(s,e,t){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),t.update(h,n,1)}function a(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function o(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_];for(let _=0;_<d.length;_++)t.update(g,n,d[_])}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function F_(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(A){return!(A!==zn&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){let C=A===vn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==wi&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==En&&!C)}function l(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_TEXTURE_SIZE),_=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),p=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),S=f>0,F=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:g,maxCubemapSize:_,maxAttributes:m,maxVertexUniforms:p,maxVaryings:M,maxFragmentUniforms:y,vertexTextures:S,maxSamples:F}}function B_(s){let e=this,t=null,n=0,i=!1,r=!1,a=new Mi,o=new lt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{let M=r?0:n,y=M*4,S=p.clippingState||null;l.value=S,S=h(g,d,y,f);for(let F=0;F!==y;++F)S[F]=t[F];p.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){let _=u!==null?u.length:0,m=null;if(_!==0){if(m=l.value,g!==!0||m===null){let p=f+_*4,M=d.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,S=f;y!==_;++y,S+=4)a.copy(u[y]).applyMatrix4(M,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function k_(s){let e=new WeakMap;function t(a,o){return o===Kr?a.mapping=hr:o===pc&&(a.mapping=ur),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===Kr||o===pc)if(e.has(a)){let l=e.get(a).texture;return t(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new qc(l.height);return c.fromEquirectangularTexture(s,a),e.set(a,c),a.addEventListener("dispose",i),t(c.texture,a.mapping)}else return null}}return a}function i(a){let o=a.target;o.removeEventListener("dispose",i);let l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var Vi=class extends Ao{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ir=4,yd=[.125,.215,.35,.446,.526,.582],ps=20,Zl=new Vi,xd=new Ne,Jl=null,Ql=0,jl=0,ec=!1,ds=(1+Math.sqrt(5))/2,Zs=1/ds,vd=[new T(-ds,Zs,0),new T(ds,Zs,0),new T(-Zs,0,ds),new T(Zs,0,ds),new T(0,ds,-Zs),new T(0,ds,Zs),new T(-1,1,-1),new T(1,1,-1),new T(-1,1,1),new T(1,1,1)],Co=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Jl=this._renderer.getRenderTarget(),Ql=this._renderer.getActiveCubeFace(),jl=this._renderer.getActiveMipmapLevel(),ec=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Jl,Ql,jl),this._renderer.xr.enabled=ec,e.scissorTest=!1,Ka(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===hr||e.mapping===ur?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Jl=this._renderer.getRenderTarget(),Ql=this._renderer.getActiveCubeFace(),jl=this._renderer.getActiveMipmapLevel(),ec=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ht,minFilter:Ht,generateMipmaps:!1,type:vn,format:zn,colorSpace:en,depthBuffer:!1},i=Md(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Md(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=z_(r)),this._blurMaterial=H_(r,e,t)}return i}_compileMaterial(e){let t=new Xt(this._lodPlanes[0],e);this._renderer.compile(t,Zl)}_sceneToCubeUV(e,t,n,i){let o=new sn(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(xd),h.toneMapping=zi,h.autoClear=!1;let f=new Pt({name:"PMREM.Background",side:Rn,depthWrite:!1,depthTest:!1}),g=new Xt(new hi,f),_=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,_=!0):(f.color.copy(xd),_=!0);for(let p=0;p<6;p++){let M=p%3;M===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):M===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));let y=this._cubeSize;Ka(i,M*y,p>2?y:0,y,y),h.setRenderTarget(i),_&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===hr||e.mapping===ur;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=bd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Sd());let r=i?this._cubemapMaterial:this._equirectMaterial,a=new Xt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;Ka(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Zl)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let r=1;r<i;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=vd[(i-r-1)%vd.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,i,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Xt(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ps-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):ps;m>ps&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ps}`);let p=[],M=0;for(let C=0;C<ps;++C){let P=C/_,b=Math.exp(-P*P/2);p.push(b),C===0?M+=b:C<m&&(M+=2*b)}for(let C=0;C<p.length;C++)p[C]=p[C]/M;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-n;let S=this._sizeLods[i],F=3*S*(i>y-ir?i-y+ir:0),A=4*(this._cubeSize-S);Ka(t,F,A,3*S,2*S),l.setRenderTarget(t),l.render(u,Zl)}};function z_(s){let e=[],t=[],n=[],i=s,r=s-ir+1+yd.length;for(let a=0;a<r;a++){let o=Math.pow(2,i);t.push(o);let l=1/o;a>s-ir?l=yd[a-s+ir-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*f),y=new Float32Array(m*g*f),S=new Float32Array(p*g*f);for(let A=0;A<f;A++){let C=A%3*2/3-1,P=A>2?0:-1,b=[C,P,0,C+2/3,P,0,C+2/3,P+1,0,C,P,0,C+2/3,P+1,0,C,P+1,0];M.set(b,_*g*A),y.set(d,m*g*A);let x=[A,A,A,A,A,A];S.set(x,p*g*A)}let F=new Ot;F.setAttribute("position",new rn(M,_)),F.setAttribute("uv",new rn(y,m)),F.setAttribute("faceIndex",new rn(S,p)),e.push(F),i>ir&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Md(s,e,t){let n=new Tn(s,e,t);return n.texture.mapping=rl,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ka(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function H_(s,e,t){let n=new Float32Array(ps),i=new T(0,1,0);return new an({name:"SphericalGaussianBlur",defines:{n:ps,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Hh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ci,depthTest:!1,depthWrite:!1})}function Sd(){return new an({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Hh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ci,depthTest:!1,depthWrite:!1})}function bd(){return new an({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Hh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ci,depthTest:!1,depthWrite:!1})}function Hh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function V_(s){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===Kr||l===pc,h=l===hr||l===ur;if(c||h){let u=e.get(o),d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new Co(s)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{let f=o.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new Co(s)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function i(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function G_(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&zh("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function W_(s,e,t,n){let i={},r=new WeakMap;function a(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);for(let g in d.morphAttributes){let _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}d.removeEventListener("dispose",a),delete i[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function l(u){let d=u.attributes;for(let g in d)e.update(d[g],s.ARRAY_BUFFER);let f=u.morphAttributes;for(let g in f){let _=f[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],s.ARRAY_BUFFER)}}function c(u){let d=[],f=u.index,g=u.attributes.position,_=0;if(f!==null){let M=f.array;_=f.version;for(let y=0,S=M.length;y<S;y+=3){let F=M[y+0],A=M[y+1],C=M[y+2];d.push(F,A,A,C,C,F)}}else if(g!==void 0){let M=g.array;_=g.version;for(let y=0,S=M.length/3-1;y<S;y+=3){let F=y+0,A=y+1,C=y+2;d.push(F,A,A,C,C,F)}}else return;let m=new(Lf(d)?To:Eo)(d,1);m.version=_;let p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function X_(s,e,t){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*a),t.update(f,n,1)}function c(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,d*a,g),t.update(f,n,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(d,f,g,_){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let p=0;for(let M=0;M<g;M++)p+=f[M];for(let M=0;M<_.length;M++)t.update(p,n,_[M])}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function q_(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Y_(s,e,t){let n=new WeakMap,i=new Et;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(o);if(d===void 0||d.count!==u){let b=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],y=0;f===!0&&(y=1),g===!0&&(y=2),_===!0&&(y=3);let S=o.attributes.position.count*y,F=1;S>e.maxTextureSize&&(F=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);let A=new Float32Array(S*F*4*u),C=new wo(A,S,F,u);C.type=En,C.needsUpdate=!0;let P=y*4;for(let x=0;x<u;x++){let L=m[x],H=p[x],z=M[x],B=S*F*4*x;for(let te=0;te<L.count;te++){let V=te*P;f===!0&&(i.fromBufferAttribute(L,te),A[B+V+0]=i.x,A[B+V+1]=i.y,A[B+V+2]=i.z,A[B+V+3]=0),g===!0&&(i.fromBufferAttribute(H,te),A[B+V+4]=i.x,A[B+V+5]=i.y,A[B+V+6]=i.z,A[B+V+7]=0),_===!0&&(i.fromBufferAttribute(z,te),A[B+V+8]=i.x,A[B+V+9]=i.y,A[B+V+10]=i.z,A[B+V+11]=z.itemSize===4?i.w:1)}}d={count:u,texture:C,size:new he(S,F)},n.set(o,d),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function $_(s,e,t,n){let i=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function a(){i=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}var Po=class extends un{constructor(e,t,n,i,r,a,o,l,c,h=ar){if(h!==ar&&h!==fr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ar&&(n=gs),n===void 0&&h===fr&&(n=dr),super(null,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:xn,this.minFilter=l!==void 0?l:xn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Of=new un,wd=new Po(1,1),Ff=new wo,Bf=new Wc,kf=new Ro,Ed=[],Td=[],Ad=new Float32Array(16),Rd=new Float32Array(9),Cd=new Float32Array(4);function Er(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=Ed[i];if(r===void 0&&(r=new Float32Array(i),Ed[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function on(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function ln(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function ll(s,e){let t=Td[e];t===void 0&&(t=new Int32Array(e),Td[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function K_(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Z_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;s.uniform2fv(this.addr,e),ln(t,e)}}function J_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(on(t,e))return;s.uniform3fv(this.addr,e),ln(t,e)}}function Q_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;s.uniform4fv(this.addr,e),ln(t,e)}}function j_(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),ln(t,e)}else{if(on(t,n))return;Cd.set(n),s.uniformMatrix2fv(this.addr,!1,Cd),ln(t,n)}}function ey(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),ln(t,e)}else{if(on(t,n))return;Rd.set(n),s.uniformMatrix3fv(this.addr,!1,Rd),ln(t,n)}}function ty(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),ln(t,e)}else{if(on(t,n))return;Ad.set(n),s.uniformMatrix4fv(this.addr,!1,Ad),ln(t,n)}}function ny(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function iy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;s.uniform2iv(this.addr,e),ln(t,e)}}function sy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;s.uniform3iv(this.addr,e),ln(t,e)}}function ry(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;s.uniform4iv(this.addr,e),ln(t,e)}}function ay(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function oy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;s.uniform2uiv(this.addr,e),ln(t,e)}}function ly(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;s.uniform3uiv(this.addr,e),ln(t,e)}}function cy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;s.uniform4uiv(this.addr,e),ln(t,e)}}function hy(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(wd.compareFunction=Pf,r=wd):r=Of,t.setTexture2D(e||r,i)}function uy(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Bf,i)}function dy(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||kf,i)}function fy(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Ff,i)}function py(s){switch(s){case 5126:return K_;case 35664:return Z_;case 35665:return J_;case 35666:return Q_;case 35674:return j_;case 35675:return ey;case 35676:return ty;case 5124:case 35670:return ny;case 35667:case 35671:return iy;case 35668:case 35672:return sy;case 35669:case 35673:return ry;case 5125:return ay;case 36294:return oy;case 36295:return ly;case 36296:return cy;case 35678:case 36198:case 36298:case 36306:case 35682:return hy;case 35679:case 36299:case 36307:return uy;case 35680:case 36300:case 36308:case 36293:return dy;case 36289:case 36303:case 36311:case 36292:return fy}}function my(s,e){s.uniform1fv(this.addr,e)}function gy(s,e){let t=Er(e,this.size,2);s.uniform2fv(this.addr,t)}function _y(s,e){let t=Er(e,this.size,3);s.uniform3fv(this.addr,t)}function yy(s,e){let t=Er(e,this.size,4);s.uniform4fv(this.addr,t)}function xy(s,e){let t=Er(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function vy(s,e){let t=Er(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function My(s,e){let t=Er(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Sy(s,e){s.uniform1iv(this.addr,e)}function by(s,e){s.uniform2iv(this.addr,e)}function wy(s,e){s.uniform3iv(this.addr,e)}function Ey(s,e){s.uniform4iv(this.addr,e)}function Ty(s,e){s.uniform1uiv(this.addr,e)}function Ay(s,e){s.uniform2uiv(this.addr,e)}function Ry(s,e){s.uniform3uiv(this.addr,e)}function Cy(s,e){s.uniform4uiv(this.addr,e)}function Py(s,e,t){let n=this.cache,i=e.length,r=ll(t,i);on(n,r)||(s.uniform1iv(this.addr,r),ln(n,r));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Of,r[a])}function Iy(s,e,t){let n=this.cache,i=e.length,r=ll(t,i);on(n,r)||(s.uniform1iv(this.addr,r),ln(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Bf,r[a])}function Ly(s,e,t){let n=this.cache,i=e.length,r=ll(t,i);on(n,r)||(s.uniform1iv(this.addr,r),ln(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||kf,r[a])}function Dy(s,e,t){let n=this.cache,i=e.length,r=ll(t,i);on(n,r)||(s.uniform1iv(this.addr,r),ln(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Ff,r[a])}function Uy(s){switch(s){case 5126:return my;case 35664:return gy;case 35665:return _y;case 35666:return yy;case 35674:return xy;case 35675:return vy;case 35676:return My;case 5124:case 35670:return Sy;case 35667:case 35671:return by;case 35668:case 35672:return wy;case 35669:case 35673:return Ey;case 5125:return Ty;case 36294:return Ay;case 36295:return Ry;case 36296:return Cy;case 35678:case 36198:case 36298:case 36306:case 35682:return Py;case 35679:case 36299:case 36307:return Iy;case 35680:case 36300:case 36308:case 36293:return Ly;case 36289:case 36303:case 36311:case 36292:return Dy}}var Yc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=py(t.type)}},$c=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Uy(t.type)}},Kc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(e,t[o.id],n)}}},tc=/(\w+)(\])?(\[|\.)?/g;function Pd(s,e){s.seq.push(e),s.map[e.id]=e}function Ny(s,e,t){let n=s.name,i=n.length;for(tc.lastIndex=0;;){let r=tc.exec(n),a=tc.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Pd(t,c===void 0?new Yc(o,s,e):new $c(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new Kc(o),Pd(t,u)),t=u}}}var cr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=e.getActiveUniform(t,i),a=e.getUniformLocation(t,r.name);Ny(r,a,this)}}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function Id(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var Oy=37297,Fy=0;function By(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function ky(s){let e=gt.getPrimaries(gt.workingColorSpace),t=gt.getPrimaries(s),n;switch(e===t?n="":e===Mo&&t===vo?n="LinearDisplayP3ToLinearSRGB":e===vo&&t===Mo&&(n="LinearSRGBToLinearDisplayP3"),s){case en:case ol:return[n,"LinearTransferOETF"];case vt:case Bh:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function Ld(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";let r=/ERROR: 0:(\d+)/.exec(i);if(r){let a=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+By(s.getShaderSource(e),a)}else return i}function zy(s,e){let t=ky(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Hy(s,e){let t;switch(e){case Eh:t="Linear";break;case Th:t="Reinhard";break;case Ah:t="OptimizedCineon";break;case pa:t="ACESFilmic";break;case Rh:t="AgX";break;case Ch:t="Neutral";break;case tm:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Vy(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Vr).join(`
`)}function Gy(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Wy(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function Vr(s){return s!==""}function Dd(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ud(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Xy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zc(s){return s.replace(Xy,Yy)}var qy=new Map;function Yy(s,e){let t=ot[e];if(t===void 0){let n=qy.get(e);if(n!==void 0)t=ot[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Zc(t)}var $y=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nd(s){return s.replace($y,Ky)}function Ky(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Od(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Zy(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===gf?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===wh?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===vi&&(e="SHADOWMAP_TYPE_VSM"),e}function Jy(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case hr:case ur:e="ENVMAP_TYPE_CUBE";break;case rl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Qy(s){let e="ENVMAP_MODE_REFLECTION";return s.envMap&&s.envMapMode===ur&&(e="ENVMAP_MODE_REFRACTION"),e}function jy(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case _f:e="ENVMAP_BLENDING_MULTIPLY";break;case jp:e="ENVMAP_BLENDING_MIX";break;case em:e="ENVMAP_BLENDING_ADD";break}return e}function ex(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function tx(s,e,t,n){let i=s.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=Zy(t),c=Jy(t),h=Qy(t),u=jy(t),d=ex(t),f=Vy(t),g=Gy(r),_=i.createProgram(),m,p,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Vr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Vr).join(`
`),p.length>0&&(p+=`
`)):(m=[Od(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vr).join(`
`),p=[Od(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==zi?"#define TONE_MAPPING":"",t.toneMapping!==zi?ot.tonemapping_pars_fragment:"",t.toneMapping!==zi?Hy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ot.colorspace_pars_fragment,zy("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Vr).join(`
`)),a=Zc(a),a=Dd(a,t),a=Ud(a,t),o=Zc(o),o=Dd(o,t),o=Ud(o,t),a=Nd(a),o=Nd(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Ju?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ju?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let y=M+m+a,S=M+p+o,F=Id(i,i.VERTEX_SHADER,y),A=Id(i,i.FRAGMENT_SHADER,S);i.attachShader(_,F),i.attachShader(_,A),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function C(L){if(s.debug.checkShaderErrors){let H=i.getProgramInfoLog(_).trim(),z=i.getShaderInfoLog(F).trim(),B=i.getShaderInfoLog(A).trim(),te=!0,V=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(te=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,F,A);else{let se=Ld(i,F,"vertex"),ee=Ld(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+H+`
`+se+`
`+ee)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(z===""||B==="")&&(V=!1);V&&(L.diagnostics={runnable:te,programLog:H,vertexShader:{log:z,prefix:m},fragmentShader:{log:B,prefix:p}})}i.deleteShader(F),i.deleteShader(A),P=new cr(i,_),b=Wy(i,_)}let P;this.getUniforms=function(){return P===void 0&&C(this),P};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=i.getProgramParameter(_,Oy)),x},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Fy++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=F,this.fragmentShader=A,this}var nx=0,Jc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Qc(e),t.set(e,n)),n}},Qc=class{constructor(e){this.id=nx++,this.code=e,this.usedTimes=0}};function ix(s,e,t,n,i,r,a){let o=new jr,l=new Jc,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,f=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,x,L,H,z){let B=H.fog,te=z.geometry,V=b.isMeshStandardMaterial?H.environment:null,se=(b.isMeshStandardMaterial?t:e).get(b.envMap||V),ee=se&&se.mapping===rl?se.image.height:null,Ee=g[b.type];b.precision!==null&&(f=i.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));let Me=te.morphAttributes.position||te.morphAttributes.normal||te.morphAttributes.color,Pe=Me!==void 0?Me.length:0,ze=0;te.morphAttributes.position!==void 0&&(ze=1),te.morphAttributes.normal!==void 0&&(ze=2),te.morphAttributes.color!==void 0&&(ze=3);let Ye,ie,ue,Ie;if(Ee){let _t=li[Ee];Ye=_t.vertexShader,ie=_t.fragmentShader}else Ye=b.vertexShader,ie=b.fragmentShader,l.update(b),ue=l.getVertexShaderID(b),Ie=l.getFragmentShaderID(b);let be=s.getRenderTarget(),nt=z.isInstancedMesh===!0,rt=z.isBatchedMesh===!0,ct=!!b.map,It=!!b.matcap,U=!!se,it=!!b.aoMap,Mt=!!b.lightMap,pt=!!b.bumpMap,De=!!b.normalMap,Lt=!!b.displacementMap,Je=!!b.emissiveMap,je=!!b.metalnessMap,I=!!b.roughnessMap,w=b.anisotropy>0,K=b.clearcoat>0,le=b.dispersion>0,ce=b.iridescence>0,oe=b.sheen>0,Fe=b.transmission>0,ve=w&&!!b.anisotropyMap,Se=K&&!!b.clearcoatMap,Xe=K&&!!b.clearcoatNormalMap,ne=K&&!!b.clearcoatRoughnessMap,Ae=ce&&!!b.iridescenceMap,at=ce&&!!b.iridescenceThicknessMap,Ze=oe&&!!b.sheenColorMap,Re=oe&&!!b.sheenRoughnessMap,$e=!!b.specularMap,ge=!!b.specularColorMap,Ft=!!b.specularIntensityMap,O=Fe&&!!b.transmissionMap,J=Fe&&!!b.thicknessMap,Q=!!b.gradientMap,re=!!b.alphaMap,de=b.alphaTest>0,He=!!b.alphaHash,Ke=!!b.extensions,qt=zi;b.toneMapped&&(be===null||be.isXRRenderTarget===!0)&&(qt=s.toneMapping);let Dt={shaderID:Ee,shaderType:b.type,shaderName:b.name,vertexShader:Ye,fragmentShader:ie,defines:b.defines,customVertexShaderID:ue,customFragmentShaderID:Ie,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:rt,batchingColor:rt&&z._colorsTexture!==null,instancing:nt,instancingColor:nt&&z.instanceColor!==null,instancingMorph:nt&&z.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:be===null?s.outputColorSpace:be.isXRRenderTarget===!0?be.texture.colorSpace:en,alphaToCoverage:!!b.alphaToCoverage,map:ct,matcap:It,envMap:U,envMapMode:U&&se.mapping,envMapCubeUVHeight:ee,aoMap:it,lightMap:Mt,bumpMap:pt,normalMap:De,displacementMap:d&&Lt,emissiveMap:Je,normalMapObjectSpace:De&&b.normalMapType===am,normalMapTangentSpace:De&&b.normalMapType===Cf,metalnessMap:je,roughnessMap:I,anisotropy:w,anisotropyMap:ve,clearcoat:K,clearcoatMap:Se,clearcoatNormalMap:Xe,clearcoatRoughnessMap:ne,dispersion:le,iridescence:ce,iridescenceMap:Ae,iridescenceThicknessMap:at,sheen:oe,sheenColorMap:Ze,sheenRoughnessMap:Re,specularMap:$e,specularColorMap:ge,specularIntensityMap:Ft,transmission:Fe,transmissionMap:O,thicknessMap:J,gradientMap:Q,opaque:b.transparent===!1&&b.blending===rr&&b.alphaToCoverage===!1,alphaMap:re,alphaTest:de,alphaHash:He,combine:b.combine,mapUv:ct&&_(b.map.channel),aoMapUv:it&&_(b.aoMap.channel),lightMapUv:Mt&&_(b.lightMap.channel),bumpMapUv:pt&&_(b.bumpMap.channel),normalMapUv:De&&_(b.normalMap.channel),displacementMapUv:Lt&&_(b.displacementMap.channel),emissiveMapUv:Je&&_(b.emissiveMap.channel),metalnessMapUv:je&&_(b.metalnessMap.channel),roughnessMapUv:I&&_(b.roughnessMap.channel),anisotropyMapUv:ve&&_(b.anisotropyMap.channel),clearcoatMapUv:Se&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:Xe&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ne&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Ae&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:at&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Ze&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:Re&&_(b.sheenRoughnessMap.channel),specularMapUv:$e&&_(b.specularMap.channel),specularColorMapUv:ge&&_(b.specularColorMap.channel),specularIntensityMapUv:Ft&&_(b.specularIntensityMap.channel),transmissionMapUv:O&&_(b.transmissionMap.channel),thicknessMapUv:J&&_(b.thicknessMap.channel),alphaMapUv:re&&_(b.alphaMap.channel),vertexTangents:!!te.attributes.tangent&&(De||w),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!te.attributes.color&&te.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!te.attributes.uv&&(ct||re),fog:!!B,useFog:b.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:z.isSkinnedMesh===!0,morphTargets:te.morphAttributes.position!==void 0,morphNormals:te.morphAttributes.normal!==void 0,morphColors:te.morphAttributes.color!==void 0,morphTargetsCount:Pe,morphTextureStride:ze,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&L.length>0,shadowMapType:s.shadowMap.type,toneMapping:qt,decodeVideoTexture:ct&&b.map.isVideoTexture===!0&&gt.getTransfer(b.map.colorSpace)===Tt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===$t,flipSided:b.side===Rn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ke&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ke&&b.extensions.multiDraw===!0||rt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Dt.vertexUv1s=c.has(1),Dt.vertexUv2s=c.has(2),Dt.vertexUv3s=c.has(3),c.clear(),Dt}function p(b){let x=[];if(b.shaderID?x.push(b.shaderID):(x.push(b.customVertexShaderID),x.push(b.customFragmentShaderID)),b.defines!==void 0)for(let L in b.defines)x.push(L),x.push(b.defines[L]);return b.isRawShaderMaterial===!1&&(M(x,b),y(x,b),x.push(s.outputColorSpace)),x.push(b.customProgramCacheKey),x.join()}function M(b,x){b.push(x.precision),b.push(x.outputColorSpace),b.push(x.envMapMode),b.push(x.envMapCubeUVHeight),b.push(x.mapUv),b.push(x.alphaMapUv),b.push(x.lightMapUv),b.push(x.aoMapUv),b.push(x.bumpMapUv),b.push(x.normalMapUv),b.push(x.displacementMapUv),b.push(x.emissiveMapUv),b.push(x.metalnessMapUv),b.push(x.roughnessMapUv),b.push(x.anisotropyMapUv),b.push(x.clearcoatMapUv),b.push(x.clearcoatNormalMapUv),b.push(x.clearcoatRoughnessMapUv),b.push(x.iridescenceMapUv),b.push(x.iridescenceThicknessMapUv),b.push(x.sheenColorMapUv),b.push(x.sheenRoughnessMapUv),b.push(x.specularMapUv),b.push(x.specularColorMapUv),b.push(x.specularIntensityMapUv),b.push(x.transmissionMapUv),b.push(x.thicknessMapUv),b.push(x.combine),b.push(x.fogExp2),b.push(x.sizeAttenuation),b.push(x.morphTargetsCount),b.push(x.morphAttributeCount),b.push(x.numDirLights),b.push(x.numPointLights),b.push(x.numSpotLights),b.push(x.numSpotLightMaps),b.push(x.numHemiLights),b.push(x.numRectAreaLights),b.push(x.numDirLightShadows),b.push(x.numPointLightShadows),b.push(x.numSpotLightShadows),b.push(x.numSpotLightShadowsWithMaps),b.push(x.numLightProbes),b.push(x.shadowMapType),b.push(x.toneMapping),b.push(x.numClippingPlanes),b.push(x.numClipIntersection),b.push(x.depthPacking)}function y(b,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.skinning&&o.enable(4),x.morphTargets&&o.enable(5),x.morphNormals&&o.enable(6),x.morphColors&&o.enable(7),x.premultipliedAlpha&&o.enable(8),x.shadowMapEnabled&&o.enable(9),x.doubleSided&&o.enable(10),x.flipSided&&o.enable(11),x.useDepthPacking&&o.enable(12),x.dithering&&o.enable(13),x.transmission&&o.enable(14),x.sheen&&o.enable(15),x.opaque&&o.enable(16),x.pointsUvs&&o.enable(17),x.decodeVideoTexture&&o.enable(18),x.alphaToCoverage&&o.enable(19),b.push(o.mask)}function S(b){let x=g[b.type],L;if(x){let H=li[x];L=Ji.clone(H.uniforms)}else L=b.uniforms;return L}function F(b,x){let L;for(let H=0,z=h.length;H<z;H++){let B=h[H];if(B.cacheKey===x){L=B,++L.usedTimes;break}}return L===void 0&&(L=new tx(s,x,b,r),h.push(L)),L}function A(b){if(--b.usedTimes===0){let x=h.indexOf(b);h[x]=h[h.length-1],h.pop(),b.destroy()}}function C(b){l.remove(b)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:F,releaseProgram:A,releaseShaderCache:C,programs:h,dispose:P}}function sx(){let s=new WeakMap;function e(r){let a=s.get(r);return a===void 0&&(a={},s.set(r,a)),a}function t(r){s.delete(r)}function n(r,a,o){s.get(r)[a]=o}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function rx(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Fd(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Bd(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(u,d,f,g,_,m){let p=s[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},s[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function o(u,d,f,g,_,m){let p=a(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(u,d,f,g,_,m){let p=a(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||rx),n.length>1&&n.sort(d||Fd),i.length>1&&i.sort(d||Fd)}function h(){for(let u=e,d=s.length;u<d;u++){let f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:h,sort:c}}function ax(){let s=new WeakMap;function e(n,i){let r=s.get(n),a;return r===void 0?(a=new Bd,s.set(n,[a])):i>=r.length?(a=new Bd,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function ox(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new T,color:new Ne};break;case"SpotLight":t={position:new T,direction:new T,color:new Ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new T,color:new Ne,distance:0,decay:0};break;case"HemisphereLight":t={direction:new T,skyColor:new Ne,groundColor:new Ne};break;case"RectAreaLight":t={color:new Ne,position:new T,halfWidth:new T,halfHeight:new T};break}return s[e.id]=t,t}}}function lx(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var cx=0;function hx(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function ux(s){let e=new ox,t=lx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new T);let i=new T,r=new Qe,a=new Qe;function o(c){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,M=0,y=0,S=0,F=0,A=0,C=0;c.sort(hx);for(let b=0,x=c.length;b<x;b++){let L=c[b],H=L.color,z=L.intensity,B=L.distance,te=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=H.r*z,u+=H.g*z,d+=H.b*z;else if(L.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(L.sh.coefficients[V],z);C++}else if(L.isDirectionalLight){let V=e.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let se=L.shadow,ee=t.get(L);ee.shadowIntensity=se.intensity,ee.shadowBias=se.bias,ee.shadowNormalBias=se.normalBias,ee.shadowRadius=se.radius,ee.shadowMapSize=se.mapSize,n.directionalShadow[f]=ee,n.directionalShadowMap[f]=te,n.directionalShadowMatrix[f]=L.shadow.matrix,M++}n.directional[f]=V,f++}else if(L.isSpotLight){let V=e.get(L);V.position.setFromMatrixPosition(L.matrixWorld),V.color.copy(H).multiplyScalar(z),V.distance=B,V.coneCos=Math.cos(L.angle),V.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),V.decay=L.decay,n.spot[_]=V;let se=L.shadow;if(L.map&&(n.spotLightMap[F]=L.map,F++,se.updateMatrices(L),L.castShadow&&A++),n.spotLightMatrix[_]=se.matrix,L.castShadow){let ee=t.get(L);ee.shadowIntensity=se.intensity,ee.shadowBias=se.bias,ee.shadowNormalBias=se.normalBias,ee.shadowRadius=se.radius,ee.shadowMapSize=se.mapSize,n.spotShadow[_]=ee,n.spotShadowMap[_]=te,S++}_++}else if(L.isRectAreaLight){let V=e.get(L);V.color.copy(H).multiplyScalar(z),V.halfWidth.set(L.width*.5,0,0),V.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=V,m++}else if(L.isPointLight){let V=e.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity),V.distance=L.distance,V.decay=L.decay,L.castShadow){let se=L.shadow,ee=t.get(L);ee.shadowIntensity=se.intensity,ee.shadowBias=se.bias,ee.shadowNormalBias=se.normalBias,ee.shadowRadius=se.radius,ee.shadowMapSize=se.mapSize,ee.shadowCameraNear=se.camera.near,ee.shadowCameraFar=se.camera.far,n.pointShadow[g]=ee,n.pointShadowMap[g]=te,n.pointShadowMatrix[g]=L.shadow.matrix,y++}n.point[g]=V,g++}else if(L.isHemisphereLight){let V=e.get(L);V.skyColor.copy(L.color).multiplyScalar(z),V.groundColor.copy(L.groundColor).multiplyScalar(z),n.hemi[p]=V,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=we.LTC_FLOAT_1,n.rectAreaLTC2=we.LTC_FLOAT_2):(n.rectAreaLTC1=we.LTC_HALF_1,n.rectAreaLTC2=we.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let P=n.hash;(P.directionalLength!==f||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==M||P.numPointShadows!==y||P.numSpotShadows!==S||P.numSpotMaps!==F||P.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=S+F-A,n.spotLightMap.length=F,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=C,P.directionalLength=f,P.pointLength=g,P.spotLength=_,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=M,P.numPointShadows=y,P.numSpotShadows=S,P.numSpotMaps=F,P.numLightProbes=C,n.version=cx++)}function l(c,h){let u=0,d=0,f=0,g=0,_=0,m=h.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){let y=c[p];if(y.isDirectionalLight){let S=n.directional[u];S.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(m),u++}else if(y.isSpotLight){let S=n.spot[f];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(m),f++}else if(y.isRectAreaLight){let S=n.rectArea[g];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(m),a.identity(),r.copy(y.matrixWorld),r.premultiply(m),a.extractRotation(r),S.halfWidth.set(y.width*.5,0,0),S.halfHeight.set(0,y.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),g++}else if(y.isPointLight){let S=n.point[d];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(m),d++}else if(y.isHemisphereLight){let S=n.hemi[_];S.direction.setFromMatrixPosition(y.matrixWorld),S.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:n}}function kd(s){let e=new ux(s),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function dx(s){let e=new WeakMap;function t(i,r=0){let a=e.get(i),o;return a===void 0?(o=new kd(s),e.set(i,[o])):r>=a.length?(o=new kd(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var jc=class extends Pn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=sm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},eh=class extends Pn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},fx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,px=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function mx(s,e,t){let n=new ea,i=new he,r=new he,a=new Et,o=new jc({depthPacking:rm}),l=new eh,c={},h=t.maxTextureSize,u={[Vn]:Rn,[Rn]:Vn,[$t]:$t},d=new an({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new he},radius:{value:4}},vertexShader:fx,fragmentShader:px}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new Ot;g.setAttribute("position",new rn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Xt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=gf;let p=this.type;this.render=function(A,C,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;let b=s.getRenderTarget(),x=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),H=s.state;H.setBlending(ci),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);let z=p!==vi&&this.type===vi,B=p===vi&&this.type!==vi;for(let te=0,V=A.length;te<V;te++){let se=A[te],ee=se.shadow;if(ee===void 0){console.warn("THREE.WebGLShadowMap:",se,"has no shadow.");continue}if(ee.autoUpdate===!1&&ee.needsUpdate===!1)continue;i.copy(ee.mapSize);let Ee=ee.getFrameExtents();if(i.multiply(Ee),r.copy(ee.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/Ee.x),i.x=r.x*Ee.x,ee.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/Ee.y),i.y=r.y*Ee.y,ee.mapSize.y=r.y)),ee.map===null||z===!0||B===!0){let Pe=this.type!==vi?{minFilter:xn,magFilter:xn}:{};ee.map!==null&&ee.map.dispose(),ee.map=new Tn(i.x,i.y,Pe),ee.map.texture.name=se.name+".shadowMap",ee.camera.updateProjectionMatrix()}s.setRenderTarget(ee.map),s.clear();let Me=ee.getViewportCount();for(let Pe=0;Pe<Me;Pe++){let ze=ee.getViewport(Pe);a.set(r.x*ze.x,r.y*ze.y,r.x*ze.z,r.y*ze.w),H.viewport(a),ee.updateMatrices(se,Pe),n=ee.getFrustum(),S(C,P,ee.camera,se,this.type)}ee.isPointLightShadow!==!0&&this.type===vi&&M(ee,P),ee.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(b,x,L)};function M(A,C){let P=e.update(_);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Tn(i.x,i.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(C,null,P,d,_,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(C,null,P,f,_,null)}function y(A,C,P,b){let x=null,L=P.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(L!==void 0)x=L;else if(x=P.isPointLight===!0?l:o,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){let H=x.uuid,z=C.uuid,B=c[H];B===void 0&&(B={},c[H]=B);let te=B[z];te===void 0&&(te=x.clone(),B[z]=te,C.addEventListener("dispose",F)),x=te}if(x.visible=C.visible,x.wireframe=C.wireframe,b===vi?x.side=C.shadowSide!==null?C.shadowSide:C.side:x.side=C.shadowSide!==null?C.shadowSide:u[C.side],x.alphaMap=C.alphaMap,x.alphaTest=C.alphaTest,x.map=C.map,x.clipShadows=C.clipShadows,x.clippingPlanes=C.clippingPlanes,x.clipIntersection=C.clipIntersection,x.displacementMap=C.displacementMap,x.displacementScale=C.displacementScale,x.displacementBias=C.displacementBias,x.wireframeLinewidth=C.wireframeLinewidth,x.linewidth=C.linewidth,P.isPointLight===!0&&x.isMeshDistanceMaterial===!0){let H=s.properties.get(x);H.light=P}return x}function S(A,C,P,b,x){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&x===vi)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,A.matrixWorld);let z=e.update(A),B=A.material;if(Array.isArray(B)){let te=z.groups;for(let V=0,se=te.length;V<se;V++){let ee=te[V],Ee=B[ee.materialIndex];if(Ee&&Ee.visible){let Me=y(A,Ee,b,x);A.onBeforeShadow(s,A,C,P,z,Me,ee),s.renderBufferDirect(P,null,z,Me,A,ee),A.onAfterShadow(s,A,C,P,z,Me,ee)}}}else if(B.visible){let te=y(A,B,b,x);A.onBeforeShadow(s,A,C,P,z,te,null),s.renderBufferDirect(P,null,z,te,A,null),A.onAfterShadow(s,A,C,P,z,te,null)}}let H=A.children;for(let z=0,B=H.length;z<B;z++)S(H[z],C,P,b,x)}function F(A){A.target.removeEventListener("dispose",F);for(let P in c){let b=c[P],x=A.target.uuid;x in b&&(b[x].dispose(),delete b[x])}}}function gx(s){function e(){let O=!1,J=new Et,Q=null,re=new Et(0,0,0,0);return{setMask:function(de){Q!==de&&!O&&(s.colorMask(de,de,de,de),Q=de)},setLocked:function(de){O=de},setClear:function(de,He,Ke,qt,Dt){Dt===!0&&(de*=qt,He*=qt,Ke*=qt),J.set(de,He,Ke,qt),re.equals(J)===!1&&(s.clearColor(de,He,Ke,qt),re.copy(J))},reset:function(){O=!1,Q=null,re.set(-1,0,0,0)}}}function t(){let O=!1,J=null,Q=null,re=null;return{setTest:function(de){de?Ie(s.DEPTH_TEST):be(s.DEPTH_TEST)},setMask:function(de){J!==de&&!O&&(s.depthMask(de),J=de)},setFunc:function(de){if(Q!==de){switch(de){case qp:s.depthFunc(s.NEVER);break;case Yp:s.depthFunc(s.ALWAYS);break;case $p:s.depthFunc(s.LESS);break;case yo:s.depthFunc(s.LEQUAL);break;case Kp:s.depthFunc(s.EQUAL);break;case Zp:s.depthFunc(s.GEQUAL);break;case Jp:s.depthFunc(s.GREATER);break;case Qp:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Q=de}},setLocked:function(de){O=de},setClear:function(de){re!==de&&(s.clearDepth(de),re=de)},reset:function(){O=!1,J=null,Q=null,re=null}}}function n(){let O=!1,J=null,Q=null,re=null,de=null,He=null,Ke=null,qt=null,Dt=null;return{setTest:function(_t){O||(_t?Ie(s.STENCIL_TEST):be(s.STENCIL_TEST))},setMask:function(_t){J!==_t&&!O&&(s.stencilMask(_t),J=_t)},setFunc:function(_t,In,Ln){(Q!==_t||re!==In||de!==Ln)&&(s.stencilFunc(_t,In,Ln),Q=_t,re=In,de=Ln)},setOp:function(_t,In,Ln){(He!==_t||Ke!==In||qt!==Ln)&&(s.stencilOp(_t,In,Ln),He=_t,Ke=In,qt=Ln)},setLocked:function(_t){O=_t},setClear:function(_t){Dt!==_t&&(s.clearStencil(_t),Dt=_t)},reset:function(){O=!1,J=null,Q=null,re=null,de=null,He=null,Ke=null,qt=null,Dt=null}}}let i=new e,r=new t,a=new n,o=new WeakMap,l=new WeakMap,c={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,m=null,p=null,M=null,y=null,S=null,F=null,A=new Ne(0,0,0),C=0,P=!1,b=null,x=null,L=null,H=null,z=null,B=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),te=!1,V=0,se=s.getParameter(s.VERSION);se.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(se)[1]),te=V>=1):se.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(se)[1]),te=V>=2);let ee=null,Ee={},Me=s.getParameter(s.SCISSOR_BOX),Pe=s.getParameter(s.VIEWPORT),ze=new Et().fromArray(Me),Ye=new Et().fromArray(Pe);function ie(O,J,Q,re){let de=new Uint8Array(4),He=s.createTexture();s.bindTexture(O,He),s.texParameteri(O,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(O,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ke=0;Ke<Q;Ke++)O===s.TEXTURE_3D||O===s.TEXTURE_2D_ARRAY?s.texImage3D(J,0,s.RGBA,1,1,re,0,s.RGBA,s.UNSIGNED_BYTE,de):s.texImage2D(J+Ke,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,de);return He}let ue={};ue[s.TEXTURE_2D]=ie(s.TEXTURE_2D,s.TEXTURE_2D,1),ue[s.TEXTURE_CUBE_MAP]=ie(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[s.TEXTURE_2D_ARRAY]=ie(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ue[s.TEXTURE_3D]=ie(s.TEXTURE_3D,s.TEXTURE_3D,1,1),i.setClear(0,0,0,1),r.setClear(1),a.setClear(0),Ie(s.DEPTH_TEST),r.setFunc(yo),pt(!1),De(Gu),Ie(s.CULL_FACE),it(ci);function Ie(O){c[O]!==!0&&(s.enable(O),c[O]=!0)}function be(O){c[O]!==!1&&(s.disable(O),c[O]=!1)}function nt(O,J){return h[O]!==J?(s.bindFramebuffer(O,J),h[O]=J,O===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=J),O===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=J),!0):!1}function rt(O,J){let Q=d,re=!1;if(O){Q=u.get(J),Q===void 0&&(Q=[],u.set(J,Q));let de=O.textures;if(Q.length!==de.length||Q[0]!==s.COLOR_ATTACHMENT0){for(let He=0,Ke=de.length;He<Ke;He++)Q[He]=s.COLOR_ATTACHMENT0+He;Q.length=de.length,re=!0}}else Q[0]!==s.BACK&&(Q[0]=s.BACK,re=!0);re&&s.drawBuffers(Q)}function ct(O){return f!==O?(s.useProgram(O),f=O,!0):!1}let It={[fs]:s.FUNC_ADD,[Cp]:s.FUNC_SUBTRACT,[Pp]:s.FUNC_REVERSE_SUBTRACT};It[Ip]=s.MIN,It[Lp]=s.MAX;let U={[Dp]:s.ZERO,[Up]:s.ONE,[Np]:s.SRC_COLOR,[dc]:s.SRC_ALPHA,[Hp]:s.SRC_ALPHA_SATURATE,[kp]:s.DST_COLOR,[Fp]:s.DST_ALPHA,[Op]:s.ONE_MINUS_SRC_COLOR,[fc]:s.ONE_MINUS_SRC_ALPHA,[zp]:s.ONE_MINUS_DST_COLOR,[Bp]:s.ONE_MINUS_DST_ALPHA,[Vp]:s.CONSTANT_COLOR,[Gp]:s.ONE_MINUS_CONSTANT_COLOR,[Wp]:s.CONSTANT_ALPHA,[Xp]:s.ONE_MINUS_CONSTANT_ALPHA};function it(O,J,Q,re,de,He,Ke,qt,Dt,_t){if(O===ci){g===!0&&(be(s.BLEND),g=!1);return}if(g===!1&&(Ie(s.BLEND),g=!0),O!==Rp){if(O!==_||_t!==P){if((m!==fs||y!==fs)&&(s.blendEquation(s.FUNC_ADD),m=fs,y=fs),_t)switch(O){case rr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Gn:s.blendFunc(s.ONE,s.ONE);break;case Wu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Xu:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case rr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Gn:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Wu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Xu:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}p=null,M=null,S=null,F=null,A.set(0,0,0),C=0,_=O,P=_t}return}de=de||J,He=He||Q,Ke=Ke||re,(J!==m||de!==y)&&(s.blendEquationSeparate(It[J],It[de]),m=J,y=de),(Q!==p||re!==M||He!==S||Ke!==F)&&(s.blendFuncSeparate(U[Q],U[re],U[He],U[Ke]),p=Q,M=re,S=He,F=Ke),(qt.equals(A)===!1||Dt!==C)&&(s.blendColor(qt.r,qt.g,qt.b,Dt),A.copy(qt),C=Dt),_=O,P=!1}function Mt(O,J){O.side===$t?be(s.CULL_FACE):Ie(s.CULL_FACE);let Q=O.side===Rn;J&&(Q=!Q),pt(Q),O.blending===rr&&O.transparent===!1?it(ci):it(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),r.setFunc(O.depthFunc),r.setTest(O.depthTest),r.setMask(O.depthWrite),i.setMask(O.colorWrite);let re=O.stencilWrite;a.setTest(re),re&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Je(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?Ie(s.SAMPLE_ALPHA_TO_COVERAGE):be(s.SAMPLE_ALPHA_TO_COVERAGE)}function pt(O){b!==O&&(O?s.frontFace(s.CW):s.frontFace(s.CCW),b=O)}function De(O){O!==Tp?(Ie(s.CULL_FACE),O!==x&&(O===Gu?s.cullFace(s.BACK):O===Ap?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):be(s.CULL_FACE),x=O}function Lt(O){O!==L&&(te&&s.lineWidth(O),L=O)}function Je(O,J,Q){O?(Ie(s.POLYGON_OFFSET_FILL),(H!==J||z!==Q)&&(s.polygonOffset(J,Q),H=J,z=Q)):be(s.POLYGON_OFFSET_FILL)}function je(O){O?Ie(s.SCISSOR_TEST):be(s.SCISSOR_TEST)}function I(O){O===void 0&&(O=s.TEXTURE0+B-1),ee!==O&&(s.activeTexture(O),ee=O)}function w(O,J,Q){Q===void 0&&(ee===null?Q=s.TEXTURE0+B-1:Q=ee);let re=Ee[Q];re===void 0&&(re={type:void 0,texture:void 0},Ee[Q]=re),(re.type!==O||re.texture!==J)&&(ee!==Q&&(s.activeTexture(Q),ee=Q),s.bindTexture(O,J||ue[O]),re.type=O,re.texture=J)}function K(){let O=Ee[ee];O!==void 0&&O.type!==void 0&&(s.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function le(){try{s.compressedTexImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ce(){try{s.compressedTexImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function oe(){try{s.texSubImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Fe(){try{s.texSubImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ve(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Se(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Xe(){try{s.texStorage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ne(){try{s.texStorage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ae(){try{s.texImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function at(){try{s.texImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ze(O){ze.equals(O)===!1&&(s.scissor(O.x,O.y,O.z,O.w),ze.copy(O))}function Re(O){Ye.equals(O)===!1&&(s.viewport(O.x,O.y,O.z,O.w),Ye.copy(O))}function $e(O,J){let Q=l.get(J);Q===void 0&&(Q=new WeakMap,l.set(J,Q));let re=Q.get(O);re===void 0&&(re=s.getUniformBlockIndex(J,O.name),Q.set(O,re))}function ge(O,J){let re=l.get(J).get(O);o.get(J)!==re&&(s.uniformBlockBinding(J,re,O.__bindingPointIndex),o.set(J,re))}function Ft(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),c={},ee=null,Ee={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,m=null,p=null,M=null,y=null,S=null,F=null,A=new Ne(0,0,0),C=0,P=!1,b=null,x=null,L=null,H=null,z=null,ze.set(0,0,s.canvas.width,s.canvas.height),Ye.set(0,0,s.canvas.width,s.canvas.height),i.reset(),r.reset(),a.reset()}return{buffers:{color:i,depth:r,stencil:a},enable:Ie,disable:be,bindFramebuffer:nt,drawBuffers:rt,useProgram:ct,setBlending:it,setMaterial:Mt,setFlipSided:pt,setCullFace:De,setLineWidth:Lt,setPolygonOffset:Je,setScissorTest:je,activeTexture:I,bindTexture:w,unbindTexture:K,compressedTexImage2D:le,compressedTexImage3D:ce,texImage2D:Ae,texImage3D:at,updateUBOMapping:$e,uniformBlockBinding:ge,texStorage2D:Xe,texStorage3D:ne,texSubImage2D:oe,texSubImage3D:Fe,compressedTexSubImage2D:ve,compressedTexSubImage3D:Se,scissor:Ze,viewport:Re,reset:Ft}}function zd(s,e,t,n){let i=_x(n);switch(t){case Sf:return s*e;case wf:return s*e;case Ef:return s*e*2;case Uh:return s*e/i.components*i.byteLength;case Nh:return s*e/i.components*i.byteLength;case Tf:return s*e*2/i.components*i.byteLength;case Oh:return s*e*2/i.components*i.byteLength;case bf:return s*e*3/i.components*i.byteLength;case zn:return s*e*4/i.components*i.byteLength;case Fh:return s*e*4/i.components*i.byteLength;case fo:case po:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case mo:case go:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case gc:case yc:return Math.max(s,16)*Math.max(e,8)/4;case mc:case _c:return Math.max(s,8)*Math.max(e,8)/2;case xc:case vc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Mc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Sc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case bc:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case wc:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Ec:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Tc:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Ac:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Rc:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Cc:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Pc:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Ic:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Lc:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Dc:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Uc:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Nc:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case _o:case Oc:case Fc:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Af:case Bc:return Math.ceil(s/4)*Math.ceil(e/4)*8;case kc:case zc:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function _x(s){switch(s){case wi:case xf:return{byteLength:1,components:1};case Jr:case vf:case vn:return{byteLength:2,components:1};case Lh:case Dh:return{byteLength:2,components:4};case gs:case Ih:case En:return{byteLength:4,components:1};case Mf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function yx(s,e,t,n,i,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new he,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(I,w){return f?new OffscreenCanvas(I,w):Qr("canvas")}function _(I,w,K){let le=1,ce=je(I);if((ce.width>K||ce.height>K)&&(le=K/Math.max(ce.width,ce.height)),le<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){let oe=Math.floor(le*ce.width),Fe=Math.floor(le*ce.height);u===void 0&&(u=g(oe,Fe));let ve=w?g(oe,Fe):u;return ve.width=oe,ve.height=Fe,ve.getContext("2d").drawImage(I,0,0,oe,Fe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ce.width+"x"+ce.height+") to ("+oe+"x"+Fe+")."),ve}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ce.width+"x"+ce.height+")."),I;return I}function m(I){return I.generateMipmaps&&I.minFilter!==xn&&I.minFilter!==Ht}function p(I){s.generateMipmap(I)}function M(I,w,K,le,ce=!1){if(I!==null){if(s[I]!==void 0)return s[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let oe=w;if(w===s.RED&&(K===s.FLOAT&&(oe=s.R32F),K===s.HALF_FLOAT&&(oe=s.R16F),K===s.UNSIGNED_BYTE&&(oe=s.R8)),w===s.RED_INTEGER&&(K===s.UNSIGNED_BYTE&&(oe=s.R8UI),K===s.UNSIGNED_SHORT&&(oe=s.R16UI),K===s.UNSIGNED_INT&&(oe=s.R32UI),K===s.BYTE&&(oe=s.R8I),K===s.SHORT&&(oe=s.R16I),K===s.INT&&(oe=s.R32I)),w===s.RG&&(K===s.FLOAT&&(oe=s.RG32F),K===s.HALF_FLOAT&&(oe=s.RG16F),K===s.UNSIGNED_BYTE&&(oe=s.RG8)),w===s.RG_INTEGER&&(K===s.UNSIGNED_BYTE&&(oe=s.RG8UI),K===s.UNSIGNED_SHORT&&(oe=s.RG16UI),K===s.UNSIGNED_INT&&(oe=s.RG32UI),K===s.BYTE&&(oe=s.RG8I),K===s.SHORT&&(oe=s.RG16I),K===s.INT&&(oe=s.RG32I)),w===s.RGB&&K===s.UNSIGNED_INT_5_9_9_9_REV&&(oe=s.RGB9_E5),w===s.RGBA){let Fe=ce?xo:gt.getTransfer(le);K===s.FLOAT&&(oe=s.RGBA32F),K===s.HALF_FLOAT&&(oe=s.RGBA16F),K===s.UNSIGNED_BYTE&&(oe=Fe===Tt?s.SRGB8_ALPHA8:s.RGBA8),K===s.UNSIGNED_SHORT_4_4_4_4&&(oe=s.RGBA4),K===s.UNSIGNED_SHORT_5_5_5_1&&(oe=s.RGB5_A1)}return(oe===s.R16F||oe===s.R32F||oe===s.RG16F||oe===s.RG32F||oe===s.RGBA16F||oe===s.RGBA32F)&&e.get("EXT_color_buffer_float"),oe}function y(I,w){let K;return I?w===null||w===gs||w===dr?K=s.DEPTH24_STENCIL8:w===En?K=s.DEPTH32F_STENCIL8:w===Jr&&(K=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===gs||w===dr?K=s.DEPTH_COMPONENT24:w===En?K=s.DEPTH_COMPONENT32F:w===Jr&&(K=s.DEPTH_COMPONENT16),K}function S(I,w){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==xn&&I.minFilter!==Ht?Math.log2(Math.max(w.width,w.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?w.mipmaps.length:1}function F(I){let w=I.target;w.removeEventListener("dispose",F),C(w),w.isVideoTexture&&h.delete(w)}function A(I){let w=I.target;w.removeEventListener("dispose",A),b(w)}function C(I){let w=n.get(I);if(w.__webglInit===void 0)return;let K=I.source,le=d.get(K);if(le){let ce=le[w.__cacheKey];ce.usedTimes--,ce.usedTimes===0&&P(I),Object.keys(le).length===0&&d.delete(K)}n.remove(I)}function P(I){let w=n.get(I);s.deleteTexture(w.__webglTexture);let K=I.source,le=d.get(K);delete le[w.__cacheKey],a.memory.textures--}function b(I){let w=n.get(I);if(I.depthTexture&&I.depthTexture.dispose(),I.isWebGLCubeRenderTarget)for(let le=0;le<6;le++){if(Array.isArray(w.__webglFramebuffer[le]))for(let ce=0;ce<w.__webglFramebuffer[le].length;ce++)s.deleteFramebuffer(w.__webglFramebuffer[le][ce]);else s.deleteFramebuffer(w.__webglFramebuffer[le]);w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer[le])}else{if(Array.isArray(w.__webglFramebuffer))for(let le=0;le<w.__webglFramebuffer.length;le++)s.deleteFramebuffer(w.__webglFramebuffer[le]);else s.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&s.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let le=0;le<w.__webglColorRenderbuffer.length;le++)w.__webglColorRenderbuffer[le]&&s.deleteRenderbuffer(w.__webglColorRenderbuffer[le]);w.__webglDepthRenderbuffer&&s.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let K=I.textures;for(let le=0,ce=K.length;le<ce;le++){let oe=n.get(K[le]);oe.__webglTexture&&(s.deleteTexture(oe.__webglTexture),a.memory.textures--),n.remove(K[le])}n.remove(I)}let x=0;function L(){x=0}function H(){let I=x;return I>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+i.maxTextures),x+=1,I}function z(I){let w=[];return w.push(I.wrapS),w.push(I.wrapT),w.push(I.wrapR||0),w.push(I.magFilter),w.push(I.minFilter),w.push(I.anisotropy),w.push(I.internalFormat),w.push(I.format),w.push(I.type),w.push(I.generateMipmaps),w.push(I.premultiplyAlpha),w.push(I.flipY),w.push(I.unpackAlignment),w.push(I.colorSpace),w.join()}function B(I,w){let K=n.get(I);if(I.isVideoTexture&&Lt(I),I.isRenderTargetTexture===!1&&I.version>0&&K.__version!==I.version){let le=I.image;if(le===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(le.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ye(K,I,w);return}}t.bindTexture(s.TEXTURE_2D,K.__webglTexture,s.TEXTURE0+w)}function te(I,w){let K=n.get(I);if(I.version>0&&K.__version!==I.version){Ye(K,I,w);return}t.bindTexture(s.TEXTURE_2D_ARRAY,K.__webglTexture,s.TEXTURE0+w)}function V(I,w){let K=n.get(I);if(I.version>0&&K.__version!==I.version){Ye(K,I,w);return}t.bindTexture(s.TEXTURE_3D,K.__webglTexture,s.TEXTURE0+w)}function se(I,w){let K=n.get(I);if(I.version>0&&K.__version!==I.version){ie(K,I,w);return}t.bindTexture(s.TEXTURE_CUBE_MAP,K.__webglTexture,s.TEXTURE0+w)}let ee={[ms]:s.REPEAT,[Ct]:s.CLAMP_TO_EDGE,[Zr]:s.MIRRORED_REPEAT},Ee={[xn]:s.NEAREST,[Ph]:s.NEAREST_MIPMAP_NEAREST,[nr]:s.NEAREST_MIPMAP_LINEAR,[Ht]:s.LINEAR,[Gr]:s.LINEAR_MIPMAP_NEAREST,[ii]:s.LINEAR_MIPMAP_LINEAR},Me={[om]:s.NEVER,[fm]:s.ALWAYS,[lm]:s.LESS,[Pf]:s.LEQUAL,[cm]:s.EQUAL,[dm]:s.GEQUAL,[hm]:s.GREATER,[um]:s.NOTEQUAL};function Pe(I,w){if(w.type===En&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===Ht||w.magFilter===Gr||w.magFilter===nr||w.magFilter===ii||w.minFilter===Ht||w.minFilter===Gr||w.minFilter===nr||w.minFilter===ii)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(I,s.TEXTURE_WRAP_S,ee[w.wrapS]),s.texParameteri(I,s.TEXTURE_WRAP_T,ee[w.wrapT]),(I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY)&&s.texParameteri(I,s.TEXTURE_WRAP_R,ee[w.wrapR]),s.texParameteri(I,s.TEXTURE_MAG_FILTER,Ee[w.magFilter]),s.texParameteri(I,s.TEXTURE_MIN_FILTER,Ee[w.minFilter]),w.compareFunction&&(s.texParameteri(I,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(I,s.TEXTURE_COMPARE_FUNC,Me[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===xn||w.minFilter!==nr&&w.minFilter!==ii||w.type===En&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){let K=e.get("EXT_texture_filter_anisotropic");s.texParameterf(I,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function ze(I,w){let K=!1;I.__webglInit===void 0&&(I.__webglInit=!0,w.addEventListener("dispose",F));let le=w.source,ce=d.get(le);ce===void 0&&(ce={},d.set(le,ce));let oe=z(w);if(oe!==I.__cacheKey){ce[oe]===void 0&&(ce[oe]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,K=!0),ce[oe].usedTimes++;let Fe=ce[I.__cacheKey];Fe!==void 0&&(ce[I.__cacheKey].usedTimes--,Fe.usedTimes===0&&P(w)),I.__cacheKey=oe,I.__webglTexture=ce[oe].texture}return K}function Ye(I,w,K){let le=s.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(le=s.TEXTURE_2D_ARRAY),w.isData3DTexture&&(le=s.TEXTURE_3D);let ce=ze(I,w),oe=w.source;t.bindTexture(le,I.__webglTexture,s.TEXTURE0+K);let Fe=n.get(oe);if(oe.version!==Fe.__version||ce===!0){t.activeTexture(s.TEXTURE0+K);let ve=gt.getPrimaries(gt.workingColorSpace),Se=w.colorSpace===Fi?null:gt.getPrimaries(w.colorSpace),Xe=w.colorSpace===Fi||ve===Se?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xe);let ne=_(w.image,!1,i.maxTextureSize);ne=Je(w,ne);let Ae=r.convert(w.format,w.colorSpace),at=r.convert(w.type),Ze=M(w.internalFormat,Ae,at,w.colorSpace,w.isVideoTexture);Pe(le,w);let Re,$e=w.mipmaps,ge=w.isVideoTexture!==!0,Ft=Fe.__version===void 0||ce===!0,O=oe.dataReady,J=S(w,ne);if(w.isDepthTexture)Ze=y(w.format===fr,w.type),Ft&&(ge?t.texStorage2D(s.TEXTURE_2D,1,Ze,ne.width,ne.height):t.texImage2D(s.TEXTURE_2D,0,Ze,ne.width,ne.height,0,Ae,at,null));else if(w.isDataTexture)if($e.length>0){ge&&Ft&&t.texStorage2D(s.TEXTURE_2D,J,Ze,$e[0].width,$e[0].height);for(let Q=0,re=$e.length;Q<re;Q++)Re=$e[Q],ge?O&&t.texSubImage2D(s.TEXTURE_2D,Q,0,0,Re.width,Re.height,Ae,at,Re.data):t.texImage2D(s.TEXTURE_2D,Q,Ze,Re.width,Re.height,0,Ae,at,Re.data);w.generateMipmaps=!1}else ge?(Ft&&t.texStorage2D(s.TEXTURE_2D,J,Ze,ne.width,ne.height),O&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ne.width,ne.height,Ae,at,ne.data)):t.texImage2D(s.TEXTURE_2D,0,Ze,ne.width,ne.height,0,Ae,at,ne.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){ge&&Ft&&t.texStorage3D(s.TEXTURE_2D_ARRAY,J,Ze,$e[0].width,$e[0].height,ne.depth);for(let Q=0,re=$e.length;Q<re;Q++)if(Re=$e[Q],w.format!==zn)if(Ae!==null)if(ge){if(O)if(w.layerUpdates.size>0){let de=zd(Re.width,Re.height,w.format,w.type);for(let He of w.layerUpdates){let Ke=Re.data.subarray(He*de/Re.data.BYTES_PER_ELEMENT,(He+1)*de/Re.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Q,0,0,He,Re.width,Re.height,1,Ae,Ke,0,0)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Q,0,0,0,Re.width,Re.height,ne.depth,Ae,Re.data,0,0)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Q,Ze,Re.width,Re.height,ne.depth,0,Re.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ge?O&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,Q,0,0,0,Re.width,Re.height,ne.depth,Ae,at,Re.data):t.texImage3D(s.TEXTURE_2D_ARRAY,Q,Ze,Re.width,Re.height,ne.depth,0,Ae,at,Re.data)}else{ge&&Ft&&t.texStorage2D(s.TEXTURE_2D,J,Ze,$e[0].width,$e[0].height);for(let Q=0,re=$e.length;Q<re;Q++)Re=$e[Q],w.format!==zn?Ae!==null?ge?O&&t.compressedTexSubImage2D(s.TEXTURE_2D,Q,0,0,Re.width,Re.height,Ae,Re.data):t.compressedTexImage2D(s.TEXTURE_2D,Q,Ze,Re.width,Re.height,0,Re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ge?O&&t.texSubImage2D(s.TEXTURE_2D,Q,0,0,Re.width,Re.height,Ae,at,Re.data):t.texImage2D(s.TEXTURE_2D,Q,Ze,Re.width,Re.height,0,Ae,at,Re.data)}else if(w.isDataArrayTexture)if(ge){if(Ft&&t.texStorage3D(s.TEXTURE_2D_ARRAY,J,Ze,ne.width,ne.height,ne.depth),O)if(w.layerUpdates.size>0){let Q=zd(ne.width,ne.height,w.format,w.type);for(let re of w.layerUpdates){let de=ne.data.subarray(re*Q/ne.data.BYTES_PER_ELEMENT,(re+1)*Q/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,re,ne.width,ne.height,1,Ae,at,de)}w.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,Ae,at,ne.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ze,ne.width,ne.height,ne.depth,0,Ae,at,ne.data);else if(w.isData3DTexture)ge?(Ft&&t.texStorage3D(s.TEXTURE_3D,J,Ze,ne.width,ne.height,ne.depth),O&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,Ae,at,ne.data)):t.texImage3D(s.TEXTURE_3D,0,Ze,ne.width,ne.height,ne.depth,0,Ae,at,ne.data);else if(w.isFramebufferTexture){if(Ft)if(ge)t.texStorage2D(s.TEXTURE_2D,J,Ze,ne.width,ne.height);else{let Q=ne.width,re=ne.height;for(let de=0;de<J;de++)t.texImage2D(s.TEXTURE_2D,de,Ze,Q,re,0,Ae,at,null),Q>>=1,re>>=1}}else if($e.length>0){if(ge&&Ft){let Q=je($e[0]);t.texStorage2D(s.TEXTURE_2D,J,Ze,Q.width,Q.height)}for(let Q=0,re=$e.length;Q<re;Q++)Re=$e[Q],ge?O&&t.texSubImage2D(s.TEXTURE_2D,Q,0,0,Ae,at,Re):t.texImage2D(s.TEXTURE_2D,Q,Ze,Ae,at,Re);w.generateMipmaps=!1}else if(ge){if(Ft){let Q=je(ne);t.texStorage2D(s.TEXTURE_2D,J,Ze,Q.width,Q.height)}O&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Ae,at,ne)}else t.texImage2D(s.TEXTURE_2D,0,Ze,Ae,at,ne);m(w)&&p(le),Fe.__version=oe.version,w.onUpdate&&w.onUpdate(w)}I.__version=w.version}function ie(I,w,K){if(w.image.length!==6)return;let le=ze(I,w),ce=w.source;t.bindTexture(s.TEXTURE_CUBE_MAP,I.__webglTexture,s.TEXTURE0+K);let oe=n.get(ce);if(ce.version!==oe.__version||le===!0){t.activeTexture(s.TEXTURE0+K);let Fe=gt.getPrimaries(gt.workingColorSpace),ve=w.colorSpace===Fi?null:gt.getPrimaries(w.colorSpace),Se=w.colorSpace===Fi||Fe===ve?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);let Xe=w.isCompressedTexture||w.image[0].isCompressedTexture,ne=w.image[0]&&w.image[0].isDataTexture,Ae=[];for(let re=0;re<6;re++)!Xe&&!ne?Ae[re]=_(w.image[re],!0,i.maxCubemapSize):Ae[re]=ne?w.image[re].image:w.image[re],Ae[re]=Je(w,Ae[re]);let at=Ae[0],Ze=r.convert(w.format,w.colorSpace),Re=r.convert(w.type),$e=M(w.internalFormat,Ze,Re,w.colorSpace),ge=w.isVideoTexture!==!0,Ft=oe.__version===void 0||le===!0,O=ce.dataReady,J=S(w,at);Pe(s.TEXTURE_CUBE_MAP,w);let Q;if(Xe){ge&&Ft&&t.texStorage2D(s.TEXTURE_CUBE_MAP,J,$e,at.width,at.height);for(let re=0;re<6;re++){Q=Ae[re].mipmaps;for(let de=0;de<Q.length;de++){let He=Q[de];w.format!==zn?Ze!==null?ge?O&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,de,0,0,He.width,He.height,Ze,He.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,de,$e,He.width,He.height,0,He.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ge?O&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,de,0,0,He.width,He.height,Ze,Re,He.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,de,$e,He.width,He.height,0,Ze,Re,He.data)}}}else{if(Q=w.mipmaps,ge&&Ft){Q.length>0&&J++;let re=je(Ae[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,J,$e,re.width,re.height)}for(let re=0;re<6;re++)if(ne){ge?O&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Ae[re].width,Ae[re].height,Ze,Re,Ae[re].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,$e,Ae[re].width,Ae[re].height,0,Ze,Re,Ae[re].data);for(let de=0;de<Q.length;de++){let Ke=Q[de].image[re].image;ge?O&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,de+1,0,0,Ke.width,Ke.height,Ze,Re,Ke.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,de+1,$e,Ke.width,Ke.height,0,Ze,Re,Ke.data)}}else{ge?O&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Ze,Re,Ae[re]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,$e,Ze,Re,Ae[re]);for(let de=0;de<Q.length;de++){let He=Q[de];ge?O&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,de+1,0,0,Ze,Re,He.image[re]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,de+1,$e,Ze,Re,He.image[re])}}}m(w)&&p(s.TEXTURE_CUBE_MAP),oe.__version=ce.version,w.onUpdate&&w.onUpdate(w)}I.__version=w.version}function ue(I,w,K,le,ce,oe){let Fe=r.convert(K.format,K.colorSpace),ve=r.convert(K.type),Se=M(K.internalFormat,Fe,ve,K.colorSpace);if(!n.get(w).__hasExternalTextures){let ne=Math.max(1,w.width>>oe),Ae=Math.max(1,w.height>>oe);ce===s.TEXTURE_3D||ce===s.TEXTURE_2D_ARRAY?t.texImage3D(ce,oe,Se,ne,Ae,w.depth,0,Fe,ve,null):t.texImage2D(ce,oe,Se,ne,Ae,0,Fe,ve,null)}t.bindFramebuffer(s.FRAMEBUFFER,I),De(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,le,ce,n.get(K).__webglTexture,0,pt(w)):(ce===s.TEXTURE_2D||ce>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ce<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,le,ce,n.get(K).__webglTexture,oe),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ie(I,w,K){if(s.bindRenderbuffer(s.RENDERBUFFER,I),w.depthBuffer){let le=w.depthTexture,ce=le&&le.isDepthTexture?le.type:null,oe=y(w.stencilBuffer,ce),Fe=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ve=pt(w);De(w)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ve,oe,w.width,w.height):K?s.renderbufferStorageMultisample(s.RENDERBUFFER,ve,oe,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,oe,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Fe,s.RENDERBUFFER,I)}else{let le=w.textures;for(let ce=0;ce<le.length;ce++){let oe=le[ce],Fe=r.convert(oe.format,oe.colorSpace),ve=r.convert(oe.type),Se=M(oe.internalFormat,Fe,ve,oe.colorSpace),Xe=pt(w);K&&De(w)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Xe,Se,w.width,w.height):De(w)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Xe,Se,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,Se,w.width,w.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function be(I,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,I),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),B(w.depthTexture,0);let le=n.get(w.depthTexture).__webglTexture,ce=pt(w);if(w.depthTexture.format===ar)De(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,le,0,ce):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,le,0);else if(w.depthTexture.format===fr)De(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,le,0,ce):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,le,0);else throw new Error("Unknown depthTexture format")}function nt(I){let w=n.get(I),K=I.isWebGLCubeRenderTarget===!0;if(I.depthTexture&&!w.__autoAllocateDepthBuffer){if(K)throw new Error("target.depthTexture not supported in Cube render targets");be(w.__webglFramebuffer,I)}else if(K){w.__webglDepthbuffer=[];for(let le=0;le<6;le++)t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[le]),w.__webglDepthbuffer[le]=s.createRenderbuffer(),Ie(w.__webglDepthbuffer[le],I,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer=s.createRenderbuffer(),Ie(w.__webglDepthbuffer,I,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function rt(I,w,K){let le=n.get(I);w!==void 0&&ue(le.__webglFramebuffer,I,I.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),K!==void 0&&nt(I)}function ct(I){let w=I.texture,K=n.get(I),le=n.get(w);I.addEventListener("dispose",A);let ce=I.textures,oe=I.isWebGLCubeRenderTarget===!0,Fe=ce.length>1;if(Fe||(le.__webglTexture===void 0&&(le.__webglTexture=s.createTexture()),le.__version=w.version,a.memory.textures++),oe){K.__webglFramebuffer=[];for(let ve=0;ve<6;ve++)if(w.mipmaps&&w.mipmaps.length>0){K.__webglFramebuffer[ve]=[];for(let Se=0;Se<w.mipmaps.length;Se++)K.__webglFramebuffer[ve][Se]=s.createFramebuffer()}else K.__webglFramebuffer[ve]=s.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){K.__webglFramebuffer=[];for(let ve=0;ve<w.mipmaps.length;ve++)K.__webglFramebuffer[ve]=s.createFramebuffer()}else K.__webglFramebuffer=s.createFramebuffer();if(Fe)for(let ve=0,Se=ce.length;ve<Se;ve++){let Xe=n.get(ce[ve]);Xe.__webglTexture===void 0&&(Xe.__webglTexture=s.createTexture(),a.memory.textures++)}if(I.samples>0&&De(I)===!1){K.__webglMultisampledFramebuffer=s.createFramebuffer(),K.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let ve=0;ve<ce.length;ve++){let Se=ce[ve];K.__webglColorRenderbuffer[ve]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,K.__webglColorRenderbuffer[ve]);let Xe=r.convert(Se.format,Se.colorSpace),ne=r.convert(Se.type),Ae=M(Se.internalFormat,Xe,ne,Se.colorSpace,I.isXRRenderTarget===!0),at=pt(I);s.renderbufferStorageMultisample(s.RENDERBUFFER,at,Ae,I.width,I.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ve,s.RENDERBUFFER,K.__webglColorRenderbuffer[ve])}s.bindRenderbuffer(s.RENDERBUFFER,null),I.depthBuffer&&(K.__webglDepthRenderbuffer=s.createRenderbuffer(),Ie(K.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(oe){t.bindTexture(s.TEXTURE_CUBE_MAP,le.__webglTexture),Pe(s.TEXTURE_CUBE_MAP,w);for(let ve=0;ve<6;ve++)if(w.mipmaps&&w.mipmaps.length>0)for(let Se=0;Se<w.mipmaps.length;Se++)ue(K.__webglFramebuffer[ve][Se],I,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Se);else ue(K.__webglFramebuffer[ve],I,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0);m(w)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Fe){for(let ve=0,Se=ce.length;ve<Se;ve++){let Xe=ce[ve],ne=n.get(Xe);t.bindTexture(s.TEXTURE_2D,ne.__webglTexture),Pe(s.TEXTURE_2D,Xe),ue(K.__webglFramebuffer,I,Xe,s.COLOR_ATTACHMENT0+ve,s.TEXTURE_2D,0),m(Xe)&&p(s.TEXTURE_2D)}t.unbindTexture()}else{let ve=s.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ve=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ve,le.__webglTexture),Pe(ve,w),w.mipmaps&&w.mipmaps.length>0)for(let Se=0;Se<w.mipmaps.length;Se++)ue(K.__webglFramebuffer[Se],I,w,s.COLOR_ATTACHMENT0,ve,Se);else ue(K.__webglFramebuffer,I,w,s.COLOR_ATTACHMENT0,ve,0);m(w)&&p(ve),t.unbindTexture()}I.depthBuffer&&nt(I)}function It(I){let w=I.textures;for(let K=0,le=w.length;K<le;K++){let ce=w[K];if(m(ce)){let oe=I.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,Fe=n.get(ce).__webglTexture;t.bindTexture(oe,Fe),p(oe),t.unbindTexture()}}}let U=[],it=[];function Mt(I){if(I.samples>0){if(De(I)===!1){let w=I.textures,K=I.width,le=I.height,ce=s.COLOR_BUFFER_BIT,oe=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Fe=n.get(I),ve=w.length>1;if(ve)for(let Se=0;Se<w.length;Se++)t.bindFramebuffer(s.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Se,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Fe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Se,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Fe.__webglFramebuffer);for(let Se=0;Se<w.length;Se++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(ce|=s.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(ce|=s.STENCIL_BUFFER_BIT)),ve){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Fe.__webglColorRenderbuffer[Se]);let Xe=n.get(w[Se]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Xe,0)}s.blitFramebuffer(0,0,K,le,0,0,K,le,ce,s.NEAREST),l===!0&&(U.length=0,it.length=0,U.push(s.COLOR_ATTACHMENT0+Se),I.depthBuffer&&I.resolveDepthBuffer===!1&&(U.push(oe),it.push(oe),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,it)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,U))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ve)for(let Se=0;Se<w.length;Se++){t.bindFramebuffer(s.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Se,s.RENDERBUFFER,Fe.__webglColorRenderbuffer[Se]);let Xe=n.get(w[Se]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Fe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Se,s.TEXTURE_2D,Xe,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){let w=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[w])}}}function pt(I){return Math.min(i.maxSamples,I.samples)}function De(I){let w=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Lt(I){let w=a.render.frame;h.get(I)!==w&&(h.set(I,w),I.update())}function Je(I,w){let K=I.colorSpace,le=I.format,ce=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||K!==en&&K!==Fi&&(gt.getTransfer(K)===Tt?(le!==zn||ce!==wi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",K)),w}function je(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=L,this.setTexture2D=B,this.setTexture2DArray=te,this.setTexture3D=V,this.setTextureCube=se,this.rebindTextures=rt,this.setupRenderTarget=ct,this.updateRenderTargetMipmap=It,this.updateMultisampleRenderTarget=Mt,this.setupDepthRenderbuffer=nt,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=De}function xx(s,e){function t(n,i=Fi){let r,a=gt.getTransfer(i);if(n===wi)return s.UNSIGNED_BYTE;if(n===Lh)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Dh)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Mf)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===xf)return s.BYTE;if(n===vf)return s.SHORT;if(n===Jr)return s.UNSIGNED_SHORT;if(n===Ih)return s.INT;if(n===gs)return s.UNSIGNED_INT;if(n===En)return s.FLOAT;if(n===vn)return s.HALF_FLOAT;if(n===Sf)return s.ALPHA;if(n===bf)return s.RGB;if(n===zn)return s.RGBA;if(n===wf)return s.LUMINANCE;if(n===Ef)return s.LUMINANCE_ALPHA;if(n===ar)return s.DEPTH_COMPONENT;if(n===fr)return s.DEPTH_STENCIL;if(n===Uh)return s.RED;if(n===Nh)return s.RED_INTEGER;if(n===Tf)return s.RG;if(n===Oh)return s.RG_INTEGER;if(n===Fh)return s.RGBA_INTEGER;if(n===fo||n===po||n===mo||n===go)if(a===Tt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===fo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===po)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===mo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===go)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===fo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===po)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===mo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===go)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===mc||n===gc||n===_c||n===yc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===mc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===gc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===_c)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===yc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===xc||n===vc||n===Mc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===xc||n===vc)return a===Tt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Mc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Sc||n===bc||n===wc||n===Ec||n===Tc||n===Ac||n===Rc||n===Cc||n===Pc||n===Ic||n===Lc||n===Dc||n===Uc||n===Nc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Sc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===bc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===wc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ec)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Tc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ac)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Rc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Cc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Pc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ic)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Lc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Dc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Uc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Nc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===_o||n===Oc||n===Fc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===_o)return a===Tt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Oc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Fc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Af||n===Bc||n===kc||n===zc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===_o)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Bc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===kc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===zc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===dr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var th=class extends sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Qt=class extends kt{constructor(){super(),this.isGroup=!0,this.type="Group"}},vx={type:"move"},Xr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let _ of e.hand.values()){let m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(vx)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Qt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Mx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Sx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,nh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let i=new un,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new an({vertexShader:Mx,fragmentShader:Sx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Xt(new yr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ih=class extends Hi{constructor(e,t){super();let n=this,i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null,_=new nh,m=t.getContextAttributes(),p=null,M=null,y=[],S=[],F=new he,A=null,C=new sn;C.layers.enable(1),C.viewport=new Et;let P=new sn;P.layers.enable(2),P.viewport=new Et;let b=[C,P],x=new th;x.layers.enable(1),x.layers.enable(2);let L=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let ue=y[ie];return ue===void 0&&(ue=new Xr,y[ie]=ue),ue.getTargetRaySpace()},this.getControllerGrip=function(ie){let ue=y[ie];return ue===void 0&&(ue=new Xr,y[ie]=ue),ue.getGripSpace()},this.getHand=function(ie){let ue=y[ie];return ue===void 0&&(ue=new Xr,y[ie]=ue),ue.getHandSpace()};function z(ie){let ue=S.indexOf(ie.inputSource);if(ue===-1)return;let Ie=y[ue];Ie!==void 0&&(Ie.update(ie.inputSource,ie.frame,c||a),Ie.dispatchEvent({type:ie.type,data:ie.inputSource}))}function B(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",B),i.removeEventListener("inputsourceschange",te);for(let ie=0;ie<y.length;ie++){let ue=S[ie];ue!==null&&(S[ie]=null,y[ie].disconnect(ue))}L=null,H=null,_.reset(),e.setRenderTarget(p),f=null,d=null,u=null,i=null,M=null,Ye.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(F.width,F.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ie){r=ie,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){o=ie,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(ie){c=ie},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(ie){if(i=ie,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",B),i.addEventListener("inputsourceschange",te),m.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(F),i.renderState.layers===void 0){let ue={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,ue),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new Tn(f.framebufferWidth,f.framebufferHeight,{format:zn,type:wi,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ue=null,Ie=null,be=null;m.depth&&(be=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ue=m.stencil?fr:ar,Ie=m.stencil?dr:gs);let nt={colorFormat:t.RGBA8,depthFormat:be,scaleFactor:r};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(nt),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new Tn(d.textureWidth,d.textureHeight,{format:zn,type:wi,depthTexture:new Po(d.textureWidth,d.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Ye.setContext(i),Ye.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function te(ie){for(let ue=0;ue<ie.removed.length;ue++){let Ie=ie.removed[ue],be=S.indexOf(Ie);be>=0&&(S[be]=null,y[be].disconnect(Ie))}for(let ue=0;ue<ie.added.length;ue++){let Ie=ie.added[ue],be=S.indexOf(Ie);if(be===-1){for(let rt=0;rt<y.length;rt++)if(rt>=S.length){S.push(Ie),be=rt;break}else if(S[rt]===null){S[rt]=Ie,be=rt;break}if(be===-1)break}let nt=y[be];nt&&nt.connect(Ie)}}let V=new T,se=new T;function ee(ie,ue,Ie){V.setFromMatrixPosition(ue.matrixWorld),se.setFromMatrixPosition(Ie.matrixWorld);let be=V.distanceTo(se),nt=ue.projectionMatrix.elements,rt=Ie.projectionMatrix.elements,ct=nt[14]/(nt[10]-1),It=nt[14]/(nt[10]+1),U=(nt[9]+1)/nt[5],it=(nt[9]-1)/nt[5],Mt=(nt[8]-1)/nt[0],pt=(rt[8]+1)/rt[0],De=ct*Mt,Lt=ct*pt,Je=be/(-Mt+pt),je=Je*-Mt;ue.matrixWorld.decompose(ie.position,ie.quaternion,ie.scale),ie.translateX(je),ie.translateZ(Je),ie.matrixWorld.compose(ie.position,ie.quaternion,ie.scale),ie.matrixWorldInverse.copy(ie.matrixWorld).invert();let I=ct+Je,w=It+Je,K=De-je,le=Lt+(be-je),ce=U*It/w*I,oe=it*It/w*I;ie.projectionMatrix.makePerspective(K,le,ce,oe,I,w),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert()}function Ee(ie,ue){ue===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(ue.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(i===null)return;_.texture!==null&&(ie.near=_.depthNear,ie.far=_.depthFar),x.near=P.near=C.near=ie.near,x.far=P.far=C.far=ie.far,(L!==x.near||H!==x.far)&&(i.updateRenderState({depthNear:x.near,depthFar:x.far}),L=x.near,H=x.far,C.near=L,C.far=H,P.near=L,P.far=H,C.updateProjectionMatrix(),P.updateProjectionMatrix(),ie.updateProjectionMatrix());let ue=ie.parent,Ie=x.cameras;Ee(x,ue);for(let be=0;be<Ie.length;be++)Ee(Ie[be],ue);Ie.length===2?ee(x,C,P):x.projectionMatrix.copy(C.projectionMatrix),Me(ie,x,ue)};function Me(ie,ue,Ie){Ie===null?ie.matrix.copy(ue.matrixWorld):(ie.matrix.copy(Ie.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(ue.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(ue.projectionMatrix),ie.projectionMatrixInverse.copy(ue.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=gr*2*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(ie){l=ie,d!==null&&(d.fixedFoveation=ie),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=ie)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let Pe=null;function ze(ie,ue){if(h=ue.getViewerPose(c||a),g=ue,h!==null){let Ie=h.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let be=!1;Ie.length!==x.cameras.length&&(x.cameras.length=0,be=!0);for(let rt=0;rt<Ie.length;rt++){let ct=Ie[rt],It=null;if(f!==null)It=f.getViewport(ct);else{let it=u.getViewSubImage(d,ct);It=it.viewport,rt===0&&(e.setRenderTargetTextures(M,it.colorTexture,d.ignoreDepthValues?void 0:it.depthStencilTexture),e.setRenderTarget(M))}let U=b[rt];U===void 0&&(U=new sn,U.layers.enable(rt),U.viewport=new Et,b[rt]=U),U.matrix.fromArray(ct.transform.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale),U.projectionMatrix.fromArray(ct.projectionMatrix),U.projectionMatrixInverse.copy(U.projectionMatrix).invert(),U.viewport.set(It.x,It.y,It.width,It.height),rt===0&&(x.matrix.copy(U.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),be===!0&&x.cameras.push(U)}let nt=i.enabledFeatures;if(nt&&nt.includes("depth-sensing")){let rt=u.getDepthInformation(Ie[0]);rt&&rt.isValid&&rt.texture&&_.init(e,rt,i.renderState)}}for(let Ie=0;Ie<y.length;Ie++){let be=S[Ie],nt=y[Ie];be!==null&&nt!==void 0&&nt.update(be,ue,c||a)}Pe&&Pe(ie,ue),ue.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ue}),g=null}let Ye=new Nf;Ye.setAnimationLoop(ze),this.setAnimationLoop=function(ie){Pe=ie},this.dispose=function(){}}},us=new Xn,bx=new Qe;function wx(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Uf(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,M,y,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,S)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,M,y):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Rn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Rn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let M=e.get(p),y=M.envMap,S=M.envMapRotation;y&&(m.envMap.value=y,us.copy(S),us.x*=-1,us.y*=-1,us.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(us.y*=-1,us.z*=-1),m.envMapRotation.value.setFromMatrix4(bx.makeRotationFromEuler(us)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Rn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Ex(s,e,t,n){let i={},r={},a=[],o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,y){let S=y.program;n.uniformBlockBinding(M,S)}function c(M,y){let S=i[M.id];S===void 0&&(g(M),S=h(M),i[M.id]=S,M.addEventListener("dispose",m));let F=y.program;n.updateUBOMapping(M,F);let A=e.render.frame;r[M.id]!==A&&(d(M),r[M.id]=A)}function h(M){let y=u();M.__bindingPointIndex=y;let S=s.createBuffer(),F=M.__size,A=M.usage;return s.bindBuffer(s.UNIFORM_BUFFER,S),s.bufferData(s.UNIFORM_BUFFER,F,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,S),S}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){let y=i[M.id],S=M.uniforms,F=M.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let A=0,C=S.length;A<C;A++){let P=Array.isArray(S[A])?S[A]:[S[A]];for(let b=0,x=P.length;b<x;b++){let L=P[b];if(f(L,A,b,F)===!0){let H=L.__offset,z=Array.isArray(L.value)?L.value:[L.value],B=0;for(let te=0;te<z.length;te++){let V=z[te],se=_(V);typeof V=="number"||typeof V=="boolean"?(L.__data[0]=V,s.bufferSubData(s.UNIFORM_BUFFER,H+B,L.__data)):V.isMatrix3?(L.__data[0]=V.elements[0],L.__data[1]=V.elements[1],L.__data[2]=V.elements[2],L.__data[3]=0,L.__data[4]=V.elements[3],L.__data[5]=V.elements[4],L.__data[6]=V.elements[5],L.__data[7]=0,L.__data[8]=V.elements[6],L.__data[9]=V.elements[7],L.__data[10]=V.elements[8],L.__data[11]=0):(V.toArray(L.__data,B),B+=se.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,H,L.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(M,y,S,F){let A=M.value,C=y+"_"+S;if(F[C]===void 0)return typeof A=="number"||typeof A=="boolean"?F[C]=A:F[C]=A.clone(),!0;{let P=F[C];if(typeof A=="number"||typeof A=="boolean"){if(P!==A)return F[C]=A,!0}else if(P.equals(A)===!1)return P.copy(A),!0}return!1}function g(M){let y=M.uniforms,S=0,F=16;for(let C=0,P=y.length;C<P;C++){let b=Array.isArray(y[C])?y[C]:[y[C]];for(let x=0,L=b.length;x<L;x++){let H=b[x],z=Array.isArray(H.value)?H.value:[H.value];for(let B=0,te=z.length;B<te;B++){let V=z[B],se=_(V),ee=S%F;ee!==0&&F-ee<se.boundary&&(S+=F-ee),H.__data=new Float32Array(se.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=S,S+=se.storage}}}let A=S%F;return A>0&&(S+=F-A),M.__size=S,M.__cache={},this}function _(M){let y={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(y.boundary=4,y.storage=4):M.isVector2?(y.boundary=8,y.storage=8):M.isVector3||M.isColor?(y.boundary=16,y.storage=12):M.isVector4?(y.boundary=16,y.storage=16):M.isMatrix3?(y.boundary=48,y.storage=48):M.isMatrix4?(y.boundary=64,y.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),y}function m(M){let y=M.target;y.removeEventListener("dispose",m);let S=a.indexOf(y.__bindingPointIndex);a.splice(S,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function p(){for(let M in i)s.deleteBuffer(i[M]);a=[],i={},r={}}return{bind:l,update:c,dispose:p}}var Io=class{constructor(e={}){let{canvas:t=Pm(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;let f=new Uint32Array(4),g=new Int32Array(4),_=null,m=null,p=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=vt,this.toneMapping=zi,this.toneMappingExposure=1;let y=this,S=!1,F=0,A=0,C=null,P=-1,b=null,x=new Et,L=new Et,H=null,z=new Ne(0),B=0,te=t.width,V=t.height,se=1,ee=null,Ee=null,Me=new Et(0,0,te,V),Pe=new Et(0,0,te,V),ze=!1,Ye=new ea,ie=!1,ue=!1,Ie=new Qe,be=new T,nt=new Et,rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ct=!1;function It(){return C===null?se:1}let U=n;function it(E,k){return t.getContext(E,k)}try{let E={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r166"),t.addEventListener("webglcontextlost",Q,!1),t.addEventListener("webglcontextrestored",re,!1),t.addEventListener("webglcontextcreationerror",de,!1),U===null){let k="webgl2";if(U=it(k,E),U===null)throw it(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Mt,pt,De,Lt,Je,je,I,w,K,le,ce,oe,Fe,ve,Se,Xe,ne,Ae,at,Ze,Re,$e,ge,Ft;function O(){Mt=new G_(U),Mt.init(),$e=new xx(U,Mt),pt=new F_(U,Mt,e,$e),De=new gx(U),Lt=new q_(U),Je=new sx,je=new yx(U,Mt,De,Je,pt,$e,Lt),I=new k_(y),w=new V_(y),K=new jm(U),ge=new N_(U,K),le=new W_(U,K,Lt,ge),ce=new $_(U,le,K,Lt),at=new Y_(U,pt,je),Xe=new B_(Je),oe=new ix(y,I,w,Mt,pt,ge,Xe),Fe=new wx(y,Je),ve=new ax,Se=new dx(Mt),Ae=new U_(y,I,w,De,ce,d,l),ne=new mx(y,ce,pt),Ft=new Ex(U,Lt,pt,De),Ze=new O_(U,Mt,Lt),Re=new X_(U,Mt,Lt),Lt.programs=oe.programs,y.capabilities=pt,y.extensions=Mt,y.properties=Je,y.renderLists=ve,y.shadowMap=ne,y.state=De,y.info=Lt}O();let J=new ih(y,U);this.xr=J,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let E=Mt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=Mt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return se},this.setPixelRatio=function(E){E!==void 0&&(se=E,this.setSize(te,V,!1))},this.getSize=function(E){return E.set(te,V)},this.setSize=function(E,k,Y=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}te=E,V=k,t.width=Math.floor(E*se),t.height=Math.floor(k*se),Y===!0&&(t.style.width=E+"px",t.style.height=k+"px"),this.setViewport(0,0,E,k)},this.getDrawingBufferSize=function(E){return E.set(te*se,V*se).floor()},this.setDrawingBufferSize=function(E,k,Y){te=E,V=k,se=Y,t.width=Math.floor(E*Y),t.height=Math.floor(k*Y),this.setViewport(0,0,E,k)},this.getCurrentViewport=function(E){return E.copy(x)},this.getViewport=function(E){return E.copy(Me)},this.setViewport=function(E,k,Y,$){E.isVector4?Me.set(E.x,E.y,E.z,E.w):Me.set(E,k,Y,$),De.viewport(x.copy(Me).multiplyScalar(se).round())},this.getScissor=function(E){return E.copy(Pe)},this.setScissor=function(E,k,Y,$){E.isVector4?Pe.set(E.x,E.y,E.z,E.w):Pe.set(E,k,Y,$),De.scissor(L.copy(Pe).multiplyScalar(se).round())},this.getScissorTest=function(){return ze},this.setScissorTest=function(E){De.setScissorTest(ze=E)},this.setOpaqueSort=function(E){ee=E},this.setTransparentSort=function(E){Ee=E},this.getClearColor=function(E){return E.copy(Ae.getClearColor())},this.setClearColor=function(){Ae.setClearColor.apply(Ae,arguments)},this.getClearAlpha=function(){return Ae.getClearAlpha()},this.setClearAlpha=function(){Ae.setClearAlpha.apply(Ae,arguments)},this.clear=function(E=!0,k=!0,Y=!0){let $=0;if(E){let G=!1;if(C!==null){let fe=C.texture.format;G=fe===Fh||fe===Oh||fe===Nh}if(G){let fe=C.texture.type,Te=fe===wi||fe===gs||fe===Jr||fe===dr||fe===Lh||fe===Dh,Ce=Ae.getClearColor(),ye=Ae.getClearAlpha(),qe=Ce.r,Ve=Ce.g,Be=Ce.b;Te?(f[0]=qe,f[1]=Ve,f[2]=Be,f[3]=ye,U.clearBufferuiv(U.COLOR,0,f)):(g[0]=qe,g[1]=Ve,g[2]=Be,g[3]=ye,U.clearBufferiv(U.COLOR,0,g))}else $|=U.COLOR_BUFFER_BIT}k&&($|=U.DEPTH_BUFFER_BIT),Y&&($|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Q,!1),t.removeEventListener("webglcontextrestored",re,!1),t.removeEventListener("webglcontextcreationerror",de,!1),ve.dispose(),Se.dispose(),Je.dispose(),I.dispose(),w.dispose(),ce.dispose(),ge.dispose(),Ft.dispose(),oe.dispose(),J.dispose(),J.removeEventListener("sessionstart",Ln),J.removeEventListener("sessionend",es),Ci.stop()};function Q(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function re(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;let E=Lt.autoReset,k=ne.enabled,Y=ne.autoUpdate,$=ne.needsUpdate,G=ne.type;O(),Lt.autoReset=E,ne.enabled=k,ne.autoUpdate=Y,ne.needsUpdate=$,ne.type=G}function de(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function He(E){let k=E.target;k.removeEventListener("dispose",He),Ke(k)}function Ke(E){qt(E),Je.remove(E)}function qt(E){let k=Je.get(E).programs;k!==void 0&&(k.forEach(function(Y){oe.releaseProgram(Y)}),E.isShaderMaterial&&oe.releaseShaderCache(E))}this.renderBufferDirect=function(E,k,Y,$,G,fe){k===null&&(k=rt);let Te=G.isMesh&&G.matrixWorld.determinant()<0,Ce=Sl(E,k,Y,$,G);De.setMaterial($,Te);let ye=Y.index,qe=1;if($.wireframe===!0){if(ye=le.getWireframeAttribute(Y),ye===void 0)return;qe=2}let Ve=Y.drawRange,Be=Y.attributes.position,ut=Ve.start*qe,Ut=(Ve.start+Ve.count)*qe;fe!==null&&(ut=Math.max(ut,fe.start*qe),Ut=Math.min(Ut,(fe.start+fe.count)*qe)),ye!==null?(ut=Math.max(ut,0),Ut=Math.min(Ut,ye.count)):Be!=null&&(ut=Math.max(ut,0),Ut=Math.min(Ut,Be.count));let Nt=Ut-ut;if(Nt<0||Nt===1/0)return;ge.setup(G,$,Ce,Y,ye);let fn,yt=Ze;if(ye!==null&&(fn=K.get(ye),yt=Re,yt.setIndex(fn)),G.isMesh)$.wireframe===!0?(De.setLineWidth($.wireframeLinewidth*It()),yt.setMode(U.LINES)):yt.setMode(U.TRIANGLES);else if(G.isLine){let Ue=$.linewidth;Ue===void 0&&(Ue=1),De.setLineWidth(Ue*It()),G.isLineSegments?yt.setMode(U.LINES):G.isLineLoop?yt.setMode(U.LINE_LOOP):yt.setMode(U.LINE_STRIP)}else G.isPoints?yt.setMode(U.POINTS):G.isSprite&&yt.setMode(U.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)yt.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(Mt.get("WEBGL_multi_draw"))yt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let Ue=G._multiDrawStarts,nn=G._multiDrawCounts,xt=G._multiDrawCount,pn=ye?K.get(ye).bytesPerElement:1,fi=Je.get($).currentProgram.getUniforms();for(let mn=0;mn<xt;mn++)fi.setValue(U,"_gl_DrawID",mn),yt.render(Ue[mn]/pn,nn[mn])}else if(G.isInstancedMesh)yt.renderInstances(ut,Nt,G.count);else if(Y.isInstancedBufferGeometry){let Ue=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,nn=Math.min(Y.instanceCount,Ue);yt.renderInstances(ut,Nt,nn)}else yt.render(ut,Nt)};function Dt(E,k,Y){E.transparent===!0&&E.side===$t&&E.forceSinglePass===!1?(E.side=Rn,E.needsUpdate=!0,ns(E,k,Y),E.side=Vn,E.needsUpdate=!0,ns(E,k,Y),E.side=$t):ns(E,k,Y)}this.compile=function(E,k,Y=null){Y===null&&(Y=E),m=Se.get(Y),m.init(k),M.push(m),Y.traverseVisible(function(G){G.isLight&&G.layers.test(k.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),E!==Y&&E.traverseVisible(function(G){G.isLight&&G.layers.test(k.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),m.setupLights();let $=new Set;return E.traverse(function(G){let fe=G.material;if(fe)if(Array.isArray(fe))for(let Te=0;Te<fe.length;Te++){let Ce=fe[Te];Dt(Ce,Y,G),$.add(Ce)}else Dt(fe,Y,G),$.add(fe)}),M.pop(),m=null,$},this.compileAsync=function(E,k,Y=null){let $=this.compile(E,k,Y);return new Promise(G=>{function fe(){if($.forEach(function(Te){Je.get(Te).currentProgram.isReady()&&$.delete(Te)}),$.size===0){G(E);return}setTimeout(fe,10)}Mt.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let _t=null;function In(E){_t&&_t(E)}function Ln(){Ci.stop()}function es(){Ci.start()}let Ci=new Nf;Ci.setAnimationLoop(In),typeof self<"u"&&Ci.setContext(self),this.setAnimationLoop=function(E){_t=E,J.setAnimationLoop(E),E===null?Ci.stop():Ci.start()},J.addEventListener("sessionstart",Ln),J.addEventListener("sessionend",es),this.render=function(E,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(k),k=J.getCamera()),E.isScene===!0&&E.onBeforeRender(y,E,k,C),m=Se.get(E,M.length),m.init(k),M.push(m),Ie.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Ye.setFromProjectionMatrix(Ie),ue=this.localClippingEnabled,ie=Xe.init(this.clippingPlanes,ue),_=ve.get(E,p.length),_.init(),p.push(_),J.enabled===!0&&J.isPresenting===!0){let fe=y.xr.getDepthSensingMesh();fe!==null&&st(fe,k,-1/0,y.sortObjects)}st(E,k,0,y.sortObjects),_.finish(),y.sortObjects===!0&&_.sort(ee,Ee),ct=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,ct&&Ae.addToRenderList(_,E),this.info.render.frame++,ie===!0&&Xe.beginShadows();let Y=m.state.shadowsArray;ne.render(Y,E,k),ie===!0&&Xe.endShadows(),this.info.autoReset===!0&&this.info.reset();let $=_.opaque,G=_.transmissive;if(m.setupLights(),k.isArrayCamera){let fe=k.cameras;if(G.length>0)for(let Te=0,Ce=fe.length;Te<Ce;Te++){let ye=fe[Te];Ma($,G,E,ye)}ct&&Ae.render(E);for(let Te=0,Ce=fe.length;Te<Ce;Te++){let ye=fe[Te];ai(_,E,ye,ye.viewport)}}else G.length>0&&Ma($,G,E,k),ct&&Ae.render(E),ai(_,E,k);C!==null&&(je.updateMultisampleRenderTarget(C),je.updateRenderTargetMipmap(C)),E.isScene===!0&&E.onAfterRender(y,E,k),ge.resetDefaultState(),P=-1,b=null,M.pop(),M.length>0?(m=M[M.length-1],ie===!0&&Xe.setGlobalState(y.clippingPlanes,m.state.camera)):m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function st(E,k,Y,$){if(E.visible===!1)return;if(E.layers.test(k.layers)){if(E.isGroup)Y=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(k);else if(E.isLight)m.pushLight(E),E.castShadow&&m.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Ye.intersectsSprite(E)){$&&nt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Ie);let Te=ce.update(E),Ce=E.material;Ce.visible&&_.push(E,Te,Ce,Y,nt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Ye.intersectsObject(E))){let Te=ce.update(E),Ce=E.material;if($&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),nt.copy(E.boundingSphere.center)):(Te.boundingSphere===null&&Te.computeBoundingSphere(),nt.copy(Te.boundingSphere.center)),nt.applyMatrix4(E.matrixWorld).applyMatrix4(Ie)),Array.isArray(Ce)){let ye=Te.groups;for(let qe=0,Ve=ye.length;qe<Ve;qe++){let Be=ye[qe],ut=Ce[Be.materialIndex];ut&&ut.visible&&_.push(E,Te,ut,Y,nt.z,Be)}}else Ce.visible&&_.push(E,Te,Ce,Y,nt.z,null)}}let fe=E.children;for(let Te=0,Ce=fe.length;Te<Ce;Te++)st(fe[Te],k,Y,$)}function ai(E,k,Y,$){let G=E.opaque,fe=E.transmissive,Te=E.transparent;m.setupLightsView(Y),ie===!0&&Xe.setGlobalState(y.clippingPlanes,Y),$&&De.viewport(x.copy($)),G.length>0&&ts(G,k,Y),fe.length>0&&ts(fe,k,Y),Te.length>0&&ts(Te,k,Y),De.buffers.depth.setTest(!0),De.buffers.depth.setMask(!0),De.buffers.color.setMask(!0),De.setPolygonOffset(!1)}function Ma(E,k,Y,$){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[$.id]===void 0&&(m.state.transmissionRenderTarget[$.id]=new Tn(1,1,{generateMipmaps:!0,type:Mt.has("EXT_color_buffer_half_float")||Mt.has("EXT_color_buffer_float")?vn:wi,minFilter:ii,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:gt.workingColorSpace}));let fe=m.state.transmissionRenderTarget[$.id],Te=$.viewport||x;fe.setSize(Te.z,Te.w);let Ce=y.getRenderTarget();y.setRenderTarget(fe),y.getClearColor(z),B=y.getClearAlpha(),B<1&&y.setClearColor(16777215,.5),ct?Ae.render(Y):y.clear();let ye=y.toneMapping;y.toneMapping=zi;let qe=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),m.setupLightsView($),ie===!0&&Xe.setGlobalState(y.clippingPlanes,$),ts(E,Y,$),je.updateMultisampleRenderTarget(fe),je.updateRenderTargetMipmap(fe),Mt.has("WEBGL_multisampled_render_to_texture")===!1){let Ve=!1;for(let Be=0,ut=k.length;Be<ut;Be++){let Ut=k[Be],Nt=Ut.object,fn=Ut.geometry,yt=Ut.material,Ue=Ut.group;if(yt.side===$t&&Nt.layers.test($.layers)){let nn=yt.side;yt.side=Rn,yt.needsUpdate=!0,Rr(Nt,Y,$,fn,yt,Ue),yt.side=nn,yt.needsUpdate=!0,Ve=!0}}Ve===!0&&(je.updateMultisampleRenderTarget(fe),je.updateRenderTargetMipmap(fe))}y.setRenderTarget(Ce),y.setClearColor(z,B),qe!==void 0&&($.viewport=qe),y.toneMapping=ye}function ts(E,k,Y){let $=k.isScene===!0?k.overrideMaterial:null;for(let G=0,fe=E.length;G<fe;G++){let Te=E[G],Ce=Te.object,ye=Te.geometry,qe=$===null?Te.material:$,Ve=Te.group;Ce.layers.test(Y.layers)&&Rr(Ce,k,Y,ye,qe,Ve)}}function Rr(E,k,Y,$,G,fe){E.onBeforeRender(y,k,Y,$,G,fe),E.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),G.transparent===!0&&G.side===$t&&G.forceSinglePass===!1?(G.side=Rn,G.needsUpdate=!0,y.renderBufferDirect(Y,k,$,G,E,fe),G.side=Vn,G.needsUpdate=!0,y.renderBufferDirect(Y,k,$,G,E,fe),G.side=$t):y.renderBufferDirect(Y,k,$,G,E,fe),E.onAfterRender(y,k,Y,$,G,fe)}function ns(E,k,Y){k.isScene!==!0&&(k=rt);let $=Je.get(E),G=m.state.lights,fe=m.state.shadowsArray,Te=G.state.version,Ce=oe.getParameters(E,G.state,fe,k,Y),ye=oe.getProgramCacheKey(Ce),qe=$.programs;$.environment=E.isMeshStandardMaterial?k.environment:null,$.fog=k.fog,$.envMap=(E.isMeshStandardMaterial?w:I).get(E.envMap||$.environment),$.envMapRotation=$.environment!==null&&E.envMap===null?k.environmentRotation:E.envMapRotation,qe===void 0&&(E.addEventListener("dispose",He),qe=new Map,$.programs=qe);let Ve=qe.get(ye);if(Ve!==void 0){if($.currentProgram===Ve&&$.lightsStateVersion===Te)return ba(E,Ce),Ve}else Ce.uniforms=oe.getUniforms(E),E.onBeforeCompile(Ce,y),Ve=oe.acquireProgram(Ce,ye),qe.set(ye,Ve),$.uniforms=Ce.uniforms;let Be=$.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Be.clippingPlanes=Xe.uniform),ba(E,Ce),$.needsLights=wl(E),$.lightsStateVersion=Te,$.needsLights&&(Be.ambientLightColor.value=G.state.ambient,Be.lightProbe.value=G.state.probe,Be.directionalLights.value=G.state.directional,Be.directionalLightShadows.value=G.state.directionalShadow,Be.spotLights.value=G.state.spot,Be.spotLightShadows.value=G.state.spotShadow,Be.rectAreaLights.value=G.state.rectArea,Be.ltc_1.value=G.state.rectAreaLTC1,Be.ltc_2.value=G.state.rectAreaLTC2,Be.pointLights.value=G.state.point,Be.pointLightShadows.value=G.state.pointShadow,Be.hemisphereLights.value=G.state.hemi,Be.directionalShadowMap.value=G.state.directionalShadowMap,Be.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Be.spotShadowMap.value=G.state.spotShadowMap,Be.spotLightMatrix.value=G.state.spotLightMatrix,Be.spotLightMap.value=G.state.spotLightMap,Be.pointShadowMap.value=G.state.pointShadowMap,Be.pointShadowMatrix.value=G.state.pointShadowMatrix),$.currentProgram=Ve,$.uniformsList=null,Ve}function Sa(E){if(E.uniformsList===null){let k=E.currentProgram.getUniforms();E.uniformsList=cr.seqWithValue(k.seq,E.uniforms)}return E.uniformsList}function ba(E,k){let Y=Je.get(E);Y.outputColorSpace=k.outputColorSpace,Y.batching=k.batching,Y.batchingColor=k.batchingColor,Y.instancing=k.instancing,Y.instancingColor=k.instancingColor,Y.instancingMorph=k.instancingMorph,Y.skinning=k.skinning,Y.morphTargets=k.morphTargets,Y.morphNormals=k.morphNormals,Y.morphColors=k.morphColors,Y.morphTargetsCount=k.morphTargetsCount,Y.numClippingPlanes=k.numClippingPlanes,Y.numIntersection=k.numClipIntersection,Y.vertexAlphas=k.vertexAlphas,Y.vertexTangents=k.vertexTangents,Y.toneMapping=k.toneMapping}function Sl(E,k,Y,$,G){k.isScene!==!0&&(k=rt),je.resetTextureUnits();let fe=k.fog,Te=$.isMeshStandardMaterial?k.environment:null,Ce=C===null?y.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:en,ye=($.isMeshStandardMaterial?w:I).get($.envMap||Te),qe=$.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Ve=!!Y.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Be=!!Y.morphAttributes.position,ut=!!Y.morphAttributes.normal,Ut=!!Y.morphAttributes.color,Nt=zi;$.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Nt=y.toneMapping);let fn=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,yt=fn!==void 0?fn.length:0,Ue=Je.get($),nn=m.state.lights;if(ie===!0&&(ue===!0||E!==b)){let Mn=E===b&&$.id===P;Xe.setState($,E,Mn)}let xt=!1;$.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==nn.state.version||Ue.outputColorSpace!==Ce||G.isBatchedMesh&&Ue.batching===!1||!G.isBatchedMesh&&Ue.batching===!0||G.isBatchedMesh&&Ue.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Ue.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Ue.instancing===!1||!G.isInstancedMesh&&Ue.instancing===!0||G.isSkinnedMesh&&Ue.skinning===!1||!G.isSkinnedMesh&&Ue.skinning===!0||G.isInstancedMesh&&Ue.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Ue.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Ue.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Ue.instancingMorph===!1&&G.morphTexture!==null||Ue.envMap!==ye||$.fog===!0&&Ue.fog!==fe||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==Xe.numPlanes||Ue.numIntersection!==Xe.numIntersection)||Ue.vertexAlphas!==qe||Ue.vertexTangents!==Ve||Ue.morphTargets!==Be||Ue.morphNormals!==ut||Ue.morphColors!==Ut||Ue.toneMapping!==Nt||Ue.morphTargetsCount!==yt)&&(xt=!0):(xt=!0,Ue.__version=$.version);let pn=Ue.currentProgram;xt===!0&&(pn=ns($,k,G));let fi=!1,mn=!1,Rs=!1,zt=pn.getUniforms(),Jn=Ue.uniforms;if(De.useProgram(pn.program)&&(fi=!0,mn=!0,Rs=!0),$.id!==P&&(P=$.id,mn=!0),fi||b!==E){zt.setValue(U,"projectionMatrix",E.projectionMatrix),zt.setValue(U,"viewMatrix",E.matrixWorldInverse);let Mn=zt.map.cameraPosition;Mn!==void 0&&Mn.setValue(U,be.setFromMatrixPosition(E.matrixWorld)),pt.logarithmicDepthBuffer&&zt.setValue(U,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&zt.setValue(U,"isOrthographic",E.isOrthographicCamera===!0),b!==E&&(b=E,mn=!0,Rs=!0)}if(G.isSkinnedMesh){zt.setOptional(U,G,"bindMatrix"),zt.setOptional(U,G,"bindMatrixInverse");let Mn=G.skeleton;Mn&&(Mn.boneTexture===null&&Mn.computeBoneTexture(),zt.setValue(U,"boneTexture",Mn.boneTexture,je))}G.isBatchedMesh&&(zt.setOptional(U,G,"batchingTexture"),zt.setValue(U,"batchingTexture",G._matricesTexture,je),zt.setOptional(U,G,"batchingIdTexture"),zt.setValue(U,"batchingIdTexture",G._indirectTexture,je),zt.setOptional(U,G,"batchingColorTexture"),G._colorsTexture!==null&&zt.setValue(U,"batchingColorTexture",G._colorsTexture,je));let Cs=Y.morphAttributes;if((Cs.position!==void 0||Cs.normal!==void 0||Cs.color!==void 0)&&at.update(G,Y,pn),(mn||Ue.receiveShadow!==G.receiveShadow)&&(Ue.receiveShadow=G.receiveShadow,zt.setValue(U,"receiveShadow",G.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(Jn.envMap.value=ye,Jn.flipEnvMap.value=ye.isCubeTexture&&ye.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&k.environment!==null&&(Jn.envMapIntensity.value=k.environmentIntensity),mn&&(zt.setValue(U,"toneMappingExposure",y.toneMappingExposure),Ue.needsLights&&bl(Jn,Rs),fe&&$.fog===!0&&Fe.refreshFogUniforms(Jn,fe),Fe.refreshMaterialUniforms(Jn,$,se,V,m.state.transmissionRenderTarget[E.id]),cr.upload(U,Sa(Ue),Jn,je)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(cr.upload(U,Sa(Ue),Jn,je),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&zt.setValue(U,"center",G.center),zt.setValue(U,"modelViewMatrix",G.modelViewMatrix),zt.setValue(U,"normalMatrix",G.normalMatrix),zt.setValue(U,"modelMatrix",G.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){let Mn=$.uniformsGroups;for(let Ps=0,is=Mn.length;Ps<is;Ps++){let Cr=Mn[Ps];Ft.update(Cr,pn),Ft.bind(Cr,pn)}}return pn}function bl(E,k){E.ambientLightColor.needsUpdate=k,E.lightProbe.needsUpdate=k,E.directionalLights.needsUpdate=k,E.directionalLightShadows.needsUpdate=k,E.pointLights.needsUpdate=k,E.pointLightShadows.needsUpdate=k,E.spotLights.needsUpdate=k,E.spotLightShadows.needsUpdate=k,E.rectAreaLights.needsUpdate=k,E.hemisphereLights.needsUpdate=k}function wl(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(E,k,Y){Je.get(E.texture).__webglTexture=k,Je.get(E.depthTexture).__webglTexture=Y;let $=Je.get(E);$.__hasExternalTextures=!0,$.__autoAllocateDepthBuffer=Y===void 0,$.__autoAllocateDepthBuffer||Mt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,k){let Y=Je.get(E);Y.__webglFramebuffer=k,Y.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(E,k=0,Y=0){C=E,F=k,A=Y;let $=!0,G=null,fe=!1,Te=!1;if(E){let ye=Je.get(E);ye.__useDefaultFramebuffer!==void 0?(De.bindFramebuffer(U.FRAMEBUFFER,null),$=!1):ye.__webglFramebuffer===void 0?je.setupRenderTarget(E):ye.__hasExternalTextures&&je.rebindTextures(E,Je.get(E.texture).__webglTexture,Je.get(E.depthTexture).__webglTexture);let qe=E.texture;(qe.isData3DTexture||qe.isDataArrayTexture||qe.isCompressedArrayTexture)&&(Te=!0);let Ve=Je.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ve[k])?G=Ve[k][Y]:G=Ve[k],fe=!0):E.samples>0&&je.useMultisampledRTT(E)===!1?G=Je.get(E).__webglMultisampledFramebuffer:Array.isArray(Ve)?G=Ve[Y]:G=Ve,x.copy(E.viewport),L.copy(E.scissor),H=E.scissorTest}else x.copy(Me).multiplyScalar(se).floor(),L.copy(Pe).multiplyScalar(se).floor(),H=ze;if(De.bindFramebuffer(U.FRAMEBUFFER,G)&&$&&De.drawBuffers(E,G),De.viewport(x),De.scissor(L),De.setScissorTest(H),fe){let ye=Je.get(E.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+k,ye.__webglTexture,Y)}else if(Te){let ye=Je.get(E.texture),qe=k||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,ye.__webglTexture,Y||0,qe)}P=-1},this.readRenderTargetPixels=function(E,k,Y,$,G,fe,Te){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=Je.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Te!==void 0&&(Ce=Ce[Te]),Ce){De.bindFramebuffer(U.FRAMEBUFFER,Ce);try{let ye=E.texture,qe=ye.format,Ve=ye.type;if(!pt.textureFormatReadable(qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!pt.textureTypeReadable(Ve)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=E.width-$&&Y>=0&&Y<=E.height-G&&U.readPixels(k,Y,$,G,$e.convert(qe),$e.convert(Ve),fe)}finally{let ye=C!==null?Je.get(C).__webglFramebuffer:null;De.bindFramebuffer(U.FRAMEBUFFER,ye)}}},this.readRenderTargetPixelsAsync=async function(E,k,Y,$,G,fe,Te){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=Je.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Te!==void 0&&(Ce=Ce[Te]),Ce){De.bindFramebuffer(U.FRAMEBUFFER,Ce);try{let ye=E.texture,qe=ye.format,Ve=ye.type;if(!pt.textureFormatReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!pt.textureTypeReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=E.width-$&&Y>=0&&Y<=E.height-G){let Be=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Be),U.bufferData(U.PIXEL_PACK_BUFFER,fe.byteLength,U.STREAM_READ),U.readPixels(k,Y,$,G,$e.convert(qe),$e.convert(Ve),0),U.flush();let ut=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);await Im(U,ut,4);try{U.bindBuffer(U.PIXEL_PACK_BUFFER,Be),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,fe)}finally{U.deleteBuffer(Be),U.deleteSync(ut)}return fe}}finally{let ye=C!==null?Je.get(C).__webglFramebuffer:null;De.bindFramebuffer(U.FRAMEBUFFER,ye)}}},this.copyFramebufferToTexture=function(E,k=null,Y=0){E.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,E=arguments[1]);let $=Math.pow(2,-Y),G=Math.floor(E.image.width*$),fe=Math.floor(E.image.height*$),Te=k!==null?k.x:0,Ce=k!==null?k.y:0;je.setTexture2D(E,0),U.copyTexSubImage2D(U.TEXTURE_2D,Y,0,0,Te,Ce,G,fe),De.unbindTexture()},this.copyTextureToTexture=function(E,k,Y=null,$=null,G=0){E.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),$=arguments[0]||null,E=arguments[1],k=arguments[2],G=arguments[3]||0,Y=null);let fe,Te,Ce,ye,qe,Ve;Y!==null?(fe=Y.max.x-Y.min.x,Te=Y.max.y-Y.min.y,Ce=Y.min.x,ye=Y.min.y):(fe=E.image.width,Te=E.image.height,Ce=0,ye=0),$!==null?(qe=$.x,Ve=$.y):(qe=0,Ve=0);let Be=$e.convert(k.format),ut=$e.convert(k.type);je.setTexture2D(k,0),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,k.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,k.unpackAlignment);let Ut=U.getParameter(U.UNPACK_ROW_LENGTH),Nt=U.getParameter(U.UNPACK_IMAGE_HEIGHT),fn=U.getParameter(U.UNPACK_SKIP_PIXELS),yt=U.getParameter(U.UNPACK_SKIP_ROWS),Ue=U.getParameter(U.UNPACK_SKIP_IMAGES),nn=E.isCompressedTexture?E.mipmaps[G]:E.image;U.pixelStorei(U.UNPACK_ROW_LENGTH,nn.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,nn.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Ce),U.pixelStorei(U.UNPACK_SKIP_ROWS,ye),E.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,G,qe,Ve,fe,Te,Be,ut,nn.data):E.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,G,qe,Ve,nn.width,nn.height,Be,nn.data):U.texSubImage2D(U.TEXTURE_2D,G,qe,Ve,fe,Te,Be,ut,nn),U.pixelStorei(U.UNPACK_ROW_LENGTH,Ut),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Nt),U.pixelStorei(U.UNPACK_SKIP_PIXELS,fn),U.pixelStorei(U.UNPACK_SKIP_ROWS,yt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ue),G===0&&k.generateMipmaps&&U.generateMipmap(U.TEXTURE_2D),De.unbindTexture()},this.copyTextureToTexture3D=function(E,k,Y=null,$=null,G=0){E.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Y=arguments[0]||null,$=arguments[1]||null,E=arguments[2],k=arguments[3],G=arguments[4]||0);let fe,Te,Ce,ye,qe,Ve,Be,ut,Ut,Nt=E.isCompressedTexture?E.mipmaps[G]:E.image;Y!==null?(fe=Y.max.x-Y.min.x,Te=Y.max.y-Y.min.y,Ce=Y.max.z-Y.min.z,ye=Y.min.x,qe=Y.min.y,Ve=Y.min.z):(fe=Nt.width,Te=Nt.height,Ce=Nt.depth,ye=0,qe=0,Ve=0),$!==null?(Be=$.x,ut=$.y,Ut=$.z):(Be=0,ut=0,Ut=0);let fn=$e.convert(k.format),yt=$e.convert(k.type),Ue;if(k.isData3DTexture)je.setTexture3D(k,0),Ue=U.TEXTURE_3D;else if(k.isDataArrayTexture||k.isCompressedArrayTexture)je.setTexture2DArray(k,0),Ue=U.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,k.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,k.unpackAlignment);let nn=U.getParameter(U.UNPACK_ROW_LENGTH),xt=U.getParameter(U.UNPACK_IMAGE_HEIGHT),pn=U.getParameter(U.UNPACK_SKIP_PIXELS),fi=U.getParameter(U.UNPACK_SKIP_ROWS),mn=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,Nt.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Nt.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,ye),U.pixelStorei(U.UNPACK_SKIP_ROWS,qe),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ve),E.isDataTexture||E.isData3DTexture?U.texSubImage3D(Ue,G,Be,ut,Ut,fe,Te,Ce,fn,yt,Nt.data):k.isCompressedArrayTexture?U.compressedTexSubImage3D(Ue,G,Be,ut,Ut,fe,Te,Ce,fn,Nt.data):U.texSubImage3D(Ue,G,Be,ut,Ut,fe,Te,Ce,fn,yt,Nt),U.pixelStorei(U.UNPACK_ROW_LENGTH,nn),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,xt),U.pixelStorei(U.UNPACK_SKIP_PIXELS,pn),U.pixelStorei(U.UNPACK_SKIP_ROWS,fi),U.pixelStorei(U.UNPACK_SKIP_IMAGES,mn),G===0&&k.generateMipmaps&&U.generateMipmap(Ue),De.unbindTexture()},this.initRenderTarget=function(E){Je.get(E).__webglFramebuffer===void 0&&je.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?je.setTextureCube(E,0):E.isData3DTexture?je.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?je.setTexture2DArray(E,0):je.setTexture2D(E,0),De.unbindTexture()},this.resetState=function(){F=0,A=0,C=null,De.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===Bh?"display-p3":"srgb",t.unpackColorSpace=gt.workingColorSpace===ol?"display-p3":"srgb"}},Lo=class s{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ne(e),this.density=t}clone(){return new s(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Do=class extends kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Xn,this.environmentIntensity=1,this.environmentRotation=new Xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},xr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Hc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Hn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return zh("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Hn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Hn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},bn=new T,ys=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.applyMatrix4(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.applyNormalMatrix(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.transformDirection(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=ni(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=bt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ni(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ni(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ni(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ni(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),i=bt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),i=bt(i,this.array),r=bt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new rn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},vr=class extends Pn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Js,Nr=new T,Qs=new T,js=new T,er=new he,Or=new he,zf=new Qe,Za=new T,Fr=new T,Ja=new T,Hd=new he,nc=new he,Vd=new he,ta=class extends kt{constructor(e=new vr){if(super(),this.isSprite=!0,this.type="Sprite",Js===void 0){Js=new Ot;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new xr(t,5);Js.setIndex([0,1,2,0,2,3]),Js.setAttribute("position",new ys(n,3,0,!1)),Js.setAttribute("uv",new ys(n,2,3,!1))}this.geometry=Js,this.material=e,this.center=new he(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Qs.setFromMatrixScale(this.matrixWorld),zf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),js.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Qs.multiplyScalar(-js.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let a=this.center;Qa(Za.set(-.5,-.5,0),js,a,Qs,i,r),Qa(Fr.set(.5,-.5,0),js,a,Qs,i,r),Qa(Ja.set(.5,.5,0),js,a,Qs,i,r),Hd.set(0,0),nc.set(1,0),Vd.set(1,1);let o=e.ray.intersectTriangle(Za,Fr,Ja,!1,Nr);if(o===null&&(Qa(Fr.set(-.5,.5,0),js,a,Qs,i,r),nc.set(0,1),o=e.ray.intersectTriangle(Za,Ja,Fr,!1,Nr),o===null))return;let l=e.ray.origin.distanceTo(Nr);l<e.near||l>e.far||t.push({distance:l,point:Nr.clone(),uv:Bi.getInterpolation(Nr,Za,Fr,Ja,Hd,nc,Vd,new he),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Qa(s,e,t,n,i,r){er.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(Or.x=r*er.x-i*er.y,Or.y=i*er.x+r*er.y):Or.copy(er),s.copy(e),s.x+=Or.x,s.y+=Or.y,s.applyMatrix4(zf)}var Gd=new T,Wd=new Et,Xd=new Et,Tx=new T,qd=new Qe,ja=new T,ic=new On,Yd=new Qe,sc=new _s,Uo=class extends Xt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=qu,this.bindMatrix=new Qe,this.bindMatrixInverse=new Qe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Wn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ja),this.boundingBox.expandByPoint(ja)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new On),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ja),this.boundingSphere.expandByPoint(ja)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ic.copy(this.boundingSphere),ic.applyMatrix4(i),e.ray.intersectsSphere(ic)!==!1&&(Yd.copy(i).invert(),sc.copy(e.ray).applyMatrix4(Yd),!(this.boundingBox!==null&&sc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,sc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Et,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===qu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===nm?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Wd.fromBufferAttribute(i.attributes.skinIndex,e),Xd.fromBufferAttribute(i.attributes.skinWeight,e),Gd.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let a=Xd.getComponent(r);if(a!==0){let o=Wd.getComponent(r);qd.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Tx.copy(Gd).applyMatrix4(qd),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},na=class extends kt{constructor(){super(),this.isBone=!0,this.type="Bone"}},ia=class extends un{constructor(e=null,t=1,n=1,i,r,a,o,l,c=xn,h=xn,u,d){super(null,a,o,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},$d=new Qe,Ax=new Qe,No=class s{constructor(e=[],t=[]){this.uuid=Hn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Qe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Qe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:Ax;$d.multiplyMatrices(o,t[r]),$d.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new ia(t,e,e,zn,En);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new na),this.bones.push(a),this.boneInverses.push(new Qe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},xs=class extends rn{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},tr=new Qe,Kd=new Qe,eo=[],Zd=new Wn,Rx=new Qe,Br=new Xt,kr=new On,vs=class extends Xt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new xs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Rx)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Wn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,tr),Zd.copy(e.boundingBox).applyMatrix4(tr),this.boundingBox.union(Zd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new On),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,tr),kr.copy(e.boundingSphere).applyMatrix4(tr),this.boundingSphere.union(kr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Br.geometry=this.geometry,Br.material=this.material,Br.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),kr.copy(this.boundingSphere),kr.applyMatrix4(n),e.ray.intersectsSphere(kr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,tr),Kd.multiplyMatrices(n,tr),Br.matrixWorld=Kd,Br.raycast(e,eo);for(let a=0,o=eo.length;a<o;a++){let l=eo[a];l.instanceId=r,l.object=this,t.push(l)}eo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new xs(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new ia(new Float32Array(i*this.count),i,this.count,Uh,En));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var Gi=class extends Pn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ne(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Oo=new T,Fo=new T,Jd=new Qe,zr=new _s,to=new On,rc=new T,Qd=new T,Wi=class extends kt{constructor(e=new Ot,t=new Gi){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Oo.fromBufferAttribute(t,i-1),Fo.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Oo.distanceTo(Fo);e.setAttribute("lineDistance",new dt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),to.copy(n.boundingSphere),to.applyMatrix4(i),to.radius+=r,e.ray.intersectsSphere(to)===!1)return;Jd.copy(i).invert(),zr.copy(e.ray).applyMatrix4(Jd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=c){let p=h.getX(_),M=h.getX(_+1),y=no(this,e,zr,l,p,M);y&&t.push(y)}if(this.isLineLoop){let _=h.getX(g-1),m=h.getX(f),p=no(this,e,zr,l,_,m);p&&t.push(p)}}else{let f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=c){let p=no(this,e,zr,l,_,_+1);p&&t.push(p)}if(this.isLineLoop){let _=no(this,e,zr,l,g-1,f);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function no(s,e,t,n,i,r){let a=s.geometry.attributes.position;if(Oo.fromBufferAttribute(a,i),Fo.fromBufferAttribute(a,r),t.distanceSqToSegment(Oo,Fo,rc,Qd)>n)return;rc.applyMatrix4(s.matrixWorld);let l=e.ray.origin.distanceTo(rc);if(!(l<e.near||l>e.far))return{distance:l,point:Qd.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,object:s}}var jd=new T,ef=new T,Mr=class extends Wi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)jd.fromBufferAttribute(t,i),ef.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+jd.distanceTo(ef);e.setAttribute("lineDistance",new dt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Bo=class extends Wi{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},sa=class extends Pn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},tf=new Qe,sh=new _s,io=new On,so=new T,ko=class extends kt{constructor(e=new Ot,t=new sa){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),io.copy(n.boundingSphere),io.applyMatrix4(i),io.radius+=r,e.ray.intersectsSphere(io)===!1)return;tf.copy(i).invert(),sh.copy(e.ray).applyMatrix4(tf);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=d,_=f;g<_;g++){let m=c.getX(g);so.fromBufferAttribute(u,m),nf(so,m,l,i,e,t,this)}}else{let d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,_=f;g<_;g++)so.fromBufferAttribute(u,g),nf(so,g,l,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function nf(s,e,t,n,i,r,a){let o=sh.distanceSqToPoint(s);if(o<t){let l=new T;sh.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}var ra=class extends un{constructor(e,t,n,i,r,a,o,l,c){super(e,t,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},qn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),i=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);let h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let a=this.getPoint(i),o=this.getPoint(r),l=t||(a.isVector2?new he:new T);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new T,i=[],r=[],a=[],o=new T,l=new Qe;for(let f=0;f<=e;f++){let g=f/e;i[f]=this.getTangentAt(g,new T)}r[0]=new T,a[0]=new T;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Jt(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(Jt(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},aa=class extends qn{constructor(e=0,t=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new he){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},rh=class extends aa{constructor(e,t,n,i,r,a){super(e,t,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Vh(){let s=0,e=0,t=0,n=0;function i(r,a,o,l){s=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(r){let a=r*r,o=a*r;return s+e*r+t*a+n*o}}}var ro=new T,ac=new Vh,oc=new Vh,lc=new Vh,oa=class extends qn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new T){let n=t,i=this.points,r=i.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(ro.subVectors(i[0],i[1]).add(i[0]),c=ro);let u=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(ro.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=ro),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),ac.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,_,m),oc.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,_,m),lc.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(ac.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),oc.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),lc.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(ac.calc(l),oc.calc(l),lc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new T().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function sf(s,e,t,n,i){let r=(n-e)*.5,a=(i-t)*.5,o=s*s,l=s*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*s+t}function Cx(s,e){let t=1-s;return t*t*e}function Px(s,e){return 2*(1-s)*s*e}function Ix(s,e){return s*s*e}function qr(s,e,t,n){return Cx(s,e)+Px(s,t)+Ix(s,n)}function Lx(s,e){let t=1-s;return t*t*t*e}function Dx(s,e){let t=1-s;return 3*t*t*s*e}function Ux(s,e){return 3*(1-s)*s*s*e}function Nx(s,e){return s*s*s*e}function Yr(s,e,t,n,i){return Lx(s,e)+Dx(s,t)+Ux(s,n)+Nx(s,i)}var zo=class extends qn{constructor(e=new he,t=new he,n=new he,i=new he){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new he){let n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Yr(e,i.x,r.x,a.x,o.x),Yr(e,i.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ah=class extends qn{constructor(e=new T,t=new T,n=new T,i=new T){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new T){let n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Yr(e,i.x,r.x,a.x,o.x),Yr(e,i.y,r.y,a.y,o.y),Yr(e,i.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ho=class extends qn{constructor(e=new he,t=new he){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new he){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new he){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},oh=class extends qn{constructor(e=new T,t=new T){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new T){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new T){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Vo=class extends qn{constructor(e=new he,t=new he,n=new he){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new he){let n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(qr(e,i.x,r.x,a.x),qr(e,i.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},lh=class extends qn{constructor(e=new T,t=new T,n=new T){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new T){let n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(qr(e,i.x,r.x,a.x),qr(e,i.y,r.y,a.y),qr(e,i.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Go=class extends qn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new he){let n=t,i=this.points,r=(i.length-1)*e,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(sf(o,l.x,c.x,h.x,u.x),sf(o,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new he().fromArray(i))}return this}},rf=Object.freeze({__proto__:null,ArcCurve:rh,CatmullRomCurve3:oa,CubicBezierCurve:zo,CubicBezierCurve3:ah,EllipseCurve:aa,LineCurve:Ho,LineCurve3:oh,QuadraticBezierCurve:Vo,QuadraticBezierCurve3:lh,SplineCurve:Go}),ch=class extends qn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new rf[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let a=r[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new rf[i.type]().fromJSON(i))}return this}},Wo=class extends ch{constructor(e){super(),this.type="Path",this.currentPoint=new he,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Ho(this.currentPoint.clone(),new he(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let r=new Vo(this.currentPoint.clone(),new he(e,t),new he(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,a){let o=new zo(this.currentPoint.clone(),new he(e,t),new he(n,i),new he(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Go(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,r,a),this}absarc(e,t,n,i,r,a){return this.absellipse(e,t,n,n,i,r,a),this}ellipse(e,t,n,i,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,a,o,l),this}absellipse(e,t,n,i,r,a,o,l){let c=new aa(e,t,n,i,r,a,o,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}};var Ms=class s extends Ot{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],a=[],o=[],l=[],c=new T,h=new he;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=n+u/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new dt(a,3)),this.setAttribute("normal",new dt(o,3)),this.setAttribute("uv",new dt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},At=class s extends Ot{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],d=[],f=[],g=0,_=[],m=n/2,p=0;M(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new dt(u,3)),this.setAttribute("normal",new dt(d,3)),this.setAttribute("uv",new dt(f,2));function M(){let S=new T,F=new T,A=0,C=(t-e)/n;for(let P=0;P<=r;P++){let b=[],x=P/r,L=x*(t-e)+e;for(let H=0;H<=i;H++){let z=H/i,B=z*l+o,te=Math.sin(B),V=Math.cos(B);F.x=L*te,F.y=-x*n+m,F.z=L*V,u.push(F.x,F.y,F.z),S.set(te,C,V).normalize(),d.push(S.x,S.y,S.z),f.push(z,1-x),b.push(g++)}_.push(b)}for(let P=0;P<i;P++)for(let b=0;b<r;b++){let x=_[b][P],L=_[b+1][P],H=_[b+1][P+1],z=_[b][P+1];h.push(x,L,z),h.push(L,H,z),A+=6}c.addGroup(p,A,0),p+=A}function y(S){let F=g,A=new he,C=new T,P=0,b=S===!0?e:t,x=S===!0?1:-1;for(let H=1;H<=i;H++)u.push(0,m*x,0),d.push(0,x,0),f.push(.5,.5),g++;let L=g;for(let H=0;H<=i;H++){let B=H/i*l+o,te=Math.cos(B),V=Math.sin(B);C.x=b*V,C.y=m*x,C.z=b*te,u.push(C.x,C.y,C.z),d.push(0,x,0),A.x=te*.5+.5,A.y=V*.5*x+.5,f.push(A.x,A.y),g++}for(let H=0;H<i;H++){let z=F+H,B=L+H;S===!0?h.push(B,B+1,z):h.push(B+1,B,z),P+=3}c.addGroup(p,P,S===!0?1:2),p+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var hh=class s extends Ot{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let r=[],a=[];o(i),c(n),h(),this.setAttribute("position",new dt(r,3)),this.setAttribute("normal",new dt(r.slice(),3)),this.setAttribute("uv",new dt(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(M){let y=new T,S=new T,F=new T;for(let A=0;A<t.length;A+=3)f(t[A+0],y),f(t[A+1],S),f(t[A+2],F),l(y,S,F,M)}function l(M,y,S,F){let A=F+1,C=[];for(let P=0;P<=A;P++){C[P]=[];let b=M.clone().lerp(S,P/A),x=y.clone().lerp(S,P/A),L=A-P;for(let H=0;H<=L;H++)H===0&&P===A?C[P][H]=b:C[P][H]=b.clone().lerp(x,H/L)}for(let P=0;P<A;P++)for(let b=0;b<2*(A-P)-1;b++){let x=Math.floor(b/2);b%2===0?(d(C[P][x+1]),d(C[P+1][x]),d(C[P][x])):(d(C[P][x+1]),d(C[P+1][x+1]),d(C[P+1][x]))}}function c(M){let y=new T;for(let S=0;S<r.length;S+=3)y.x=r[S+0],y.y=r[S+1],y.z=r[S+2],y.normalize().multiplyScalar(M),r[S+0]=y.x,r[S+1]=y.y,r[S+2]=y.z}function h(){let M=new T;for(let y=0;y<r.length;y+=3){M.x=r[y+0],M.y=r[y+1],M.z=r[y+2];let S=m(M)/2/Math.PI+.5,F=p(M)/Math.PI+.5;a.push(S,1-F)}g(),u()}function u(){for(let M=0;M<a.length;M+=6){let y=a[M+0],S=a[M+2],F=a[M+4],A=Math.max(y,S,F),C=Math.min(y,S,F);A>.9&&C<.1&&(y<.2&&(a[M+0]+=1),S<.2&&(a[M+2]+=1),F<.2&&(a[M+4]+=1))}}function d(M){r.push(M.x,M.y,M.z)}function f(M,y){let S=M*3;y.x=e[S+0],y.y=e[S+1],y.z=e[S+2]}function g(){let M=new T,y=new T,S=new T,F=new T,A=new he,C=new he,P=new he;for(let b=0,x=0;b<r.length;b+=9,x+=6){M.set(r[b+0],r[b+1],r[b+2]),y.set(r[b+3],r[b+4],r[b+5]),S.set(r[b+6],r[b+7],r[b+8]),A.set(a[x+0],a[x+1]),C.set(a[x+2],a[x+3]),P.set(a[x+4],a[x+5]),F.copy(M).add(y).add(S).divideScalar(3);let L=m(F);_(A,x+0,M,L),_(C,x+2,y,L),_(P,x+4,S,L)}}function _(M,y,S,F){F<0&&M.x===1&&(a[y]=M.x-1),S.x===0&&S.z===0&&(a[y]=F/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.vertices,e.indices,e.radius,e.details)}};var ao=new T,oo=new T,cc=new T,lo=new Bi,Xo=class extends Ot{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),r=Math.cos(or*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let g=0;g<l;g+=3){a?(c[0]=a.getX(g),c[1]=a.getX(g+1),c[2]=a.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:_,b:m,c:p}=lo;if(_.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),lo.getNormal(cc),u[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,u[1]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,u[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let M=0;M<3;M++){let y=(M+1)%3,S=u[M],F=u[y],A=lo[h[M]],C=lo[h[y]],P=`${S}_${F}`,b=`${F}_${S}`;b in d&&d[b]?(cc.dot(d[b].normal)<=r&&(f.push(A.x,A.y,A.z),f.push(C.x,C.y,C.z)),d[b]=null):P in d||(d[P]={index0:c[M],index1:c[y],normal:cc.clone()})}}for(let g in d)if(d[g]){let{index0:_,index1:m}=d[g];ao.fromBufferAttribute(o,_),oo.fromBufferAttribute(o,m),f.push(ao.x,ao.y,ao.z),f.push(oo.x,oo.y,oo.z)}this.setAttribute("position",new dt(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},la=class extends Wo{constructor(e){super(e),this.uuid=Hn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new Wo().fromJSON(i))}return this}},Ox={triangulate:function(s,e,t=2){let n=e&&e.length,i=n?e[0]*t:s.length,r=Hf(s,0,i,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c,h,u,d,f;if(n&&(r=Hx(s,e,r,t)),s.length>80*t){o=c=s[0],l=h=s[1];for(let g=t;g<i;g+=t)u=s[g],d=s[g+1],u<o&&(o=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-o,h-l),f=f!==0?32767/f:0}return ca(r,a,t,o,l,f,0),a}};function Hf(s,e,t,n,i){let r,a;if(i===Qx(s,e,t,n)>0)for(r=e;r<t;r+=n)a=af(r,s[r],s[r+1],a);else for(r=t-n;r>=e;r-=n)a=af(r,s[r],s[r+1],a);return a&&cl(a,a.next)&&(ua(a),a=a.next),a}function Ss(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(cl(t,t.next)||Vt(t.prev,t,t.next)===0)){if(ua(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function ca(s,e,t,n,i,r,a){if(!s)return;!a&&r&&qx(s,n,i,r);let o=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?Bx(s,n,i,r):Fx(s)){e.push(l.i/t|0),e.push(s.i/t|0),e.push(c.i/t|0),ua(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=kx(Ss(s),e,t),ca(s,e,t,n,i,r,2)):a===2&&zx(s,e,t,n,i,r):ca(Ss(s),e,t,n,i,r,1);break}}}function Fx(s){let e=s.prev,t=s,n=s.next;if(Vt(e,t,n)>=0)return!1;let i=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=i<r?i<a?i:a:r<a?r:a,u=o<l?o<c?o:c:l<c?l:c,d=i>r?i>a?i:a:r>a?r:a,f=o>l?o>c?o:c:l>c?l:c,g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&sr(i,o,r,l,a,c,g.x,g.y)&&Vt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Bx(s,e,t,n){let i=s.prev,r=s,a=s.next;if(Vt(i,r,a)>=0)return!1;let o=i.x,l=r.x,c=a.x,h=i.y,u=r.y,d=a.y,f=o<l?o<c?o:c:l<c?l:c,g=h<u?h<d?h:d:u<d?u:d,_=o>l?o>c?o:c:l>c?l:c,m=h>u?h>d?h:d:u>d?u:d,p=uh(f,g,e,t,n),M=uh(_,m,e,t,n),y=s.prevZ,S=s.nextZ;for(;y&&y.z>=p&&S&&S.z<=M;){if(y.x>=f&&y.x<=_&&y.y>=g&&y.y<=m&&y!==i&&y!==a&&sr(o,h,l,u,c,d,y.x,y.y)&&Vt(y.prev,y,y.next)>=0||(y=y.prevZ,S.x>=f&&S.x<=_&&S.y>=g&&S.y<=m&&S!==i&&S!==a&&sr(o,h,l,u,c,d,S.x,S.y)&&Vt(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;y&&y.z>=p;){if(y.x>=f&&y.x<=_&&y.y>=g&&y.y<=m&&y!==i&&y!==a&&sr(o,h,l,u,c,d,y.x,y.y)&&Vt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;S&&S.z<=M;){if(S.x>=f&&S.x<=_&&S.y>=g&&S.y<=m&&S!==i&&S!==a&&sr(o,h,l,u,c,d,S.x,S.y)&&Vt(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function kx(s,e,t){let n=s;do{let i=n.prev,r=n.next.next;!cl(i,r)&&Vf(i,n,n.next,r)&&ha(i,r)&&ha(r,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),ua(n),ua(n.next),n=s=r),n=n.next}while(n!==s);return Ss(n)}function zx(s,e,t,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Kx(a,o)){let l=Gf(a,o);a=Ss(a,a.next),l=Ss(l,l.next),ca(a,e,t,n,i,r,0),ca(l,e,t,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function Hx(s,e,t,n){let i=[],r,a,o,l,c;for(r=0,a=e.length;r<a;r++)o=e[r]*n,l=r<a-1?e[r+1]*n:s.length,c=Hf(s,o,l,n,!1),c===c.next&&(c.steiner=!0),i.push($x(c));for(i.sort(Vx),r=0;r<i.length;r++)t=Gx(i[r],t);return t}function Vx(s,e){return s.x-e.x}function Gx(s,e){let t=Wx(s,e);if(!t)return e;let n=Gf(t,s);return Ss(n,n.next),Ss(t,t.next)}function Wx(s,e){let t=e,n=-1/0,i,r=s.x,a=s.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){let d=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=r&&d>n&&(n=d,i=t.x<t.next.x?t:t.next,d===r))return i}t=t.next}while(t!==e);if(!i)return null;let o=i,l=i.x,c=i.y,h=1/0,u;t=i;do r>=t.x&&t.x>=l&&r!==t.x&&sr(a<c?r:n,a,l,c,a<c?n:r,a,t.x,t.y)&&(u=Math.abs(a-t.y)/(r-t.x),ha(t,s)&&(u<h||u===h&&(t.x>i.x||t.x===i.x&&Xx(i,t)))&&(i=t,h=u)),t=t.next;while(t!==o);return i}function Xx(s,e){return Vt(s.prev,s,e.prev)<0&&Vt(e.next,s,s.next)<0}function qx(s,e,t,n){let i=s;do i.z===0&&(i.z=uh(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Yx(i)}function Yx(s){let e,t,n,i,r,a,o,l,c=1;do{for(t=s,s=null,r=null,a=0;t;){for(a++,n=t,o=0,e=0;e<c&&(o++,n=n.nextZ,!!n);e++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,o--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;t=n}r.nextZ=null,c*=2}while(a>1);return s}function uh(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function $x(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function sr(s,e,t,n,i,r,a,o){return(i-a)*(e-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(i-a)*(n-o)}function Kx(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!Zx(s,e)&&(ha(s,e)&&ha(e,s)&&Jx(s,e)&&(Vt(s.prev,s,e.prev)||Vt(s,e.prev,e))||cl(s,e)&&Vt(s.prev,s,s.next)>0&&Vt(e.prev,e,e.next)>0)}function Vt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function cl(s,e){return s.x===e.x&&s.y===e.y}function Vf(s,e,t,n){let i=ho(Vt(s,e,t)),r=ho(Vt(s,e,n)),a=ho(Vt(t,n,s)),o=ho(Vt(t,n,e));return!!(i!==r&&a!==o||i===0&&co(s,t,e)||r===0&&co(s,n,e)||a===0&&co(t,s,n)||o===0&&co(t,e,n))}function co(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function ho(s){return s>0?1:s<0?-1:0}function Zx(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&Vf(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function ha(s,e){return Vt(s.prev,s,s.next)<0?Vt(s,e,s.next)>=0&&Vt(s,s.prev,e)>=0:Vt(s,e,s.prev)<0||Vt(s,s.next,e)<0}function Jx(s,e){let t=s,n=!1,i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function Gf(s,e){let t=new dh(s.i,s.x,s.y),n=new dh(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function af(s,e,t,n){let i=new dh(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ua(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function dh(s,e,t){this.i=s,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Qx(s,e,t,n){let i=0;for(let r=e,a=t-n;r<t;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}var $r=class s{static area(e){let t=e.length,n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let n=[],i=[],r=[];of(e),lf(n,e);let a=e.length;t.forEach(of);for(let l=0;l<t.length;l++)i.push(a),a+=t[l].length,lf(n,t[l]);let o=Ox.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function of(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function lf(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}var qo=class s extends hh{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}};var Yo=class s extends Ot{constructor(e=.5,t=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);let o=[],l=[],c=[],h=[],u=e,d=(t-e)/i,f=new T,g=new he;for(let _=0;_<=i;_++){for(let m=0;m<=n;m++){let p=r+m/n*a;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let _=0;_<i;_++){let m=_*(n+1);for(let p=0;p<n;p++){let M=p+m,y=M,S=M+n+1,F=M+n+2,A=M+1;o.push(y,S,A),o.push(S,F,A)}}this.setIndex(o),this.setAttribute("position",new dt(l,3)),this.setAttribute("normal",new dt(c,3)),this.setAttribute("uv",new dt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},$o=class s extends Ot{constructor(e=new la([new he(0,.5),new he(-.5,-.5),new he(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],r=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new dt(i,3)),this.setAttribute("normal",new dt(r,3)),this.setAttribute("uv",new dt(a,2));function c(h){let u=i.length/3,d=h.extractPoints(t),f=d.shape,g=d.holes;$r.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=g.length;m<p;m++){let M=g[m];$r.isClockWise(M)===!0&&(g[m]=M.reverse())}let _=$r.triangulateShape(f,g);for(let m=0,p=g.length;m<p;m++){let M=g[m];f=f.concat(M)}for(let m=0,p=f.length;m<p;m++){let M=f[m];i.push(M.x,M.y,0),r.push(0,0,1),a.push(M.x,M.y)}for(let m=0,p=_.length;m<p;m++){let M=_[m],y=M[0]+u,S=M[1]+u,F=M[2]+u;n.push(y,S,F),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return jx(t,e)}static fromJSON(e,t){let n=[];for(let i=0,r=e.shapes.length;i<r;i++){let a=t[e.shapes[i]];n.push(a)}return new s(n,e.curveSegments)}};function jx(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){let i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}var bs=class s extends Ot{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new T,d=new T,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){let M=[],y=p/n,S=0;p===0&&a===0?S=.5/t:p===n&&l===Math.PI&&(S=-.5/t);for(let F=0;F<=t;F++){let A=F/t;u.x=-e*Math.cos(i+A*r)*Math.sin(a+y*o),u.y=e*Math.cos(a+y*o),u.z=e*Math.sin(i+A*r)*Math.sin(a+y*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(A+S,1-y),M.push(c++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<t;M++){let y=h[p][M+1],S=h[p][M],F=h[p+1][M],A=h[p+1][M+1];(p!==0||a>0)&&f.push(y,S,A),(p!==n-1||l<Math.PI)&&f.push(S,F,A)}this.setIndex(f),this.setAttribute("position",new dt(g,3)),this.setAttribute("normal",new dt(_,3)),this.setAttribute("uv",new dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Gt=class s extends Ot{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],l=[],c=[],h=new T,u=new T,d=new T;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){let _=g/i*r,m=f/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(_),u.y=(e+t*Math.cos(m))*Math.sin(_),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){let _=(i+1)*f+g-1,m=(i+1)*(f-1)+g-1,p=(i+1)*(f-1)+g,M=(i+1)*f+g;a.push(_,m,M),a.push(m,p,M)}this.setIndex(a),this.setAttribute("position",new dt(o,3)),this.setAttribute("normal",new dt(l,3)),this.setAttribute("uv",new dt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Ko=class extends an{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},si=class extends Pn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ne(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Cf,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},jt=class extends si{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new he(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Jt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ne(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ne(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ne(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};function uo(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function ev(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function tv(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function cf(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let l=0;l!==e;++l)i[a++]=s[o+l]}return i}function Wf(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}var Xi=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},fh=class extends Xi{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Yu,endingEnd:Yu}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,a=e+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case $u:r=e,o=2*t-n;break;case Ku:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case $u:a=e,l=2*n-t;break;case Ku:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,M=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,y=(-1-f)*m+(1.5+f)*_+.5*g,S=f*m-f*_;for(let F=0;F!==o;++F)r[F]=p*a[h+F]+M*a[c+F]+y*a[l+F]+S*a[u+F];return r}},ph=class extends Xi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}},mh=class extends Xi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Yn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=uo(t,this.TimeBufferType),this.values=uo(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:uo(e.times,Array),values:uo(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new mh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ph(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new fh(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case pr:t=this.InterpolantFactoryMethodDiscrete;break;case mr:t=this.InterpolantFactoryMethodLinear;break;case Il:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return pr;case this.InterpolantFactoryMethodLinear:return mr;case this.InterpolantFactoryMethodSmooth:return Il}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&ev(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Il,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(i)l=!0;else{let u=o*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){let _=t[u+g];if(_!==t[d+g]||_!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};Yn.prototype.TimeBufferType=Float32Array;Yn.prototype.ValueBufferType=Float32Array;Yn.prototype.DefaultInterpolation=mr;var qi=class extends Yn{constructor(e,t,n){super(e,t,n)}};qi.prototype.ValueTypeName="bool";qi.prototype.ValueBufferType=Array;qi.prototype.DefaultInterpolation=pr;qi.prototype.InterpolantFactoryMethodLinear=void 0;qi.prototype.InterpolantFactoryMethodSmooth=void 0;var Zo=class extends Yn{};Zo.prototype.ValueTypeName="color";var Ei=class extends Yn{};Ei.prototype.ValueTypeName="number";var gh=class extends Xi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t),c=e*o;for(let h=c+o;c!==h;c+=4)Cn.slerpFlat(r,0,a,c-o,a,c,l);return r}},Ti=class extends Yn{InterpolantFactoryMethodLinear(e){return new gh(this.times,this.values,this.getValueSize(),e)}};Ti.prototype.ValueTypeName="quaternion";Ti.prototype.InterpolantFactoryMethodSmooth=void 0;var Yi=class extends Yn{constructor(e,t,n){super(e,t,n)}};Yi.prototype.ValueTypeName="string";Yi.prototype.ValueBufferType=Array;Yi.prototype.DefaultInterpolation=pr;Yi.prototype.InterpolantFactoryMethodLinear=void 0;Yi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ai=class extends Yn{};Ai.prototype.ValueTypeName="vector";var Jo=class{constructor(e="",t=-1,n=[],i=im){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Hn(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(iv(n[a]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(Yn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let h=tv(l);l=cf(l,1,h),c=cf(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new Ei(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],h=c.name.match(r);if(h&&h.length>1){let u=h[1],d=i[u];d||(i[u]=d=[]),d.push(c)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,d,f,g,_){if(f.length!==0){let m=[],p=[];Wf(f,m,p,g),m.length!==0&&_.push(new u(d,m,p))}},i=[],r=e.name||"default",a=e.fps||30,o=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let u=0;u<c.length;u++){let d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let f={},g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(let _ in f){let m=[],p=[];for(let M=0;M!==d[g].morphTargets.length;++M){let y=d[g];m.push(y.time),p.push(y.morphTarget===_?1:0)}i.push(new Ei(".morphTargetInfluence["+_+"]",m,p))}l=f.length*a}else{let f=".bones["+t[u].name+"]";n(Ai,f+".position",d,"pos",i),n(Ti,f+".quaternion",d,"rot",i),n(Ai,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,l,i,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function nv(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ei;case"vector":case"vector2":case"vector3":case"vector4":return Ai;case"color":return Zo;case"quaternion":return Ti;case"bool":case"boolean":return qi;case"string":return Yi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function iv(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=nv(s.type);if(s.times===void 0){let t=[],n=[];Wf(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}var ki={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}},da=class{constructor(e,t,n){let i=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}},sv=new da,ui=class{constructor(e){this.manager=e!==void 0?e:sv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};ui.DEFAULT_MATERIAL_NAME="__DEFAULT";var xi={},_h=class extends Error{constructor(e,t){super(e),this.response=t}},Sr=class extends ui{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=ki.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(xi[e]!==void 0){xi[e].push({onLoad:t,onProgress:n,onError:i});return}xi[e]=[],xi[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=xi[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0,_=0,m=new ReadableStream({start(p){M();function M(){u.read().then(({done:y,value:S})=>{if(y)p.close();else{_+=S.byteLength;let F=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let A=0,C=h.length;A<C;A++){let P=h[A];P.onProgress&&P.onProgress(F)}p.enqueue(S),M()}},y=>{p.error(y)})}}});return new Response(m)}else throw new _h(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o===void 0)return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{ki.add(e,c);let h=xi[e];delete xi[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{let h=xi[e];if(h===void 0)throw this.manager.itemError(e),c;delete xi[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var yh=class extends ui{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=ki.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;let o=Qr("img");function l(){h(),ki.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){h(),i&&i(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}};var Qo=class extends ui{constructor(e){super(e)}load(e,t,n,i){let r=this,a=new ia,o=new Sr(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(r.withCredentials),o.load(e,function(l){let c;try{c=r.parse(l)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}c.image!==void 0?a.image=c.image:c.data!==void 0&&(a.image.width=c.width,a.image.height=c.height,a.image.data=c.data),a.wrapS=c.wrapS!==void 0?c.wrapS:Ct,a.wrapT=c.wrapT!==void 0?c.wrapT:Ct,a.magFilter=c.magFilter!==void 0?c.magFilter:Ht,a.minFilter=c.minFilter!==void 0?c.minFilter:Ht,a.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(a.colorSpace=c.colorSpace),c.flipY!==void 0&&(a.flipY=c.flipY),c.format!==void 0&&(a.format=c.format),c.type!==void 0&&(a.type=c.type),c.mipmaps!==void 0&&(a.mipmaps=c.mipmaps,a.minFilter=ii),c.mipmapCount===1&&(a.minFilter=Ht),c.generateMipmaps!==void 0&&(a.generateMipmaps=c.generateMipmaps),a.needsUpdate=!0,t&&t(a,c)},n,i),a}},br=class extends ui{constructor(e){super(e)}load(e,t,n,i){let r=new un,a=new yh(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},wr=class extends kt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ne(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},jo=class extends wr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ne(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},hc=new Qe,hf=new T,uf=new T,fa=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new he(512,512),this.map=null,this.mapPass=null,this.matrix=new Qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ea,this._frameExtents=new he(1,1),this._viewportCount=1,this._viewports=[new Et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;hf.setFromMatrixPosition(e.matrixWorld),t.position.copy(hf),uf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(uf),t.updateMatrixWorld(),hc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(hc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(hc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},xh=class extends fa{constructor(){super(new sn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=gr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},el=class extends wr{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new xh}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},df=new Qe,Hr=new T,uc=new T,vh=class extends fa{constructor(){super(new sn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new he(4,2),this._viewportCount=6,this._viewports=[new Et(2,1,1,1),new Et(0,1,1,1),new Et(3,1,1,1),new Et(1,1,1,1),new Et(3,0,1,1),new Et(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Hr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Hr),uc.copy(n.position),uc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(uc),n.updateMatrixWorld(),i.makeTranslation(-Hr.x,-Hr.y,-Hr.z),df.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(df)}},$i=class extends wr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new vh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Mh=class extends fa{constructor(){super(new Vi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ki=class extends wr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.shadow=new Mh}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Zi=class{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var tl=class extends ui{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=ki.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return ki.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),ki.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});ki.add(e,l),r.manager.itemStart(e)}};var nl=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=ff(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=ff();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function ff(){return(typeof performance>"u"?Date:performance).now()}var Gh="\\[\\]\\.:\\/",rv=new RegExp("["+Gh+"]","g"),Wh="[^"+Gh+"]",av="[^"+Gh.replace("\\.","")+"]",ov=/((?:WC+[\/:])*)/.source.replace("WC",Wh),lv=/(WCOD+)?/.source.replace("WCOD",av),cv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Wh),hv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Wh),uv=new RegExp("^"+ov+lv+cv+hv+"$"),dv=["material","materials","bones","map"],Sh=class{constructor(e,t,n){let i=n||Rt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Rt=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(rv,"")}static parseTrackName(e){let t=uv.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);dv.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[i];if(a===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Rt.Composite=Sh;Rt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Rt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Rt.prototype.GetterByBindingType=[Rt.prototype._getValue_direct,Rt.prototype._getValue_array,Rt.prototype._getValue_arrayElement,Rt.prototype._getValue_toArray];Rt.prototype.SetterByBindingTypeAndVersioning=[[Rt.prototype._setValue_direct,Rt.prototype._setValue_direct_setNeedsUpdate,Rt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_array,Rt.prototype._setValue_array_setNeedsUpdate,Rt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_arrayElement,Rt.prototype._setValue_arrayElement_setNeedsUpdate,Rt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_fromArray,Rt.prototype._setValue_fromArray_setNeedsUpdate,Rt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var $v=new Float32Array(1);var pf=new Qe,il=class{constructor(e,t,n=0,i=1/0){this.ray=new _s(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new jr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return pf.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(pf),this}intersectObject(e,t=!0,n=[]){return bh(e,this,n,t),n.sort(mf),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)bh(e[i],this,n,t);return n.sort(mf),n}};function mf(s,e){return s.distance-e.distance}function bh(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let a=0,o=r.length;a<o;a++)bh(r[a],e,t,!0)}}var sl=class{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Jt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"166"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="166");var _a=new T;function $n(s,e,t,n,i,r){let a=2*Math.PI*i/4,o=Math.max(r-2*i,0),l=Math.PI/4;_a.copy(e),_a[n]=0,_a.normalize();let c=.5*a/(a+o),h=1-_a.angleTo(s)/l;return Math.sign(_a[t])===1?h*c:o/(a+o)+c+c*(1-h)}var ya=class extends hi{constructor(e=1,t=1,n=1,i=2,r=.1){if(i=i*2+1,r=Math.min(e/2,t/2,n/2,r),super(1,1,1,i,i,i),i===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let o=new T,l=new T,c=new T(e,t,n).divideScalar(2).subScalar(r),h=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,f=h.length/6,g=new T,_=.5/i;for(let m=0,p=0;m<h.length;m+=3,p+=2)switch(o.fromArray(h,m),l.copy(o),l.x-=Math.sign(l.x)*_,l.y-=Math.sign(l.y)*_,l.z-=Math.sign(l.z)*_,l.normalize(),h[m+0]=c.x*Math.sign(o.x)+l.x*r,h[m+1]=c.y*Math.sign(o.y)+l.y*r,h[m+2]=c.z*Math.sign(o.z)+l.z*r,u[m+0]=l.x,u[m+1]=l.y,u[m+2]=l.z,Math.floor(m/f)){case 0:g.set(1,0,0),d[p+0]=$n(g,l,"z","y",r,n),d[p+1]=1-$n(g,l,"y","z",r,t);break;case 1:g.set(-1,0,0),d[p+0]=1-$n(g,l,"z","y",r,n),d[p+1]=1-$n(g,l,"y","z",r,t);break;case 2:g.set(0,1,0),d[p+0]=1-$n(g,l,"x","z",r,e),d[p+1]=$n(g,l,"z","x",r,n);break;case 3:g.set(0,-1,0),d[p+0]=1-$n(g,l,"x","z",r,e),d[p+1]=1-$n(g,l,"z","x",r,n);break;case 4:g.set(0,0,1),d[p+0]=1-$n(g,l,"x","y",r,e),d[p+1]=1-$n(g,l,"y","x",r,t);break;case 5:g.set(0,0,-1),d[p+0]=$n(g,l,"x","y",r,e),d[p+1]=1-$n(g,l,"y","x",r,t);break}}};function Xh(s,e){if(e===Rf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===ma||e===al){let t=s.getIndex();if(t===null){let a=[],o=s.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===ma)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}var hl=class extends ui{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Qh(t)}),this.register(function(t){return new jh(t)}),this.register(function(t){return new lu(t)}),this.register(function(t){return new cu(t)}),this.register(function(t){return new hu(t)}),this.register(function(t){return new tu(t)}),this.register(function(t){return new nu(t)}),this.register(function(t){return new iu(t)}),this.register(function(t){return new su(t)}),this.register(function(t){return new Jh(t)}),this.register(function(t){return new ru(t)}),this.register(function(t){return new eu(t)}),this.register(function(t){return new ou(t)}),this.register(function(t){return new au(t)}),this.register(function(t){return new Kh(t)}),this.register(function(t){return new uu(t)}),this.register(function(t){return new du(t)})}load(e,t,n,i){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=Zi.extractUrlBase(e);a=Zi.resolveURL(c,this.path)}else a=Zi.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Sr(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Kf){try{a[ft.KHR_BINARY_GLTF]=new fu(e)}catch(u){i&&i(u);return}r=JSON.parse(a[ft.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new vu(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case ft.KHR_MATERIALS_UNLIT:a[u]=new Zh;break;case ft.KHR_DRACO_MESH_COMPRESSION:a[u]=new pu(r,this.dracoLoader);break;case ft.KHR_TEXTURE_TRANSFORM:a[u]=new mu;break;case ft.KHR_MESH_QUANTIZATION:a[u]=new gu;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};function pv(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}var ft={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Kh=class{constructor(e){this.parser=e,this.name=ft.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,h=new Ne(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],en);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Ki(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new $i(h),c.distance=u;break;case"spot":c=new el(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Ri(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}},Zh=class{constructor(){this.name=ft.KHR_MATERIALS_UNLIT}getMaterialType(){return Pt}extendParams(e,t,n){let i=[];e.color=new Ne(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],en),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,vt))}return Promise.all(i)}},Jh=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},Qh=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new he(o,o)}return Promise.all(r)}},jh=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jt}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},eu=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}},tu=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new Ne(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],en)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,vt)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}},nu=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}},iu=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Ne().setRGB(o[0],o[1],o[2],en),Promise.all(r)}},su=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jt}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},ru=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new Ne().setRGB(o[0],o[1],o[2],en),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,vt)),Promise.all(r)}},au=class{constructor(e){this.parser=e,this.name=ft.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}},ou=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}},lu=class{constructor(e){this.parser=e,this.name=ft.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},cu=class{constructor(e){this.parser=e,this.name=ft.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},hu=class{constructor(e){this.parser=e,this.name=ft.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},uu=class{constructor(e){this.name=ft.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){let f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}},du=class{constructor(e){this.name=ft.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let c of i.primitives)if(c.mode!==Kn.TRIANGLES&&c.mode!==Kn.TRIANGLE_STRIP&&c.mode!==Kn.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(let g of u){let _=new Qe,m=new T,p=new Cn,M=new T(1,1,1),y=new vs(g.geometry,g.material,d);for(let S=0;S<d;S++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,S),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,S),l.SCALE&&M.fromBufferAttribute(l.SCALE,S),y.setMatrixAt(S,_.compose(m,p,M));for(let S in l)if(S==="_COLOR_0"){let F=l[S];y.instanceColor=new xs(F.array,F.itemSize,F.normalized)}else S!=="TRANSLATION"&&S!=="ROTATION"&&S!=="SCALE"&&g.geometry.setAttribute(S,l[S]);kt.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),f.push(y)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}},Kf="glTF",xa=12,Xf={JSON:1313821514,BIN:5130562},fu=class{constructor(e){this.name=ft.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,xa),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Kf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-xa,r=new DataView(e,xa),a=0;for(;a<i;){let o=r.getUint32(a,!0);a+=4;let l=r.getUint32(a,!0);if(a+=4,l===Xf.JSON){let c=new Uint8Array(e,xa+a,o);this.content=n.decode(c)}else if(l===Xf.BIN){let c=xa+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},pu=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ft.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let h in a){let u=yu[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=yu[h]||h.toLowerCase();if(a[h]!==void 0){let d=n.accessors[e.attributes[h]],f=Tr[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(let g in f.attributes){let _=f.attributes[g],m=l[g];m!==void 0&&(_.normalized=m)}u(f)},o,c,en,d)})})}},mu=class{constructor(){this.name=ft.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},gu=class{constructor(){this.name=ft.KHR_MESH_QUANTIZATION}},ul=class extends Xi{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,g=e*c,_=g-c,m=-2*f+3*d,p=f-d,M=1-m,y=p-d+u;for(let S=0;S!==o;S++){let F=a[_+S+o],A=a[_+S+l]*h,C=a[g+S+o],P=a[g+S]*h;r[S]=M*F+y*A+m*C+p*P}return r}},mv=new Cn,_u=class extends ul{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return mv.fromArray(r).normalize().toArray(r),r}},Kn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Tr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},qf={9728:xn,9729:Ht,9984:Ph,9985:Gr,9986:nr,9987:ii},Yf={33071:Ct,33648:Zr,10497:ms},qh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},yu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Qi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},gv={CUBICSPLINE:void 0,LINEAR:mr,STEP:pr},Yh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function _v(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new si({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Vn})),s.DefaultMaterial}function ws(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Ri(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function yv(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,h=e.length;c<h;c++){let u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){let u=e[c];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;a.push(d)}if(i){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;o.push(d)}if(r){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],d=c[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function xv(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function vv(s){let e,t=s.extensions&&s.extensions[ft.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+$h(t.attributes):e=s.indices+":"+$h(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+$h(s.targets[n]);return e}function $h(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function xu(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Mv(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}var Sv=new Qe,vu=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new pv,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?this.textureLoader=new br(this.options.manager):this.textureLoader=new tl(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Sr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return ws(r,o,i),Ri(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let a=t[i].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,h]of a.children.entries())r(h,o.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ft.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,a){n.load(Zi.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let a=qh[i.type],o=Tr[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new rn(c,a,l))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],l=qh[i.type],c=Tr[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0,_,m;if(f&&f!==u){let p=Math.floor(d/f),M="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count,y=t.cache.get(M);y||(_=new c(o,p*f,i.count*f/h),y=new xr(_,f/h),t.cache.add(M,y)),m=new ys(y,l,d%f/h,g)}else o===null?_=new c(i.count*l):_=new c(o,d,i.count*l),m=new rn(_,l,g);if(i.sparse!==void 0){let p=qh.SCALAR,M=Tr[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,S=i.sparse.values.byteOffset||0,F=new M(a[1],y,i.sparse.count*p),A=new c(a[2],S,i.sparse.count*l);o!==null&&(m=new rn(m.array.slice(),m.itemSize,m.normalized));for(let C=0,P=F.length;C<P;C++){let b=F[C];if(m.setX(b,A[C*l]),l>=2&&m.setY(b,A[C*l+1]),l>=3&&m.setZ(b,A[C*l+2]),l>=4&&m.setW(b,A[C*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let i=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let d=(r.samplers||{})[a.sampler]||{};return h.magFilter=qf[d.magFilter]||Ht,h.minFilter=qf[d.minFilter]||ii,h.wrapS=Yf[d.wrapS]||ms,h.wrapT=Yf[d.wrapT]||ms,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=i.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;let d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){let m=new un(_);m.needsUpdate=!0,d(m)}),t.load(Zi.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),Ri(u,a),u.userData.mimeType=a.mimeType||Mv(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[ft.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[ft.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=r.associations.get(a);a=r.extensions[ft.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new sa,Pn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new Gi,Pn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return si}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],a,o={},l=r.extensions||{},c=[];if(l[ft.KHR_MATERIALS_UNLIT]){let u=i[ft.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,r,t))}else{let u=r.pbrMetallicRoughness||{};if(o.color=new Ne(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],en),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,vt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=$t);let h=r.alphaMode||Yh.OPAQUE;if(h===Yh.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Yh.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Pt&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new he(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==Pt&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Pt){let u=r.emissiveFactor;o.emissive=new Ne().setRGB(u[0],u[1],u[2],en)}return r.emissiveTexture!==void 0&&a!==Pt&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,vt)),Promise.all(c).then(function(){let u=new a(o);return r.name&&(u.name=r.name),Ri(u,r),t.associations.set(u,{materials:e}),r.extensions&&ws(i,u,r),u})}createUniqueName(e){let t=Rt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[ft.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return $f(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],h=vv(c),u=i[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[ft.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=$f(new Ot,c,t),i[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let h=a[l].material===void 0?_v(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){let c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){let _=h[f],m=a[f],p,M=c[f];if(m.mode===Kn.TRIANGLES||m.mode===Kn.TRIANGLE_STRIP||m.mode===Kn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new Uo(_,M):new Xt(_,M),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Kn.TRIANGLE_STRIP?p.geometry=Xh(p.geometry,al):m.mode===Kn.TRIANGLE_FAN&&(p.geometry=Xh(p.geometry,ma));else if(m.mode===Kn.LINES)p=new Mr(_,M);else if(m.mode===Kn.LINE_STRIP)p=new Wi(_,M);else if(m.mode===Kn.LINE_LOOP)p=new Bo(_,M);else if(m.mode===Kn.POINTS)p=new ko(_,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&xv(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Ri(p,r),m.extensions&&ws(i,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&ws(i,u[0],r),u[0];let d=new Qt;r.extensions&&ws(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new sn(dn.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Vi(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Ri(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),a=i,o=[],l=[];for(let c=0,h=a.length;c<h;c++){let u=a[c];if(u){o.push(u);let d=new Qe;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new No(o,l)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){let f=i.channels[u],g=i.samplers[f.sampler],_=f.target,m=_.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,M=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",M)),c.push(g),h.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){let d=u[0],f=u[1],g=u[2],_=u[3],m=u[4],p=[];for(let M=0,y=d.length;M<y;M++){let S=d[M],F=f[M],A=g[M],C=_[M],P=m[M];if(S===void 0)continue;S.updateMatrix&&S.updateMatrix();let b=n._createAnimationTracks(S,F,A,C,P);if(b)for(let x=0;x<b.length;x++)p.push(b[x])}return new Jo(r,void 0,p)})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));let l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){let h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Sv)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(r.isBone===!0?h=new na:c.length>1?h=new Qt:c.length===1?h=c[0]:h=new kt,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=a),Ri(h,r),r.extensions&&ws(n,h,r),r.matrix!==void 0){let u=new Qe;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new Qt;n.name&&(r.name=i.createUniqueName(n.name)),Ri(r,n),n.extensions&&ws(t,r,n);let a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);let c=h=>{let u=new Map;for(let[d,f]of i.associations)(d instanceof Pn||d instanceof un)&&u.set(d,f);return h.traverse(d=>{let f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){let a=[],o=e.name?e.name:e.uuid,l=[];Qi[r.path]===Qi.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(Qi[r.path]){case Qi.weights:c=Ei;break;case Qi.rotation:c=Ti;break;case Qi.position:case Qi.scale:c=Ai;break;default:n.itemSize===1?c=Ei:c=Ai;break}let h=i.interpolation!==void 0?gv[i.interpolation]:mr,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){let g=new c(l[d]+"."+Qi[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=xu(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof Ti?_u:ul;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function bv(s,e,t){let n=e.attributes,i=new Wn;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new T(l[0],l[1],l[2]),new T(c[0],c[1],c[2])),o.normalized){let h=xu(Tr[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new T,l=new T;for(let c=0,h=r.length;c<h;c++){let u=r[c];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){let _=xu(Tr[d.componentType]);l.multiplyScalar(_)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;let a=new On;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function $f(s,e,t){let n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){s.setAttribute(o,l)})}for(let a in n){let o=yu[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){let a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return gt.workingColorSpace!==en&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${gt.workingColorSpace}" not supported.`),Ri(s,e),bv(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?yv(s,e.targets,t):s})}var dl=class extends Qo{constructor(e){super(e),this.type=vn}parse(e){let a=function(P,b){switch(P){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(b||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(b||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(b||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(b||""))}},u=function(P,b,x){b=b||1024;let H=P.pos,z=-1,B=0,te="",V=String.fromCharCode.apply(null,new Uint16Array(P.subarray(H,H+128)));for(;0>(z=V.indexOf(`
`))&&B<b&&H<P.byteLength;)te+=V,B+=V.length,H+=128,V+=String.fromCharCode.apply(null,new Uint16Array(P.subarray(H,H+128)));return-1<z?(x!==!1&&(P.pos+=B+z+1),te+V.slice(0,z)):!1},d=function(P){let b=/^#\?(\S+)/,x=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,L=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,H=/^\s*FORMAT=(\S+)\s*$/,z=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,B={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0},te,V;for((P.pos>=P.byteLength||!(te=u(P)))&&a(1,"no header found"),(V=te.match(b))||a(3,"bad initial token"),B.valid|=1,B.programtype=V[1],B.string+=te+`
`;te=u(P),te!==!1;){if(B.string+=te+`
`,te.charAt(0)==="#"){B.comments+=te+`
`;continue}if((V=te.match(x))&&(B.gamma=parseFloat(V[1])),(V=te.match(L))&&(B.exposure=parseFloat(V[1])),(V=te.match(H))&&(B.valid|=2,B.format=V[1]),(V=te.match(z))&&(B.valid|=4,B.height=parseInt(V[1],10),B.width=parseInt(V[2],10)),B.valid&2&&B.valid&4)break}return B.valid&2||a(3,"missing format specifier"),B.valid&4||a(3,"missing image size specifier"),B},f=function(P,b,x){let L=b;if(L<8||L>32767||P[0]!==2||P[1]!==2||P[2]&128)return new Uint8Array(P);L!==(P[2]<<8|P[3])&&a(3,"wrong scanline width");let H=new Uint8Array(4*b*x);H.length||a(4,"unable to allocate buffer space");let z=0,B=0,te=4*L,V=new Uint8Array(4),se=new Uint8Array(te),ee=x;for(;ee>0&&B<P.byteLength;){B+4>P.byteLength&&a(1),V[0]=P[B++],V[1]=P[B++],V[2]=P[B++],V[3]=P[B++],(V[0]!=2||V[1]!=2||(V[2]<<8|V[3])!=L)&&a(3,"bad rgbe scanline format");let Ee=0,Me;for(;Ee<te&&B<P.byteLength;){Me=P[B++];let ze=Me>128;if(ze&&(Me-=128),(Me===0||Ee+Me>te)&&a(3,"bad scanline data"),ze){let Ye=P[B++];for(let ie=0;ie<Me;ie++)se[Ee++]=Ye}else se.set(P.subarray(B,B+Me),Ee),Ee+=Me,B+=Me}let Pe=L;for(let ze=0;ze<Pe;ze++){let Ye=0;H[z]=se[ze+Ye],Ye+=L,H[z+1]=se[ze+Ye],Ye+=L,H[z+2]=se[ze+Ye],Ye+=L,H[z+3]=se[ze+Ye],z+=4}ee--}return H},g=function(P,b,x,L){let H=P[b+3],z=Math.pow(2,H-128)/255;x[L+0]=P[b+0]*z,x[L+1]=P[b+1]*z,x[L+2]=P[b+2]*z,x[L+3]=1},_=function(P,b,x,L){let H=P[b+3],z=Math.pow(2,H-128)/255;x[L+0]=ga.toHalfFloat(Math.min(P[b+0]*z,65504)),x[L+1]=ga.toHalfFloat(Math.min(P[b+1]*z,65504)),x[L+2]=ga.toHalfFloat(Math.min(P[b+2]*z,65504)),x[L+3]=ga.toHalfFloat(1)},m=new Uint8Array(e);m.pos=0;let p=d(m),M=p.width,y=p.height,S=f(m.subarray(m.pos),M,y),F,A,C;switch(this.type){case En:C=S.length/4;let P=new Float32Array(C*4);for(let x=0;x<C;x++)g(S,x*4,P,x*4);F=P,A=En;break;case vn:C=S.length/4;let b=new Uint16Array(C*4);for(let x=0;x<C;x++)_(S,x*4,b,x*4);F=b,A=vn;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:M,height:y,data:F,header:p.string,gamma:p.gamma,exposure:p.exposure,type:A}}setDataType(e){return this.type=e,this}load(e,t,n,i){function r(a,o){switch(a.type){case En:case vn:a.colorSpace=en,a.minFilter=Ht,a.magFilter=Ht,a.generateMipmaps=!1,a.flipY=!0;break}t&&t(a,o)}return super.load(e,r,n,i)}};var fl={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var Fn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},wv=new Vi(-1,1,1,-1,0,1),Mu=class extends Ot{constructor(){super(),this.setAttribute("position",new dt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new dt([0,2,0,0,2,0],2))}},Ev=new Mu,ji=class{constructor(e){this._mesh=new Xt(Ev,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,wv)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var pl=class extends Fn{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof an?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ji.clone(e.uniforms),this.material=new an({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new ji(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var va=class extends Fn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}},ml=class extends Fn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var gl=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new he);this._width=n.width,this._height=n.height,t=new Tn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:vn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new pl(fl),this.copyPass.material.blending=ci,this.clock=new nl}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let i=0,r=this.passes.length;i<r;i++){let a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}va!==void 0&&(a instanceof va?n=!0:a instanceof ml&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new he);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var _l=class extends Fn{constructor(e,t,n=null,i=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ne}render(e,t,n){let i=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=i}};var Zf={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ne(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var Ar=class s extends Fn{constructor(e,t,n,i){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new he(e.x,e.y):new he(256,256),this.clearColor=new Ne(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Tn(r,a,{type:vn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){let d=new Tn(r,a,{type:vn});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let f=new Tn(r,a,{type:vn});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),a=Math.round(a/2)}let o=Zf;this.highPassUniforms=Ji.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new an({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new he(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new T(1,1,1),new T(1,1,1),new T(1,1,1),new T(1,1,1),new T(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;let h=fl;this.copyUniforms=Ji.clone(h.uniforms),this.blendMaterial=new an({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:Gn,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Ne,this.oldClearAlpha=1,this.basic=new Pt,this.fsQuad=new ji(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new he(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();let a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=s.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=s.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeperableBlurMaterial(e){let t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new an({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new he(.5,.5)},direction:{value:new he(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new an({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};Ar.BlurDirectionX=new he(1,0);Ar.BlurDirectionY=new he(0,1);var Jf={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var yl=class extends Fn{constructor(){super();let e=Jf;this.uniforms=Ji.clone(e.uniforms),this.material=new Ko({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new ji(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},gt.getTransfer(this._outputColorSpace)===Tt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Eh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Th?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Ah?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===pa?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Rh?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ch&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};function Qf(){let s=0,e=null,t=!0;return{invalidate(){t=!0},tick(n,{hidden:i=!1,enabled:r=!0,fps:a=60}={}){if(i)return e=null,t=!0,null;if(!r&&!t)return null;let o=1e3/a;if(!t&&e!==null&&n-e<o-1)return null;let l=e===null?o:Math.max(0,n-e);e=n,t=!1;let c=r?Math.min(l/1e3,.12):0;return s+=c,{delta:c,elapsed:s,frameMs:l}},reset(){e=null,t=!0}}}function jf(s=[]){let e=i=>Math.max(0,Number.isFinite(Number(i))?Number(i):0),t=s.slice(-12).map((i,r)=>{let a=e(i.requests),o=e(i.ordersReceived??i.workCreated);return{key:i.day||i.date||i.label||String(r),label:i.label||`Day ${r+1}`,requests:a,orders:o,total:a+o}}),n=Math.max(1,...t.flatMap(i=>[i.requests,i.orders]));return t.map(i=>({...i,requestScale:i.requests/n,orderScale:i.orders/n}))}var Oe={blue:7907839,teal:7524806,mint:9034154,cyan:7265535,violet:10845183,magenta:16741331,amber:16765580,steel:2765880,steelDark:1844520,steelLight:3753547},di={overview:{id:"overview",label:"Overview",pos:[0,8,29.6],look:[0,1.75,-.45]},buckets:{id:"buckets",label:"Platform Systems",pos:[.6,6.2,14.8],look:[.8,2.05,-7.7]},timeline:{id:"timeline",label:"Activity Runway",pos:[5.6,5.4,12.4],look:[4.5,1.25,1.1]},files:{id:"files",label:"Notable Signals",pos:[0,4,15.6],look:[0,1.65,6.05]},vault:{id:"vault",label:"App Health",pos:[-15,6.8,5.8],look:[-8.25,3.95,-7]}},Tv=2.7;function ep(s){return s<.5?4*s*s*s:1-Math.pow(-2*s+2,3)/2}function tp(s){let{canvas:e,touchTargets:t,tooltip:n,buckets:i,months:r,files:a,formatBytes:o,core:l={},activity:c=[],onZoneChange:h=()=>{},onBucketSelected:u=()=>{},onMonthSelected:d=()=>{},onFileSelected:f=()=>{},onVaultSelected:g=()=>{},qualityPreference:_="auto",onPerformanceSample:m=()=>{},onQualityChange:p=()=>{},onFirstRender:M=()=>{},onInspection:y=()=>{},onMotionChange:S=()=>{},motionPaused:F=!1}=s,A=Array.isArray(l.rows)?l.rows:[],C=A.find(([v])=>v==="Health score"),P=Object.freeze({performance:{pixelRatioMin:1,pixelRatioMax:1,samples:0,bloom:.55,shadowSize:1024,targetFps:45},balanced:{pixelRatioMin:1,pixelRatioMax:1.4,samples:2,bloom:.85,shadowSize:1024,targetFps:60},cinematic:{pixelRatioMin:1.35,pixelRatioMax:2,samples:4,bloom:1,shadowSize:2048,targetFps:60}});function b(){let v=navigator.connection||navigator.mozConnection||navigator.webkitConnection,D=window.matchMedia("(pointer: coarse), (hover: none)").matches,R=!!v?.saveData||/(^|-)2g|3g/.test(String(v?.effectiveType||"")),W=Number(navigator.deviceMemory)>0&&Number(navigator.deviceMemory)<=4||Number(navigator.hardwareConcurrency)>0&&Number(navigator.hardwareConcurrency)<=4;return D||R||W?"performance":"balanced"}function x(v){return v==="performance"||v==="cinematic"?v:b()}let L={preference:["auto","performance","cinematic"].includes(_)?_:"auto",effective:x(_)},H=P[L.effective],z=null,B=new Io({canvas:e,antialias:!1,powerPreference:"high-performance"}),te=()=>Math.min(Math.max(window.devicePixelRatio||1,H.pixelRatioMin),H.pixelRatioMax);B.setPixelRatio(te()),B.setSize(window.innerWidth,window.innerHeight),B.outputColorSpace=vt,B.toneMapping=pa,B.toneMappingExposure=1.24,B.shadowMap.enabled=!0,B.shadowMap.type=wh,B.info.autoReset=!1;let V=new Do;V.background=new Ne(860722),V.backgroundIntensity=1.28,V.fog=new Lo(860722,.00285),V.environmentIntensity=.84;let se=new sn(38,window.innerWidth/window.innerHeight,.1,300),ee=!1,Ee=new da;Ee.onLoad=()=>{ee=!0,le()},new dl(Ee).load("assets/performance-spatial/hdri/studio_small_01_1k.hdr",v=>{v.mapping=Kr,V.environment=v});let Me=new br(Ee),Pe=Me.load("assets/performance-spatial/textures/file-cube-skins.png",v=>{v.colorSpace=vt,v.anisotropy=B.capabilities.getMaxAnisotropy(),v.needsUpdate=!0});Pe.colorSpace=vt,Pe.wrapS=Ct,Pe.wrapT=Ct;let ze=Me.load("assets/performance-spatial/textures/silo-open-panels.png",v=>{v.colorSpace=vt,v.anisotropy=B.capabilities.getMaxAnisotropy(),v.needsUpdate=!0});ze.colorSpace=vt,ze.wrapS=Ct,ze.wrapT=Ct;let Ye=Me.load("assets/performance-spatial/textures/silo-closed-panels.png",v=>{v.colorSpace=vt,v.anisotropy=B.capabilities.getMaxAnisotropy(),v.needsUpdate=!0});Ye.colorSpace=vt,Ye.wrapS=Ct,Ye.wrapT=Ct;let ie=Me.load("assets/performance-spatial/textures/capacity-core-kit.png",v=>{v.colorSpace=vt,v.anisotropy=B.capabilities.getMaxAnisotropy(),v.needsUpdate=!0});ie.colorSpace=vt,ie.wrapS=Ct,ie.wrapT=Ct;let ue=Me.load("assets/performance-spatial/textures/floor-deck.png",v=>{v.colorSpace=vt,v.anisotropy=B.capabilities.getMaxAnisotropy(),v.needsUpdate=!0});ue.colorSpace=vt,ue.wrapS=Ct,ue.wrapT=Ct;let Ie=Me.load("assets/performance-spatial/textures/outer-walls.png",v=>{v.colorSpace=vt,v.anisotropy=B.capabilities.getMaxAnisotropy(),v.needsUpdate=!0,V.background=v,V.backgroundIntensity=1.34});Ie.colorSpace=vt,Ie.wrapS=Ct,Ie.wrapT=Ct;let be=new gl(B),nt=B.getPixelRatio();B.capabilities.isWebGL2&&(be.renderTarget1.samples=H.samples,be.renderTarget2.samples=H.samples),be.addPass(new _l(V,se));let rt=new Ar(new he(window.innerWidth,window.innerHeight),.28,.24,.95);be.addPass(rt),be.addPass(new yl);function ct(){let v=se.aspect<.75;B.toneMappingExposure=v?1.28:1.24,rt.strength=(v?.26:.22)*H.bloom,rt.radius=v?.24:.2,V.background?.isColor&&V.background.setHex(v?1059648:860722),V.backgroundIntensity=v?1.42:1.34,V.fog.color.setHex(v?1059648:860722),V.fog.density=v?.00235:.00285,V.environmentIntensity=v?.92:.84}function It(v="auto"){L={preference:["auto","performance","cinematic"].includes(v)?v:"auto",effective:x(v)},H=P[L.effective],B.capabilities.isWebGL2&&(be.renderTarget1.samples=H.samples,be.renderTarget2.samples=H.samples);let D=te();return B.getPixelRatio()!==D&&B.setPixelRatio(D),nt!==D&&(be.setPixelRatio(D),nt=D),z&&(z.shadow.mapSize.set(H.shadowSize,H.shadowSize),z.shadow.map?.dispose(),z.shadow.map=null,z.shadow.needsUpdate=!0),ct(),le(),p({...L}),{...L}}let U=[],it=[],Mt=[],pt={elapsedTime:0},De=Qf(),Lt=window.matchMedia("(prefers-reduced-motion: reduce)"),Je=F,je=()=>!Je&&!Lt.matches,I=0,w=0,K=-100,le=()=>De.invalidate(),ce=new il,oe=new he(10,10),Fe={x:0,y:0,overCanvas:!1},ve=null,Se=null,Xe="overview",ne={basePos:new T(...di.overview.pos),baseLook:new T(...di.overview.look),fromPos:new T,toPos:new T(...di.overview.pos),fromLook:new T,toLook:new T(...di.overview.look),t:1,duration:1.7,yaw:0,pitch:0,yawStart:0,pitchStart:0},Ae=new T,at=new sl;function Ze(){return se.aspect<.58?1.78:se.aspect<.9?1.52:1}function Re(v,D,R=1.7){le(),ne.fromPos.copy(ne.basePos),ne.fromLook.copy(ne.baseLook),ne.toLook.copy(D),ne.toPos.copy(D).add(Ae.copy(v).sub(D).multiplyScalar(Ze())),ne.yawStart=ne.yaw,ne.pitchStart=ne.pitch,ne.t=0,ne.duration=R}function $e(v,D=1.7){let R=di[v];Xe=v,Re(new T(...R.pos),new T(...R.look),D),h(R)}function ge(v,{roughness:D=.36,metalness:R=.55,emissive:W=0,emissiveIntensity:Z=.3}={}){return new si({color:v,roughness:D,metalness:R,emissive:W,emissiveIntensity:Z})}function Ft(v,{roughness:D=.72,metalness:R=.1,emissive:W=0,emissiveIntensity:Z=.3}={}){return new si({color:v,roughness:D,metalness:R,emissive:W,emissiveIntensity:Z})}function O(v,D=1.6){return new si({color:791574,emissive:v,emissiveIntensity:D*.82,roughness:.4,metalness:.1})}function J(v,D,R,W,{shadow:Z=!0}={}){let q=new Xt(D,R);return q.position.set(...W),q.castShadow=Z,q.receiveShadow=Z,v.add(q),q}function Q(v,D,R,W,Z){let q=Math.min(.14,Math.min(...D)*.24);return J(v,new ya(...D,4,q),W,R,Z)}function re({x:v,y:D,w:R,h:W},Z=Pe){let q=Z.clone();return q.colorSpace=vt,q.anisotropy=B.capabilities.getMaxAnisotropy(),q.wrapS=Ct,q.wrapT=Ct,q.repeat.set(R,W),q.offset.set(v,1-D-W),q.needsUpdate=!0,q}function de(v,{emissiveIntensity:D=.36,opacity:R=1,atlas:W=Pe,emissive:Z=7724287,metalness:q=.72,roughness:j=.34,side:ae=Vn}={}){let xe=re(v,W);return new si({color:16777215,map:xe,emissive:Z,emissiveMap:xe,emissiveIntensity:D,roughness:j,metalness:q,side:ae,transparent:R<1,opacity:R,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})}function He(v,{atlas:D=Pe,color:R=16777215,opacity:W=.65}={}){return new Pt({map:re(v,D),color:R,transparent:!0,opacity:W,blending:Gn,depthWrite:!1,side:$t})}function Ke(v,D,R,W,Z=[0,0,0]){let q=J(v,new yr(...D),W,R,{shadow:!1});return q.rotation.set(...Z),q.renderOrder=4,q}function qt(v,D,{angle:R=0,radius:W=.78,y:Z=1,width:q=.42,height:j=2,atlas:ae,emissive:xe=7265535,emissiveIntensity:Ge=.22}={}){return Ke(v,[q,j],[Math.sin(R)*W,Z,Math.cos(R)*W],de(D,{atlas:ae,emissive:xe,emissiveIntensity:Ge,metalness:.82,roughness:.36,side:$t}),[0,R,0])}function Dt(v,D,{angle:R=0,radius:W=.78,y:Z=1,width:q=.42,height:j=2,atlas:ae,emissive:xe=7265535,emissiveIntensity:Ge=.22,trim:Le=!0}={}){let mt=new Qt;mt.position.set(Math.sin(R)*W,Z,Math.cos(R)*W),mt.rotation.y=R,v.add(mt);let N=Ke(mt,[q,j],[0,0,.006],de(D,{atlas:ae,emissive:xe,emissiveIntensity:Ge,metalness:.82,roughness:.36,side:$t}));if(N.userData.kind="closedSiloSkin",Le){let X=ge(132618,{roughness:.44,metalness:.92,emissive:66566,emissiveIntensity:.08}),We=ge(462872,{roughness:.42,metalness:.9,emissive:135190,emissiveIntensity:.14});[[-q/2-.035,0,.024,.07,j+.04,.06],[q/2+.035,0,.024,.07,j+.04,.06]].forEach(([_e,ke,pe,ht,St,wt])=>{let Bt=Q(mt,[ht,St,wt],[_e,ke,pe],X,{shadow:!1});Bt.userData.kind="closedSiloSkin"}),[[0,j/2+.035,.028,q+.15,.07,.065],[0,-j/2-.035,.028,q+.15,.07,.065]].forEach(([_e,ke,pe,ht,St,wt])=>{let Bt=Q(mt,[ht,St,wt],[_e,ke,pe],We,{shadow:!1});Bt.userData.kind="closedSiloSkin"})}return mt.userData.kind="closedSiloSkin",mt}function _t(v,D,R,W,{phase:Z=0,speed:q=.12,size:j=.12}={}){let ae=J(v,new bs(j,12,8),new Pt({color:W,transparent:!0,opacity:.72,blending:Gn,depthWrite:!1}),D,{shadow:!1});return ae.userData.kind="dataPacket",ae.userData.from=new T(...D),ae.userData.to=new T(...R),ae.userData.phase=Z,ae.userData.speed=q,it.push(ae),ae}function In(v,D){return D.platformTooltip&&(D.tooltip=D.platformTooltip),v.userData.payload=D,v.userData.baseScale=v.scale.clone(),v.userData.baseY=v.position.y,v.userData.baseEmissive=v.material.emissiveIntensity??0,U.push(v),it.push(v),v}function Ln(v,{accent:D="#eef7f4",scale:R=1,chip:W=!0}={}){let Z=Math.min(Math.max(window.devicePixelRatio*2,3),4),q=24,j=['540 31px Inter, "Segoe UI", Arial, sans-serif','450 22px Inter, "Segoe UI", Arial, sans-serif'],ae=[40,31],xe=document.createElement("canvas").getContext("2d"),Ge=0;v.forEach((pe,ht)=>{xe.font=j[Math.min(ht,1)],Ge=Math.max(Ge,xe.measureText(pe).width)});let Le=Math.ceil(Ge+q*2),mt=q*2+v.reduce((pe,ht,St)=>pe+ae[Math.min(St,1)],0)-12,N=document.createElement("canvas");N.width=Le*Z,N.height=mt*Z;let X=N.getContext("2d");X.scale(Z,Z),W?(X.fillStyle="rgba(6, 12, 13, 0.84)",X.beginPath(),X.roundRect(1,1,Le-2,mt-2,14),X.fill(),X.strokeStyle="rgba(190, 235, 228, 0.32)",X.lineWidth=2,X.stroke()):(X.shadowColor="rgba(0, 0, 0, 0.85)",X.shadowBlur=3),X.textAlign="center";let We=q+28;v.forEach((pe,ht)=>{X.font=j[Math.min(ht,1)],X.fillStyle=ht===0?D:"#a7b3b3",X.fillText(pe,Le/2,We),We+=ae[Math.min(ht,1)]});let _e=new ra(N);_e.colorSpace=vt,_e.anisotropy=4;let ke=new ta(new vr({map:_e,transparent:!0,depthWrite:!1}));return ke.scale.set(Le/110*R,mt/110*R,1),ke}function es({eyebrow:v="App performance",title:D,subtitle:R="",badge:W="",rows:Z=[],footer:q="",status:j="Online",accent:ae="#6edcff",width:xe=520,height:Ge=300,scale:Le=1}){let N=document.createElement("canvas");N.width=xe*2,N.height=Ge*2;let X=N.getContext("2d");X.scale(2,2);let We=16,_e=()=>{X.beginPath(),X.moveTo(We,1),X.lineTo(xe-We,1),X.lineTo(xe-1,We),X.lineTo(xe-1,Ge-We),X.lineTo(xe-We,Ge-1),X.lineTo(We,Ge-1),X.lineTo(1,Ge-We),X.lineTo(1,We),X.closePath()};_e(),X.fillStyle="rgba(2, 8, 13, 0.985)",X.fill();let ke=X.createLinearGradient(0,0,xe,Ge);ke.addColorStop(0,"rgba(110, 220, 255, 0.075)"),ke.addColorStop(.32,"rgba(8, 19, 28, 0.02)"),ke.addColorStop(1,"rgba(232, 173, 98, 0.035)"),_e(),X.fillStyle=ke,X.fill(),_e(),X.strokeStyle="rgba(110, 220, 255, 0.42)",X.lineWidth=2,X.stroke(),X.strokeStyle=ae,X.lineWidth=2,X.beginPath(),X.moveTo(38,1),X.lineTo(Math.min(xe*.42,210),1),X.stroke(),X.strokeStyle="rgba(110, 220, 255, 0.18)",X.lineWidth=1,X.beginPath(),X.moveTo(26,92),X.lineTo(xe-26,92),X.moveTo(26,Ge-35),X.lineTo(xe-26,Ge-35),X.stroke();let pe=(Dn,cn,gn,Sn,Kt=600)=>{let Yt=gn;do{if(X.font=`${Kt} ${Yt}px Inter, "Segoe UI", Arial, sans-serif`,X.measureText(String(Dn)).width<=cn)break;Yt-=1}while(Yt>Sn);return Yt};if(X.fillStyle=ae,X.font='560 12px Inter, "Segoe UI", Arial, sans-serif',X.fillText(v.toUpperCase(),28,27),W){X.font='620 12px Inter, "Segoe UI", Arial, sans-serif';let Dn=Math.max(74,X.measureText(W.toUpperCase()).width+24),cn=xe-28-Dn;X.fillStyle="rgba(110, 220, 255, 0.07)",X.strokeStyle="rgba(110, 220, 255, 0.28)",X.beginPath(),X.roundRect(cn,13,Dn,27,4),X.fill(),X.stroke(),X.fillStyle="#dff4ff",X.textAlign="center",X.fillText(W.toUpperCase(),cn+Dn/2,32),X.textAlign="left"}let ht=xe-56;pe(D,ht,30,18,610),X.fillStyle="#eef7f8",X.fillText(D,28,59),R&&(pe(R,ht,14,11,480),X.fillStyle="rgba(169, 187, 194, 0.82)",X.fillText(R,28,80));let St=105,wt=Ge-42,Bt=Math.max(32,(wt-St)/Math.max(Z.length,1));Z.forEach(([Dn,cn],gn)=>{let Sn=St+Bt*gn;gn>0&&(X.strokeStyle="rgba(171, 212, 222, 0.10)",X.beginPath(),X.moveTo(28,Sn),X.lineTo(xe-28,Sn),X.stroke()),X.fillStyle=gn===0?ae:"rgba(110, 220, 255, 0.48)",X.fillRect(28,Sn+Bt/2-3,6,6),X.fillStyle="#8fa3ad",X.font='540 13px Inter, "Segoe UI", Arial, sans-serif',X.fillText(Dn.toUpperCase(),46,Sn+Bt/2+4),X.fillStyle=gn===0?ae:"#eff8ff",pe(cn,xe*.52,gn===0?24:20,13,gn===0?640:580),X.textAlign="right",X.fillText(cn,xe-28,Sn+Bt/2+(gn===0?7:6)),X.textAlign="left"}),q&&(X.fillStyle="rgba(164, 183, 189, 0.72)",X.font='520 11px Inter, "Segoe UI", Arial, sans-serif',pe(q.toUpperCase(),xe-148,11,9,520),X.fillText(q.toUpperCase(),28,Ge-15)),j&&(X.fillStyle="#72d9a4",X.beginPath(),X.arc(xe-94,Ge-18,3,0,Math.PI*2),X.fill(),X.font='600 11px Inter, "Segoe UI", Arial, sans-serif',X.textAlign="right",X.fillText(j.toUpperCase(),xe-28,Ge-15),X.textAlign="left");let Wt=new ra(N);Wt.colorSpace=vt,Wt.anisotropy=B.capabilities.getMaxAnisotropy(),Wt.generateMipmaps=!1,Wt.minFilter=Ht,Wt.magFilter=Ht,Wt.needsUpdate=!0;let Qn=new ta(new vr({map:Wt,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}));return Qn.scale.set(xe/78*Le,Ge/78*Le,1),Qn}function Ci(v,D){return Mt.push({sprite:v,zone:D}),v}let st=new Qt;V.add(st);let ai=new Qt;ai.visible=!1,st.add(ai),new hl(Ee).load("assets/performance-spatial/models/maintain_ops_concept_kit.glb",v=>{let D=v.scene;D.name="Blender concept architecture kit",D.position.set(0,-.04,0),D.traverse(R=>{if(!R.isMesh)return;let W=R.name.includes("kit_stage_")||R.name.includes("kit_floor_armor_plate"),Z=R.name.includes("kit_file_emitter_")||R.name.includes("kit_file_glass_shard_"),q=R.name.includes("kit_back_");if(R.name.includes("kit_perimeter_heat_fin")||R.name.includes("kit_side_reactor_tower")||W||Z||q){R.visible=!1;return}R.castShadow=!0,R.receiveShadow=!0,R.material&&(R.material.envMapIntensity=R.material.name.toLowerCase().includes("emissive")?.5:.9,R.material.emissiveIntensity&&(R.material.emissiveIntensity*=.72))}),st.add(D)},void 0,v=>{console.warn("Blender concept kit failed to load",v)});let Ma=J(st,new At(18.6,19.6,.55,96),ge(462873,{roughness:.36,metalness:.84,emissive:133389,emissiveIntensity:.12}),[0,-.28,.5]);Ma.receiveShadow=!0;let ts=J(st,new Ms(18.35,160),new jt({map:ue,color:16777215,roughness:.46,metalness:.86,emissive:1454656,emissiveMap:ue,emissiveIntensity:.18,clearcoat:.22,clearcoatRoughness:.5,side:$t}),[0,.015,.5],{shadow:!1});ts.rotation.x=-Math.PI/2,ts.receiveShadow=!0;let Rr=J(st,new Ms(18.28,160),new Pt({map:ue,color:9431807,transparent:!0,opacity:.07,blending:Gn,depthWrite:!1,side:$t}),[0,.028,.5],{shadow:!1});Rr.rotation.x=-Math.PI/2,Rr.renderOrder=1,J(st,new At(19.6,16.8,1.6,96),ge(396564,{roughness:.54,metalness:.72,emissive:66567,emissiveIntensity:.08}),[0,-1.35,.5]);function ns(v,D,R,W,Z,q=.045){let j=new la;j.absarc(0,0,D,R,W,!1),j.lineTo(Math.cos(W)*v,Math.sin(W)*v),j.absarc(0,0,v,W,R,!0),j.closePath();let ae=J(st,new $o(j,10),Z,[0,q,.5],{shadow:!1});return ae.rotation.x=-Math.PI/2,ae.renderOrder=2,ae}let Sa=ge(462872,{roughness:.5,metalness:.9,emissive:132874,emissiveIntensity:.06}),ba=ge(727073,{roughness:.43,metalness:.88,emissive:200728,emissiveIntensity:.07});J(st,new At(2.12,2.12,.055,96),ge(198926,{roughness:.55,metalness:.94,emissive:66565,emissiveIntensity:.04}),[0,.018,.5],{shadow:!1});for(let v=0;v<12;v+=1){let R=v/12*Math.PI*2+.022,W=(v+1)/12*Math.PI*2-.022;ns(.72,2.02,R,W,v%2===0?Sa:ba,.052);let Z=R+(W-R)*.5,q=1.37,j=Q(st,[.018,.018,1.14],[Math.cos(Z)*q,.058,Math.sin(Z)*q+.5],ge(66567,{roughness:.58,metalness:.94,emissive:258,emissiveIntensity:.02}),{shadow:!1});j.rotation.y=-Z;let ae=Z,xe=1.78,Ge=J(st,new At(.042,.042,.026,10),ge(v%3===0?9201730:1714481,{roughness:.36,metalness:.94,emissive:v%3===0?Oe.amber:332827,emissiveIntensity:v%3===0?.08:.03}),[Math.cos(ae)*xe,.077,Math.sin(ae)*xe+.5],{shadow:!1});Ge.renderOrder=4}let Sl=J(st,new At(.67,.7,.065,48),ge(660507,{roughness:.38,metalness:.92,emissive:200728,emissiveIntensity:.07}),[0,.052,.5],{shadow:!1});Sl.receiveShadow=!0,[.69,1.12,1.98].forEach((v,D)=>{let R=J(st,new Gt(v,D===2?.025:.014,8,96),ge(397336,{roughness:.48,metalness:.92,emissive:D===1?2381156:464928,emissiveIntensity:D===1?.1:.04}),[0,.072+D*.001,.5],{shadow:!1});R.rotation.x=Math.PI/2});for(let v=0;v<4;v+=1){let D=v*(Math.PI/2)+Math.PI/4,R=1.5,W=Q(st,[.055,.018,.34],[Math.cos(D)*R,.067,Math.sin(D)*R+.5],ge(397336,{roughness:.48,metalness:.92,emissive:Oe.cyan,emissiveIntensity:.16}),{shadow:!1});W.rotation.y=-D}let bl=[new Pt({color:1782852,transparent:!0,opacity:.2,depthWrite:!1}),new Pt({color:793382,transparent:!0,opacity:.28,depthWrite:!1})];[{inner:2.15,outer:5.1,count:8,offset:.05},{inner:5.55,outer:9.9,count:12,offset:.18},{inner:10.35,outer:14.65,count:16,offset:.08},{inner:15.1,outer:17.95,count:20,offset:0}].forEach((v,D)=>{for(let R=0;R<v.count;R+=1){let Z=v.offset+R/v.count*Math.PI*2+.012,q=v.offset+(R+1)/v.count*Math.PI*2-.012;ns(v.inner,v.outer,Z,q,bl[(R+D)%2],.035+D*.002);let j=v.offset+R/v.count*Math.PI*2,ae=(v.inner+v.outer)*.5,xe=v.outer-v.inner-.18,Ge=Q(st,[.026,.032,xe],[Math.cos(j)*ae,.052+D*.002,Math.sin(j)*ae+.5],ge(132875,{roughness:.46,metalness:.92,emissive:133132,emissiveIntensity:.06}),{shadow:!1});if(Ge.rotation.y=-j,Ge.renderOrder=4,R%Math.max(2,Math.floor(v.count/6))===0){let Le=Q(st,[.018,.04,xe*.5],[Math.cos(j+.012)*ae,.018+D*.001,Math.sin(j+.012)*ae+.5],ge(463642,{roughness:.48,metalness:.92,emissive:Oe.cyan,emissiveIntensity:.045}),{shadow:!1});Le.rotation.y=-j}}});let wl=J(st,new At(18.72,18.58,.18,160,1,!0),ge(198669,{roughness:.42,metalness:.9,emissive:200726,emissiveIntensity:.12}),[0,.06,.5],{shadow:!1});wl.renderOrder=1;let E=J(st,new At(14.9,14.75,.08,144,1,!0),ge(462872,{roughness:.5,metalness:.82,emissive:200726,emissiveIntensity:.08}),[0,.075,.5],{shadow:!1});E.renderOrder=1;let k=J(st,new Gt(18.45,.01,10,160),ge(463642,{roughness:.48,metalness:.9,emissive:Oe.cyan,emissiveIntensity:.06}),[0,.02,.5],{shadow:!1});k.rotation.x=Math.PI/2;let Y=J(st,new Gt(19.3,.045,10,128),O(2845298,.28),[0,-.9,.5],{shadow:!1});Y.rotation.x=Math.PI/2,[2.15,5.1,5.55,9.9,10.35,14.65,15.1,17.95].forEach((v,D)=>{let R=J(st,new Gt(v,.012,8,160),ge(66824,{roughness:.52,metalness:.9,emissive:515,emissiveIntensity:.025}),[0,.028+D*8e-4,.5],{shadow:!1});R.rotation.x=Math.PI/2,R.renderOrder=2;let W=J(st,new Gt(v+.03,.0035,8,128),ge(397336,{roughness:.52,metalness:.88,emissive:2845298,emissiveIntensity:D%3===0?.05:.03}),[0,.018+D*6e-4,.5],{shadow:!1});W.rotation.x=Math.PI/2});for(let v=0;v<16;v+=1){let D=v/16*Math.PI*2,R=9.4,W=16.2,Z=Math.sin(D)*R,q=Math.cos(D)*R+.5,j=Q(st,[.028,.024,W],[Z,.038,q],ge(528922,{roughness:.48,metalness:.92,emissive:133132,emissiveIntensity:.035}),{shadow:!1});j.rotation.y=D,j.renderOrder=3}for(let v=0;v<32;v+=1){let D=v/32*Math.PI*2,R=v%2?17:15.35,W=Math.cos(D)*R,Z=Math.sin(D)*R+.5,q=Q(st,[v%4===0?.08:.055,.035,v%4===0?.82:.48],[W,.038,Z],ge(463642,{roughness:.46,metalness:.9,emissive:v%5===0?Oe.amber:Oe.cyan,emissiveIntensity:v%5===0?.12:.08}),{shadow:!1});q.rotation.y=-D}[2,3,5.5,8.2,12.2].forEach((v,D)=>{let R=J(st,new Gt(v,.009,8,96,Math.PI*(D%2?.42:.58)),ge(397336,{roughness:.52,metalness:.9,emissive:D%2?Oe.cyan:Oe.teal,emissiveIntensity:.035}),[0,.018+D*8e-4,.5],{shadow:!1});R.rotation.x=Math.PI/2,R.rotation.z=D*1.17}),[5.8,10.8,15.6].forEach((v,D)=>{let R=J(st,new Gt(v,.012,12,160),ge(397336,{roughness:.52,metalness:.9,emissive:D===1?Oe.teal:Oe.cyan,emissiveIntensity:D===1?.06:.045}),[0,.016+D*.001,.5],{shadow:!1});R.rotation.x=Math.PI/2});for(let v=0;v<12;v+=1){let D=v/12*Math.PI*2,R=16.2+v%2*.75,W=Math.cos(D)*R,Z=Math.sin(D)*R+.5,q=Q(st,[1.45,.045,.28],[W,.12,Z],ge(v%2===0?725787:462872,{roughness:.52,metalness:.72,emissive:266264,emissiveIntensity:.08}),{shadow:!1});q.rotation.y=-D}for(let v=0;v<26;v+=1){let D=v/26*Math.PI*2,R=18.1+v%2*.5,W=Math.cos(D)*R,Z=Math.sin(D)*R+.5,q=.5+v%5*.18,j=Q(st,[.12,q,.48],[W,.42+q/2,Z],ge(463130,{roughness:.32,metalness:.7,emissive:533295,emissiveIntensity:.32}),{shadow:!1});if(j.rotation.y=-D,v%3===0){let ae=Q(st,[.045,q*.72,.06],[W,.52+q/2,Z],O(v%2?Oe.blue:Oe.cyan,.52),{shadow:!1});ae.rotation.y=-D,ae.userData.kind="rail",ae.userData.phase=v*.27,it.push(ae)}}let $=es({title:"System Status",rows:[["Platform core","Current"],["Process stream","Sampled"]],footer:"Company-scoped view",accent:"#89d9aa",width:250,height:150,scale:.62});$.position.set(-15.3,8.1,-13.8),ai.add($);let G=es({title:"Platform Health",rows:[["Data scope","Company"],["Sample window","Current"],["Access","Member"]],accent:"#72d1c6",width:300,height:190,scale:.72});G.position.set(15.4,7.6,-13.2),ai.add(G);let fe=new Qt;fe.position.set(0,3.5,-12.2),ai.add(fe);let Te=J(fe,new Gt(1.18,.08,12,96),O(Oe.cyan,1.05),[0,0,0],{shadow:!1});Te.userData.kind="rail",Te.userData.phase=2.4,it.push(Te),J(fe,new Ms(.84,48),new Pt({color:529956,transparent:!0,opacity:.88}),[0,0,0],{shadow:!1});let Ce=Ln([C?.[1]||"APP","HEALTH"],{accent:"#dff4ff",scale:.52});Ce.position.set(0,0,.02),fe.add(Ce);let ye=new Qt;ye.position.set(-8.3,0,-7.1),st.add(ye);{J(ye,new At(3.1,3.3,.28,48),ge(Oe.steelDark,{roughness:.4}),[0,.14,0]);let v=J(ye,new Gt(2.95,.05,10,96),O(Oe.cyan,1),[0,.3,0],{shadow:!1});v.rotation.x=Math.PI/2;let D=ge(198669,{roughness:.34,metalness:.96,emissive:202784,emissiveIntensity:.24}),R=ge(463386,{roughness:.3,metalness:.9,emissive:670020,emissiveIntensity:.42}),W={assembled:{x:.61,y:.02,w:.37,h:.37},final:{x:.365,y:.64,w:.245,h:.31},glassLeft:{x:0,y:0,w:.15,h:.19},glassRight:{x:.15,y:0,w:.15,h:.19},topCap:{x:.738,y:0,w:.145,h:.09},coreRing:{x:.47,y:.02,w:.13,h:.13}};[{y:.82,r1:1.42,r2:1.78,h:.18},{y:5.98,r1:1.78,r2:1.42,h:.18},{y:.62,r1:1.9,r2:2.18,h:.12},{y:6.18,r1:2.18,r2:1.9,h:.12}].forEach(({y:N,r1:X,r2:We,h:_e})=>{if(N<3){let ht=J(ye,new At(X,We,_e,72),D.clone(),[0,N,0],{shadow:!1});ht.userData.kind="pulse",ht.userData.phase=N,it.push(ht)}let ke=N>3,pe=J(ye,new Gt((X+We)*.5,ke?.012:.018,8,96),ke?ge(463128,{roughness:.36,metalness:.94,emissive:Oe.cyan,emissiveIntensity:.08}):O(Oe.cyan,.42),[0,N+_e*.52,0],{shadow:!1});pe.rotation.x=Math.PI/2,pe.userData.kind="gyro",pe.userData.speed=N>3?-.06:.08,it.push(pe)});let Z=Ke(ye,[5.45,5.45],[0,3.45,.18],He(W.assembled,{atlas:ie,color:12118256,opacity:.2}));Z.renderOrder=5;let q=Ke(ye,[3.2,4.05],[0,3.28,.28],He(W.final,{atlas:ie,color:8378600,opacity:.14}));q.renderOrder=4,[.58,.98,1.32].forEach((N,X)=>{let We=J(ye,new Gt(N,X===1?.014:.01,8,96),ge(330512,{roughness:.32,metalness:.96,emissive:X===1?Oe.amber:Oe.cyan,emissiveIntensity:X===1?.08:.12}),[0,6.36+X*.04,0],{shadow:!1});We.rotation.x=Math.PI/2,We.userData.kind="gyro",We.userData.speed=X===1?-.04:.05,it.push(We)});let j=Ke(ye,[2.4,2.4],[0,.58,.02],He(W.coreRing,{atlas:ie,color:12449791,opacity:.18}),[-Math.PI/2,0,0]);j.renderOrder=6,[-1,1].forEach(N=>{let X=Ke(ye,[2.2,2.75],[N*1.08,3.7,.34],He(N<0?W.glassLeft:W.glassRight,{atlas:ie,color:10282736,opacity:.12}));X.rotation.z=N*.04,X.renderOrder=3}),[0,Math.PI/2,Math.PI,Math.PI*1.5].forEach((N,X)=>{let We=Math.cos(N)*1.62,_e=Math.sin(N)*1.62,ke=J(ye,new At(.055,.055,5.18,14),R.clone(),[We,3.4,_e],{shadow:!1});ke.userData.kind="pulse",ke.userData.phase=X*.6,it.push(ke);let pe=J(ye,new At(.02,.02,4.76,10),O(Oe.cyan,.55),[We*1.02,3.4,_e*1.02],{shadow:!1});pe.userData.kind="pulse",pe.userData.phase=X*.6+.3,it.push(pe)});let ae=J(ye,new bs(2.55,48,32),new jt({color:10474728,transparent:!0,opacity:.055,roughness:.22,metalness:0,emissive:862259,emissiveIntensity:.16,depthWrite:!1}),[0,3.4,0],{shadow:!1});[0,Math.PI/2,Math.PI,Math.PI*1.5].forEach(N=>{let X=Math.cos(N)*1.08,We=Math.sin(N)*1.08,_e=J(ye,new At(.024,.024,.62,8),D.clone(),[X,6.07,We],{shadow:!1});_e.userData.kind="pulse",_e.userData.phase=N,it.push(_e)}),In(ae,{type:"vault",focusRadius:3.6,ringY:.34,tooltip:["App Health","Measured browser experience and app reliability"],platformTooltip:[l.title||"App Health",l.tooltip||l.badge||"Measured company app health"]});let xe=new Xt(new qo(2.62,1),new Pt({color:3107446,wireframe:!0,transparent:!0,opacity:.18}));xe.position.set(0,3.4,0),xe.userData.kind="coreCage",xe.userData.phase=.4,ye.add(xe),it.push(xe);let Ge=J(ye,new bs(.42,24,16),O(Oe.cyan,1.9),[0,3.4,0],{shadow:!1});Ge.userData.kind="corePulse",Ge.userData.phase=0,it.push(Ge);let Le=J(ye,new At(.05,.09,3,12),new Pt({color:7265535,transparent:!0,opacity:.35,blending:Gn,depthWrite:!1}),[0,1.85,0],{shadow:!1});Le.renderOrder=1,Le.userData.kind="coreBeam",Le.userData.baseOpacity=.22,it.push(Le),[{radius:2.72,tube:.07,rotation:[Math.PI/2,0,0],speed:.35,color:Oe.cyan,intensity:.78},{radius:2.96,tube:.045,rotation:[Math.PI/2.25,0,Math.PI/9],speed:-.22,color:Oe.amber,intensity:.42},{radius:3.16,tube:.045,rotation:[Math.PI/3,0,Math.PI/7],speed:-.18,color:Oe.cyan,intensity:.62},{radius:3.36,tube:.035,rotation:[-Math.PI/4,Math.PI/6,0],speed:.16,color:Oe.blue,intensity:.5}].forEach(({radius:N,tube:X,rotation:We,speed:_e,color:ke,intensity:pe},ht)=>{let St=new Qt,wt=Math.max(.024,X*.52),Bt=wt*1.7;St.position.set(0,3.4,0),ye.add(St),J(St,new Gt(N,wt,14,160),new jt({color:1121314,metalness:.96,roughness:.2,clearcoat:.72,clearcoatRoughness:.16,emissive:ke,emissiveIntensity:.07}),[0,0,0],{shadow:!1}),J(St,new Gt(N-Bt,.007,8,160),O(ke,pe*.58),[0,0,0],{shadow:!1}),J(St,new Gt(N+Bt,.006,8,160),O(ke,pe*.42),[0,0,0],{shadow:!1});let Wt=8,Qn=new ya(.2,.07,Math.max(.055,wt*2.2),3,.014),Dn=ge(5464682,{roughness:.24,metalness:.98,emissive:ke,emissiveIntensity:.18}),cn=new vs(Qn,Dn,Wt),gn=new Qe,Sn=new T,Kt=new Cn,Yt=new T(1,1,1);for(let An=0;An<Wt;An+=1){let Bn=An/Wt*Math.PI*2;Sn.set(Math.cos(Bn)*N,Math.sin(Bn)*N,0),Kt.setFromEuler(new Xn(0,0,Bn+Math.PI/2)),gn.compose(Sn,Kt,Yt),cn.setMatrixAt(An,gn)}cn.instanceMatrix.needsUpdate=!0,cn.castShadow=!1,cn.receiveShadow=!1,St.add(cn),St.rotation.set(...We),St.userData.kind="coreGyro",St.userData.speed=_e,St.userData.phase=ht,[0,Math.PI*.92].forEach((An,Bn)=>{let rs=J(St,new Gt(N,wt*1.25,6,28,Bn?.18:.48),O(Bn?Oe.amber:ke,1.3),[0,0,0],{shadow:!1});rs.rotation.z=An}),it.push(St)}),[{radius:2.76,speed:.16,phase:0,lift:.24,color:Oe.cyan},{radius:3.02,speed:-.11,phase:2.1,lift:-.18,color:Oe.amber},{radius:3.24,speed:.08,phase:4.2,lift:.06,color:Oe.blue}].forEach(N=>{let X=J(ye,new bs(.075,12,8),O(N.color,1.05),[N.radius,3.4+N.lift,0],{shadow:!1});X.userData.kind="coreSatellite",Object.assign(X.userData,N),it.push(X)});let mt=new $i(7265535,18,13,2);mt.position.set(0,3.4,0),mt.userData.kind="coreLight",mt.userData.baseIntensity=18,ye.add(mt),it.push(mt)}let qe=[Oe.cyan,Oe.teal,Oe.blue,Oe.mint,Oe.cyan],Ve=[];{let v={shellA:{x:.018,y:.055,w:.105,h:.58},shellB:{x:.135,y:.055,w:.098,h:.58},shellC:{x:.246,y:.055,w:.102,h:.58},shellD:{x:.424,y:.014,w:.062,h:.414},shellE:{x:.505,y:.014,w:.062,h:.414},lightRail:{x:.424,y:.014,w:.062,h:.414},capTop:{x:.68,y:.018,w:.29,h:.29},capRing:{x:.68,y:.35,w:.29,h:.29},baseStrip:{x:.02,y:.782,w:.31,h:.072},vent:{x:.509,y:.47,w:.056,h:.174}};i.forEach((D,R)=>{let W=-3.8+R*3.05,Z=Tv,q=qe[R%qe.length],j=new Qt;j.position.set(W,0,-8.15),st.add(j),J(j,new At(1.12,1.26,.2,36),ge(Oe.steelDark,{roughness:.38}),[0,.1,0]);let ae=J(j,new Gt(.98,.035,10,64),O(q,1),[0,.22,0],{shadow:!1});ae.rotation.x=Math.PI/2;let xe=.32+Z/2,Ge=Math.max(.8,Z*.9),Le=J(j,new At(.755,.755,Ge+.12,56,1,!0),ge(132875,{roughness:.52,metalness:.94,emissive:67338,emissiveIntensity:.08}),[0,xe,0],{shadow:!1});Le.userData.kind="closedSiloSkin",[{rect:v.shellA,angle:-.48,w:.44,lift:0},{rect:v.shellB,angle:0,w:.48,lift:.02},{rect:v.shellC,angle:.48,w:.44,lift:0},{rect:v.shellD,angle:-.88,w:.26,lift:.02},{rect:v.shellE,angle:.88,w:.26,lift:.02}].forEach((wt,Bt)=>{let Wt=Dt(j,wt.rect,{angle:wt.angle,radius:.785,y:xe+wt.lift,width:wt.w,height:Ge,atlas:Ye,emissive:q,emissiveIntensity:Bt===1?.18:.14});Wt.userData.kind="closedSiloSkin"}),[{y:xe+Ge/2+.02,h:.16,rTop:.86,rBottom:.82},{y:xe-Ge/2-.02,h:.16,rTop:.82,rBottom:.9}].forEach(({y:wt,h:Bt,rTop:Wt,rBottom:Qn})=>{let Dn=J(j,new At(Wt,Qn,Bt,56),ge(198669,{roughness:.38,metalness:.94,emissive:135190,emissiveIntensity:.14}),[0,wt,0],{shadow:!1});Dn.userData.kind="closedSiloSkin";let cn=J(j,new Gt((Wt+Qn)*.5,.011,8,72),O(q,.36),[0,wt+Bt*.5+.006,0],{shadow:!1});cn.rotation.x=Math.PI/2,cn.userData.kind="closedSiloSkin"}),[-.72,-.24,.24,.72].forEach((wt,Bt)=>{let Wt=Dt(j,Bt%2?v.vent:v.baseStrip,{angle:wt,radius:.835,y:xe,width:.08,height:Ge+.06,atlas:Ye,emissive:Bt%2?q:Oe.amber,emissiveIntensity:Bt%2?.26:.16,trim:!0});Wt.userData.kind="closedSiloSkin"}),[-1.12,1.12].forEach((wt,Bt)=>{let Wt=Dt(j,v.lightRail,{angle:wt,radius:.81,y:xe,width:.16,height:Ge*.88,atlas:Ye,emissive:q,emissiveIntensity:.38});Wt.userData.kind="closedSiloSkin";let Qn=Dt(j,Bt?v.vent:v.baseStrip,{angle:wt,radius:.825,y:.44+Z*.16,width:.2,height:.38,atlas:Ye,emissive:Oe.amber,emissiveIntensity:.18,trim:!1});Qn.userData.kind="closedSiloSkin"});let mt=J(j,new At(.74,.74,Z,32),new jt({color:13625842,transparent:!0,opacity:.08,roughness:.08,metalness:0,emissive:1323580,emissiveIntensity:.24,depthWrite:!1}),[0,.32+Z/2,0],{shadow:!1});In(mt,{type:"bucket",bucket:D,index:R,color:q,revealHeight:Z,focusRadius:1.5,ringY:.28,tooltip:[D.title,`${D.valueLabel||o(D.size)} \xB7 ${D.files} ${D.itemLabel||(D.files===1?"signal":"signals")}`]});let N=J(j,new At(.13,.16,Math.max(.2,Z-.52),24),new Pt({color:q,transparent:!0,opacity:.2,blending:Gn,depthWrite:!1}),[0,.32+Z/2,0],{shadow:!1});N.userData.kind="pulse",N.userData.phase=R*.7,it.push(N);let We=xe+Ge/2+.02+.08+.065,_e=J(j,new At(.86,.9,.13,40),ge(462872,{roughness:.42,metalness:.82,emissive:400162,emissiveIntensity:.22}),[0,We,0],{shadow:!1});_e.userData.kind="closedSiloSkin";let ke=J(j,new Ms(.76,56),de(R%2?v.capRing:v.capTop,{atlas:Ye,emissive:q,emissiveIntensity:.18,metalness:.82,roughness:.36,side:$t}),[0,We+.071,0],{shadow:!1});ke.rotation.x=-Math.PI/2,ke.userData.kind="closedSiloSkin";let pe=Ke(j,[1.36,.24],[0,.28,.78],de(v.baseStrip,{atlas:Ye,emissive:q,emissiveIntensity:.18,metalness:.82,roughness:.36,side:$t}));pe.userData.kind="closedSiloSkin";let ht=J(j,new Gt(1,.02,8,64),O(q,.85),[0,.32+Z*.72,0],{shadow:!1});ht.rotation.x=Math.PI/2,ht.userData.kind="spin",ht.userData.speed=.5+R*.12,it.push(ht);let St=J(j,new At(.82,.82,.09,24),new Pt({color:q,transparent:!0,opacity:.24,blending:Gn,depthWrite:!1}),[0,.58+Z*.46,0],{shadow:!1});St.userData.kind="scanBand",St.userData.phase=R*.65,St.userData.baseY=St.position.y,St.userData.span=Z*.42,it.push(St),Ve.push(mt)})}let Be=Ve.map((v,D)=>{let R=v.parent.position.x,W=-4+D*.19;return new oa([new T(-8.3,.055,-4.3),new T(-6,.055,W),new T(R-.45,.055,W),new T(R,.055,-6.9)])});Be.forEach((v,D)=>{let R=new Wi(new Ot().setFromPoints(v.getPoints(64)),new Gi({color:qe[D],transparent:!0,opacity:.24}));st.add(R)});let ut=new vs(new hi(.32,.018,.055),new Pt({color:Oe.cyan,transparent:!0,opacity:.64,toneMapped:!1}),Be.length*3);ut.instanceMatrix.setUsage(If),ut.frustumCulled=!1,st.add(ut);let Ut=new Qe,Nt=new T,fn=new T,yt=new Cn,Ue=new T(1,1,1),nn=new T(1,0,0),xt=[],pn=[];{let v={"Equipment files":Oe.blue,"Order throughput":Oe.teal,"Request photos":Oe.mint,"Part files":Oe.blue,"Company logos":Oe.cyan},D={tops:[{x:.015,y:.016,w:.313,h:.307},{x:.344,y:.016,w:.312,h:.307},{x:.671,y:.016,w:.312,h:.307}],faces:[{x:.015,y:.016,w:.313,h:.307},{x:.344,y:.016,w:.312,h:.307},{x:.671,y:.016,w:.312,h:.307},{x:.015,y:.344,w:.313,h:.313},{x:.344,y:.344,w:.312,h:.313},{x:.671,y:.344,w:.312,h:.313}],sides:[{x:.018,y:.687,w:.382,h:.055},{x:.018,y:.748,w:.382,h:.055},{x:.418,y:.688,w:.032,h:.19},{x:.61,y:.688,w:.032,h:.19},{x:.75,y:.688,w:.045,h:.19}],rails:[{x:.018,y:.687,w:.382,h:.055},{x:.018,y:.748,w:.382,h:.055},{x:.017,y:.823,w:.382,h:.044}]};a.slice(0,10).forEach((R,W)=>{let Z=W,q=0,j=Z-4.5,ae=j*2.24,xe=5.95+Math.abs(j)*.06,Ge=.82,Le=.72+Math.min(R.size/(2.1*1024*1024),1)*.32,mt=v[R.bucket]??Oe.cyan;J(st,new At(.54,.62,.08,28),ge(Oe.steelDark,{roughness:.46,emissive:266520,emissiveIntensity:.1}),[ae,.04,xe]);let N=J(st,new Gt(.48,.014,8,56),ge(397336,{roughness:.46,metalness:.9,emissive:mt,emissiveIntensity:.24}),[ae,.09,xe],{shadow:!1});N.rotation.x=Math.PI/2;let X=Q(st,[Le+.46,1.16,.68],[ae,Ge,xe],new jt({color:329997,roughness:.23,metalness:.92,emissive:133389,emissiveIntensity:.22,clearcoat:.55,clearcoatRoughness:.26}));X.rotation.y=-j*.035,X.userData.bob=.012,In(X,{type:"file",file:R,index:W,focusRadius:.95,ringY:.16,tooltip:[R.equipment,`${R.name} \xB7 ${R.valueLabel||o(R.size)}`]});let We=new Mr(new Xo(new hi(Le+.49,1.19,.72)),new Gi({color:Oe.mint,transparent:!0,opacity:0,toneMapped:!1}));X.add(We),X.userData.selectionOutline=We;let _e=.38,ke=-.38,pe=ge(659220,{roughness:.3,metalness:.92,emissive:133131,emissiveIntensity:.22}),ht=ge(198411,{roughness:.42,metalness:.94,emissive:66308,emissiveIntensity:.1}),St=ge(462872,{roughness:.36,metalness:.88,emissive:133390,emissiveIntensity:.18}),wt=new jt({color:200729,transparent:!0,opacity:.8,roughness:.05,metalness:.35,emissive:339006,emissiveIntensity:1.05,clearcoat:.8,clearcoatRoughness:.08,depthWrite:!1});[[0,.53,_e+.015,Le*.96,.12],[0,-.53,_e+.015,Le*.96,.12],[-Le*.58,0,_e+.016,.12,.86],[Le*.58,0,_e+.016,.12,.86]].forEach(([Kt,Yt,An,Bn,rs])=>{Q(X,[Bn,rs,.09],[Kt,Yt,An],pe,{shadow:!1})});let Bt=Q(X,[Le+.04,1,.045],[.05,0,_e+.044],wt,{shadow:!1});Bt.renderOrder=2;let Wt=D.faces[W%D.faces.length],Qn=D.sides[W%D.sides.length],Dn=D.tops[(W+q)%D.tops.length],cn=D.rails[W%D.rails.length],gn=(Le+.46)/2+.014,Sn=1.16/2+.01;[[-1,1],[1,1],[-1,-1],[1,-1]].forEach(([Kt,Yt])=>{Q(X,[.18,1.12,.16],[Kt*gn,0,Yt*.31],ht,{shadow:!1})}),[[0,Sn,.31,Le+.2,.09,.12],[0,-Sn,.31,Le+.2,.09,.12],[0,Sn,-.31,Le+.14,.09,.12],[0,-Sn,-.31,Le+.14,.09,.12]].forEach(([Kt,Yt,An,Bn,rs,Ep])=>{Q(X,[Bn,rs,Ep],[Kt,Yt,An],ht,{shadow:!1})}),Ke(X,[Le+.02,.96],[0,0,_e+.126],de(Wt,{emissiveIntensity:.42})),Ke(X,[Le+.04,.98],[0,0,ke-.011],de(D.faces[(W+3)%D.faces.length],{emissiveIntensity:.22}),[0,Math.PI,0]),Ke(X,[.58,.94],[gn,0,0],de(Qn,{emissiveIntensity:.18}),[0,Math.PI/2,0]),Ke(X,[.58,.94],[-gn,0,0],de(D.sides[(W+1)%D.sides.length],{emissiveIntensity:.16}),[0,-Math.PI/2,0]),Ke(X,[Le+.08,.66],[0,.592,0],de(Dn,{emissiveIntensity:.32}),[-Math.PI/2,0,0]),Ke(X,[Le+.02,.62],[0,-.592,0],de(cn,{emissiveIntensity:.25}),[Math.PI/2,0,0]),[[0,.46,_e+.15,Le*.7,.036],[0,-.46,_e+.15,Le*.7,.036],[-Le*.49,0,_e+.152,.036,.66],[Le*.49,0,_e+.152,.036,.66]].forEach(([Kt,Yt,An,Bn,rs])=>{Q(X,[Bn,rs,.028],[Kt,Yt,An],O(mt,1.35),{shadow:!1})}),[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([Kt,Yt],An)=>{Q(X,[.2,.2,.105],[Kt*(Le*.54),Yt*.44,_e+.145],St,{shadow:!1}),Q(X,[.052,.052,.034],[Kt*(Le*.54),Yt*.44,_e+.205],O(An%2?Oe.blue:Oe.cyan,.9),{shadow:!1})}),[-.39,.39].forEach((Kt,Yt)=>{Q(X,[Le*.9,.07,.09],[0,Kt,ke-.02],ge(329740,{roughness:.38,metalness:.9,emissive:133133,emissiveIntensity:.18}),{shadow:!1}),Q(X,[Le*.26,.034,.058],[Yt?Le*.24:-Le*.26,Kt,ke-.075],O(mt,.9),{shadow:!1})}),[[-Le*.53,-.08],[Le*.54,.18],[Le*.02,.49]].forEach(([Kt,Yt])=>{Q(X,[.04,.13,.04],[Kt,Yt,_e+.12],O(Oe.amber,.78),{shadow:!1})}),pn.push(X)})}let fi=A.filter(([v])=>["Data stored","Records monitored"].includes(v)),mn=es({title:"Data Footprint",rows:fi.length?fi:[["Data stored","Pending"],["Records monitored","Pending"]],accent:"#72d1c6",width:330,height:180,scale:.72});mn.position.set(-14.8,-.3,14.2),ai.add(mn);let Rs=es({title:"Process Today",rows:c.map(v=>[v.label,v.value]),accent:"#6edcff",width:330,height:180,scale:.72});Rs.position.set(14.6,-.3,14.2),ai.add(Rs),V.add(new jo(10472672,463131,.56));let zt=new Ki(11850980,.34);zt.position.set(4,7,22),V.add(zt),z=new Ki(13756664,1.35),z.position.set(-10,18,12),z.castShadow=!0,z.shadow.mapSize.set(H.shadowSize,H.shadowSize),z.shadow.camera.left=-26,z.shadow.camera.right=26,z.shadow.camera.top=26,z.shadow.camera.bottom=-26,z.shadow.bias=-4e-4,V.add(z);let Jn=new Ki(8220927,.72);Jn.position.set(14,9,-14),V.add(Jn);let Cs=new $i(9034154,7.5,13,2);Cs.position.set(0,3.1,6.6),V.add(Cs);let Mn=new $i(6277592,11,18,2);Mn.position.set(1,5.4,-3.6),V.add(Mn);function Ps(v,D){let R=new Xt(new Yo(.86,1,56),new Pt({color:v,transparent:!0,opacity:D,side:$t,depthWrite:!1}));return R.rotation.x=-Math.PI/2,R.visible=!1,st.add(R),R}let is=Ps(7265535,.9),Cr=Ps(12576494,.4),ss=null;function Au(v,D){let R=D.userData.payload,W=new T;D.getWorldPosition(W),v.position.set(W.x,R.ringY??.05,W.z);let Z=R.focusRadius??1;v.scale.set(Z,Z,1),v.visible=!0}function lp(v){let D=it.indexOf(v);D>=0&&it.splice(D,1)}function El(){if(!ss)return;(ss.userData.restoreColumnState??[]).forEach(W=>{W.object.visible=W.visible,W.materials.forEach(Z=>{Z.material.transparent=Z.transparent,Z.material.opacity=Z.opacity,Z.material.depthWrite=Z.depthWrite})});let v=new Set,D=new Set,R=new Set;ss.traverse(W=>{lp(W),W.geometry&&v.add(W.geometry),Ru(W).forEach(({material:Z})=>{D.add(Z),Z.map&&R.add(Z.map),Z.emissiveMap&&R.add(Z.emissiveMap)})}),v.forEach(W=>W.dispose()),D.forEach(W=>W.dispose()),R.forEach(W=>W.dispose()),st.remove(ss),ss=null}function Ru(v){return(Array.isArray(v.material)?v.material:v.material?[v.material]:[]).map(R=>({material:R,transparent:R.transparent,opacity:R.opacity,depthWrite:R.depthWrite}))}function cp(v,D){(Array.isArray(v.material)?v.material:v.material?[v.material]:[]).forEach(W=>{W.transparent=!0,W.opacity=D,W.depthWrite=!1})}function Cu(v,D){v.traverse(R=>{(Array.isArray(R.material)?R.material:R.material?[R.material]:[]).forEach(D)})}function wa(v,D){Cu(v,R=>{R.transparent=!0,R.opacity=D,R.depthWrite=!1})}function Pu(v,D){Cu(v,R=>{"emissiveIntensity"in R&&(R.emissiveIntensity=D)})}function hp(v,D){let R=[],W=v.parent;W&&(W.traverse(Z=>{let q=Z.userData.kind==="closedSiloSkin",j=Z===v||Z.userData.kind==="scanBand"||Z.userData.kind==="pulse";if(!(!q&&!j)){if(R.push({object:Z,visible:Z.visible,materials:Ru(Z)}),q){Z.visible=!1;return}cp(Z,Z===v?.025:.06)}}),D.userData.restoreColumnState=R)}function oi(v,D,R={}){return v.userData.kind=D,Object.assign(v.userData,R),"baseOpacity"in R&&wa(v,R.baseOpacity),D==="bucketRevealDoor"&&wa(v,R.baseOpacity??0),it.push(v),v}function up(v,D){El();let R=new T;v.getWorldPosition(R);let W=D.bucket,Z=D.color??Oe.cyan,q=D.revealHeight??2.5,j=pt.elapsedTime,ae=new Qt;ae.position.set(R.x,0,R.z),st.add(ae),ss=ae,hp(v,ae);let xe={chamber:{x:.337,y:.014,w:.314,h:.557},closed:{x:.012,y:.014,w:.31,h:.327},leftDoor:{x:.012,y:.348,w:.31,h:.226},rightDoor:{x:.671,y:.014,w:.314,h:.327},tallRail:{x:.012,y:.586,w:.094,h:.293},curvedWingA:{x:.313,y:.588,w:.104,h:.246},curvedWingB:{x:.424,y:.588,w:.104,h:.246},curvedWingC:{x:.535,y:.588,w:.104,h:.246},roundCap:{x:.716,y:.604,w:.228,h:.228}},Ge=ge(198411,{roughness:.4,metalness:.94,emissive:133389,emissiveIntensity:.14}),Le=de(xe.chamber,{atlas:ze,emissive:Z,emissiveIntensity:.22,metalness:.64,roughness:.38,side:$t,opacity:.92}),mt=Ke(ae,[1.7,q*.98],[0,.36+q/2,-.22],Le,[0,0,0]);mt.renderOrder=2,oi(mt,"bucketRevealPanel",{born:j,baseOpacity:0,targetOpacity:1,delay:.05});let N=J(ae,new At(.9,.98,.12,40),Ge,[0,.66+q,-.02],{shadow:!1});oi(N,"bucketRevealPanel",{born:j,baseOpacity:.2,targetOpacity:1,delay:.02});let X=J(ae,new At(.92,1.02,.14,40),Ge.clone(),[0,.28,-.02],{shadow:!1});oi(X,"bucketRevealPanel",{born:j,baseOpacity:.2,targetOpacity:1,delay:.02}),[{y:.57+q,w:1.58,h:.14,z:.31,delay:.04},{y:.38,w:1.66,h:.14,z:.33,delay:.07}].forEach(({y:_e,w:ke,h:pe,z:ht,delay:St})=>{let wt=Q(ae,[ke,pe,.18],[0,_e,ht],ge(198669,{roughness:.38,metalness:.94,emissive:135190,emissiveIntensity:.18}),{shadow:!1});wt.renderOrder=6,oi(wt,"bucketRevealPanel",{born:j,baseOpacity:0,targetOpacity:1,delay:St})}),[{x:-.86,y:.42+q/2},{x:.86,y:.42+q/2}].forEach(({x:_e,y:ke})=>{let pe=Q(ae,[.12,q*.82,.16],[_e,ke,.34],ge(132618,{roughness:.44,metalness:.94,emissive:135190,emissiveIntensity:.16}),{shadow:!1});pe.renderOrder=6,oi(pe,"bucketRevealPanel",{born:j,baseOpacity:0,targetOpacity:1,delay:.08})}),[-1,1].forEach(_e=>{let ke=_e<0?xe.leftDoor:xe.rightDoor,pe=Dt(ae,ke,{angle:0,radius:0,y:0,width:.58,height:q*.88,atlas:ze,emissive:Z,emissiveIntensity:.34});pe.position.set(_e*.36,.34+q/2,.22),oi(pe,"bucketRevealDoor",{born:j,startX:_e*.36,targetX:_e*1.05,targetRotZ:_e*.045,baseOpacity:0,targetOpacity:1,startRotY:0,targetRotY:-_e*.35,phase:_e});let ht=Dt(ae,xe.tallRail,{angle:0,radius:0,y:0,width:.14,height:q*.78,atlas:ze,emissive:Z,emissiveIntensity:.42});ht.position.set(_e*.72,.4+q/2,.3),oi(ht,"bucketRevealDoor",{born:j,startX:_e*.72,targetX:_e*.9,targetRotZ:_e*.035,baseOpacity:0,targetOpacity:1,startRotY:0,targetRotY:-_e*.1,phase:_e*1.8})}),[{rect:xe.curvedWingA,side:-1,y:.42+q*.33,z:.36,width:.28},{rect:xe.curvedWingB,side:1,y:.42+q*.33,z:.36,width:.28},{rect:xe.curvedWingC,side:-1,y:.44+q*.58,z:.33,width:.22},{rect:xe.curvedWingC,side:1,y:.44+q*.58,z:.33,width:.22}].forEach((_e,ke)=>{let pe=Dt(ae,_e.rect,{angle:0,radius:0,y:0,width:Math.max(.12,_e.width-.08),height:q*.28,atlas:ze,emissive:Z,emissiveIntensity:.22});pe.position.set(_e.side*.48,_e.y,_e.z),pe.rotation.y=_e.side*.03,oi(pe,"bucketRevealDoor",{born:j,startX:pe.position.x,targetX:_e.side*(.66+(ke>1?.08:0)),targetRotZ:_e.side*.025,baseOpacity:0,targetOpacity:.96,startRotY:0,targetRotY:-_e.side*.08,phase:ke+.4})});let We=J(ae,new At(.035,.05,q*.82,18),new Pt({color:Z,transparent:!0,opacity:0,blending:Gn,depthWrite:!1}),[0,.4+q/2,.42],{shadow:!1});oi(We,"bucketRevealPanel",{born:j,baseOpacity:0,targetOpacity:.48,delay:.12}),y({eyebrow:W.eyebrow||`Major app systems / ${String(D.index+1).padStart(2,"0")} of ${String(i.length).padStart(2,"0")}`,title:W.title,subtitle:W.subtitle||"Platform operating system",badge:W.badge||`${W.files} signals`,rows:W.rows||[["Current volume",W.valueLabel||o(W.size)],["Tracked signals",String(W.files)],["Operating state","Current"],["Coverage","Company scoped"]],footer:W.footer||"Maintain Ops platform index",status:W.status||"Current",accent:"#6edcff",width:520,height:310,scale:.74});for(let _e=0;_e<12;_e+=1){let ke=_e/12*Math.PI*2,pe=_t(ae,[0,.72+q*.42,.1],[Math.cos(ke)*(1.15+_e%3*.34),q+.5+Math.sin(_e)*.5,.7+Math.sin(ke)*.4],Z,{phase:_e*.08,speed:.58,size:.055});pe.userData.born=j,pe.userData.lifespan=1.4}}function dp(v,D,R,W,Z=10){let q=pt.elapsedTime;for(let j=0;j<Z;j+=1){let ae=j/Z*Math.PI*2,xe=_t(v,[0,R,.12],[Math.cos(ae)*(.9+j%3*.25),W+Math.sin(j)*.34,.7+Math.sin(ae)*.34],D,{phase:j*.08,speed:.54,size:.05});xe.userData.born=q,xe.userData.lifespan=1.25}}function Tl(v,{eyebrow:D,title:R,subtitle:W,badge:Z,rows:q,footer:j,status:ae,color:xe=Oe.cyan,cardY:Ge=2.4,cardZ:Le=.9,cardWidth:mt=520,cardHeight:N=310,cardScale:X=.74}){El();let We=new T;v.getWorldPosition(We);let _e=pt.elapsedTime,ke=new Qt;ke.position.set(We.x,0,We.z),st.add(ke),ss=ke;let pe=J(ke,new Gt(.78,.028,8,64),O(xe,1),[0,.28,0],{shadow:!1});pe.rotation.x=Math.PI/2,oi(pe,"revealAperture",{born:_e,baseScale:.35,targetScale:1.45}),y({eyebrow:D,title:R,subtitle:W,badge:Z,rows:q,footer:j,status:ae,accent:xe===Oe.mint?"#89d9aa":"#6edcff",width:mt,height:N,scale:X}),dp(ke,xe,.42,Ge-.35,10)}function fp(v,D){let R=D.month,W=R.valueLabel||(R.added?o(R.added):"0 B"),Z=r.slice(0,D.index+1).reduce((j,ae)=>j+ae.added,0),q=100*1024*1024*1024-Z;Tl(v,{eyebrow:R.eyebrow||`Activity runway / ${String(D.index+1).padStart(2,"0")} of ${String(r.length).padStart(2,"0")}`,title:R.label,subtitle:R.subtitle||"Platform activity window",badge:R.badge||(R.added?"Activity":"Quiet"),rows:R.rows||[["Recorded activity",W],["Cumulative activity",o(Z)],["Runway window","14 days"],["Pattern",R.added?"Above baseline":"No activity"]],footer:R.footer||"Company activity runway",status:R.status||"Tracked",color:R.added?Oe.blue:Oe.teal,cardY:3.05,cardZ:.95})}function pp(v,D){let R=D.file,Z=[...a].sort((j,ae)=>ae.size-j.size||a.indexOf(j)-a.indexOf(ae)).indexOf(R)+1,q=R.name.includes(".")?R.name.split(".").pop().toUpperCase():"FILE";Tl(v,{eyebrow:R.eyebrow||"Current notable signal",title:R.name,subtitle:R.subtitle||`${R.bucket} / ${R.category}`,badge:R.badge||`Rank ${String(Z).padStart(2,"0")} of ${a.length}`,rows:R.rows||[["Signal value",R.valueLabel||o(R.size)],["System",R.bucket],["Source",R.equipment],["Signal type",q]],footer:R.footer||"Platform signal index",status:R.status||"Current",color:Oe.mint,cardY:3.25,cardZ:.95,cardWidth:560,cardHeight:314,cardScale:.72})}function mp(v){Tl(v,{eyebrow:l.eyebrow||"Maintain Ops / App Health",title:l.title||"App Health",subtitle:l.subtitle||"Measured company app health",badge:l.badge||"Current",rows:l.rows||[["Health score","Collecting"],["Signals measured","0/0"],["Page load","Collecting"],["Responsiveness","Collecting"]],footer:l.footer||"Maintain Ops command core",status:l.status||"Current",color:Oe.cyan,cardY:6.55,cardZ:1.45,cardWidth:540,cardHeight:310,cardScale:.8})}function Is(v,{silent:D=!1}={}){let R=v.userData.payload;Se=v,Au(is,v);let W=new T;if(v.getWorldPosition(W),R.type==="bucket"){Xe="buckets";let Z=R.revealHeight??2.5,q=Math.max(1.9,Z*.65+.9);Re(W.clone().add(new T(.7,q+2.8,12.4)),W.clone().add(new T(0,.35,.35)),1.5),up(v,R),h(di.buckets),D||u(R.bucket,R.index)}else R.type==="month"?(Xe="timeline",Re(W.clone().add(new T(0,3.4,5.6)),W.clone().add(new T(0,.3,0)),1.5),fp(v,R),h(di.timeline),D||d(R.month,R.index)):R.type==="file"?(Xe="files",Re(W.clone().add(new T(.35,3.65,9)),W.clone().add(new T(0,.15,0)),1.5),pp(v,R),h(di.files),D||f(R.file,R.index)):R.type==="vault"&&(Xe="vault",Re(W.clone().add(new T(-6.8,3.2,12)),W.clone().add(new T(0,1.15,.1)),1.6),mp(v),h(di.vault),D||g())}function Al(){Se=null,y(null),is.visible=!1,El()}function gp(v){Al(),di[v]||(v="overview"),$e(v)}let Iu=Object.freeze({mouse:6,pen:10,touch:44}),_p=Object.freeze({bucket:58,file:40,month:42,vault:72}),et={active:!1,moved:!1,pointerId:null,pointerType:"mouse",lastGesture:"idle",x:0,y:0,startX:0,startY:0},Ls=new T,Ds="none",yp=Object.freeze({bucket:[56,116],file:[52,88],month:[52,92],vault:[120,144]}),xp=window.matchMedia("(pointer: coarse), (hover: none)");function Lu(v){let R=(Array.isArray(v.tooltip)?v.tooltip:[]).find(W=>typeof W=="string"&&W.trim());return R?`Open ${R}`:`Open ${v.type||"performance object"}`}let Pr=t?U.map(v=>{let D=v.userData.payload||{},[R,W]=yp[D.type]||[80,80],Z=document.createElement("button");return Z.type="button",Z.className="spatial-touch-target",Z.dataset.spatialType=D.type||"object",D.index!==void 0&&(Z.dataset.spatialIndex=String(D.index)),Z.setAttribute("aria-label",Lu(D)),Z.style.setProperty("--spatial-touch-width",`${R}px`),Z.style.setProperty("--spatial-touch-height",`${W}px`),Z.addEventListener("click",q=>{q.preventDefault(),q.stopPropagation(),et.lastGesture="tap",Ds="touch-dom",Is(v)}),t.append(Z),{button:Z,object:v,projection:new T}}):[],Du=0;function Uu(v=!1){if(!xp.matches)return;let D=performance.now();if(!v&&ne.t>=1&&!et.active&&D-Du<250)return;Du=D;let R=ne.t>=1;Pr.forEach(({button:W,object:Z,projection:q})=>{Z.getWorldPosition(q),q.project(se);let j=q.z>=-1&&q.z<=1&&q.x>=-1.08&&q.x<=1.08&&q.y>=-1.08&&q.y<=1.08;W.hidden=!j,j&&(W.disabled=!R,W.style.left=`${(q.x+1)*50}%`,W.style.top=`${(1-q.y)*50}%`,W.style.zIndex=String(Math.round((1-q.z)*1e3)))})}function vp(v){return Iu[v]||Iu.mouse}function Mp(v){if(Number.isInteger(v))try{e.hasPointerCapture(v)&&e.releasePointerCapture(v)}catch{}}function Nu(v){Mp(et.pointerId),et.active=!1,et.moved=!1,et.pointerId=null,et.lastGesture=v}function Ea(){Ds="miss",Al(),$e("overview")}function Ou(v,D,R=!1){oe.x=v/window.innerWidth*2-1,oe.y=-(D/window.innerHeight)*2+1,ce.setFromCamera(oe,se);let W=ce.intersectObjects(U,!1)[0]?.object??null;if(W)return Ds="raycast",W;if(!R)return Ds="miss",null;let Z=null,q=1/0;return U.forEach(j=>{if(j.getWorldPosition(Ls),Ls.project(se),Ls.z<-1||Ls.z>1)return;let ae=(Ls.x+1)*.5*window.innerWidth,xe=(1-Ls.y)*.5*window.innerHeight,Ge=_p[j.userData.payload?.type]??36,Le=Math.hypot(v-ae,D-xe);Le>Ge||Le>=q||(Z=j,q=Le)}),Ds=Z?"touch-nearest":"miss",Z}function Sp(){n&&(n.hidden=!0)}window.addEventListener("pointermove",v=>{if(oe.x=v.clientX/window.innerWidth*2-1,oe.y=-(v.clientY/window.innerHeight)*2+1,Fe.x=v.clientX,Fe.y=v.clientY,Fe.overCanvas=v.target===e,et.active&&(et.pointerId===null||v.pointerId===et.pointerId)){let R=v.clientX-et.x,W=v.clientY-et.y;Math.hypot(v.clientX-et.startX,v.clientY-et.startY)>vp(et.pointerType)&&(et.moved=!0),et.moved&&(ne.yaw=dn.clamp(ne.yaw-R*.0017,-.16,.16),ne.pitch=dn.clamp(ne.pitch+W*.0012,-.08,.1)),et.x=v.clientX,et.y=v.clientY}}),window.addEventListener("pointerdown",v=>{if(!(v.target!==e||v.isPrimary===!1)&&(et.active=!0,et.moved=!1,et.pointerId=Number.isInteger(v.pointerId)?v.pointerId:null,et.pointerType=v.pointerType||"mouse",et.lastGesture="pending",et.x=v.clientX,et.y=v.clientY,et.startX=v.clientX,et.startY=v.clientY,et.pointerId!==null))try{e.setPointerCapture(et.pointerId)}catch{}}),window.addEventListener("pointerup",v=>{if(!et.active||et.pointerId!==null&&v.pointerId!==et.pointerId)return;let D=et.moved,R=et.pointerType;if(Nu(D?"drag":"tap"),D)return;if(R==="touch"&&Pr.length){Ea();return}let W=Ou(v.clientX,v.clientY,R==="touch");W?Is(W):Ea()}),window.addEventListener("pointercancel",v=>{if(!et.active||et.pointerId!==null&&v.pointerId!==et.pointerId)return;let D=et.pointerType==="touch"&&!et.moved,R=et.x,W=et.y;if(Nu(D?"tap":"cancel"),!D)return;if(Pr.length){Ea();return}let Z=Ou(R,W,!0);Z?Is(Z):Ea()}),window.addEventListener("resize",()=>{se.aspect=window.innerWidth/window.innerHeight,se.updateProjectionMatrix(),ct(),B.setPixelRatio(te()),B.setSize(window.innerWidth,window.innerHeight),be.setSize(window.innerWidth,window.innerHeight),Uu(!0),Se||$e(Xe,.8)});let Rl=0;e.addEventListener("webglcontextlost",v=>{v.preventDefault(),Rl+=1,m({contextLosses:Rl,qualityTier:L.effective})}),se.aspect=window.innerWidth/window.innerHeight,se.updateProjectionMatrix(),It(L.preference),$e("overview",.01);let Ta={sampled:0,nonBlack:0,range:0},Fu=!1,bp=new URLSearchParams(window.location.search).has("qa_bust")||new URLSearchParams(window.location.search).has("lfes_canvas_probe");function wp(){let v=B.getContext(),D=Math.min(32,v.drawingBufferWidth),R=Math.min(32,v.drawingBufferHeight),W=new Uint8Array(D*R*4);try{v.readPixels(Math.max(0,Math.floor((v.drawingBufferWidth-D)/2)),Math.max(0,Math.floor((v.drawingBufferHeight-R)/2)),D,R,v.RGBA,v.UNSIGNED_BYTE,W)}catch{return Ta}let Z=0,q=255,j=0;for(let ae=0;ae<W.length;ae+=4){let xe=Math.round((W[ae]+W[ae+1]+W[ae+2])/3);xe>4&&(Z+=1),q=Math.min(q,xe),j=Math.max(j,xe)}return Ta={sampled:D*R,nonBlack:Z,range:j-q},Ta}window.__STORAGE_WORLD_DEBUG=()=>({motion:{enabled:je(),reduced:Lt.matches,elapsed:pt.elapsedTime,renderedFrames:I,snapshotUpdates:w},data:{buckets:i.map(v=>v.valueLabel),files:a.map(v=>v.valueLabel),core:l.badge},zone:Xe,selected:Se?.userData?.payload?{type:Se.userData.payload.type,index:Se.userData.payload.index??null}:null,pointerActive:et.active,pointerGesture:et.lastGesture,lastPickMode:Ds,touchTargetCount:Pr.length,targets:U.map(v=>{let D=new T;return v.getWorldPosition(D),D.project(se),{type:v.userData.payload?.type||"",index:v.userData.payload?.index??null,x:Math.round((D.x+1)*.5*window.innerWidth),y:Math.round((1-D.y)*.5*window.innerHeight)}}),cameraPos:se.position.toArray().map(v=>Number(v.toFixed(2))),baseLook:ne.baseLook.toArray().map(v=>Number(v.toFixed(2))),travelT:Number(ne.t.toFixed(2)),quality:{...L},renderer:{drawCalls:B.info.render.calls,triangles:B.info.render.triangles,geometries:B.info.memory.geometries,textures:B.info.memory.textures,drawingWidth:B.domElement.width,drawingHeight:B.domElement.height,pixels:Ta}});let Bu=0,Cl=performance.now(),Pi=0,Aa=0,Ra=0,ku=!1,zu=!1;function Hu(v=performance.now()){Bu=0,Cl=v,Pi=0,Aa=0,Ra=0}document.addEventListener("visibilitychange",()=>{Hu(),De.reset()});function Pl(){De.reset(),Hu(),S({enabled:je(),reduced:Lt.matches})}Lt.addEventListener("change",Pl),["pointermove","pointerdown","pointerup","pointercancel","wheel","resize","keydown"].forEach(v=>window.addEventListener(v,le,{passive:!0})),Pl();function Vu(v=performance.now()){requestAnimationFrame(Vu);let D=je();ee||le();let R=De.tick(v,{hidden:document.hidden,enabled:D,fps:H.targetFps});if(!R)return;let Z=1e3/H.targetFps,q=R.frameMs;Bu=v;let j=R.delta,ae=pt.elapsedTime=R.elapsed,xe=(N,X,We=0)=>D?ep(dn.clamp((ae-N.userData.born-We)/X,0,1)):1,Ge=null;Fe.overCanvas&&!et.active&&(ce.setFromCamera(oe,se),Ge=ce.intersectObjects(U,!1)[0]?.object??null),ve!==Ge&&(ve=Ge,e.style.cursor=ve?"pointer":"grab"),ve&&ve!==Se?Au(Cr,ve):Cr.visible=!1,Sp(),it.forEach(N=>{if(N.userData.kind==="rail"){let pe=N.userData.baseIntensity??=N.material.emissiveIntensity??.12;N.material.emissiveIntensity=pe+Math.sin(ae*1.6+N.userData.phase)*pe*.18;return}if(N.userData.kind==="pulse"){if("emissiveIntensity"in N.material){let pe=N.userData.pulseBase??=N.material.emissiveIntensity;N.material.emissiveIntensity=pe*(1+.3*Math.sin(ae*1.8+N.userData.phase))}else N.material.opacity=.12+(Math.sin(ae*1.8+N.userData.phase)+1)*.05;return}if(N.userData.kind==="spin"){N.rotation.z+=j*(N.userData.speed??.4);return}if(N.userData.kind==="scanBand"){N.position.y=N.userData.baseY+Math.sin(ae*1.9+N.userData.phase)*N.userData.span,N.material.opacity=.18+(Math.sin(ae*2.1+N.userData.phase)+1)*.14;return}if(N.userData.kind==="gyro"){N.rotateZ(j*(N.userData.speed??.25));return}if(N.userData.kind==="coreGyro"){let pe=N.userData.speed??.12;N.rotateZ(j*pe);return}if(N.userData.kind==="coreCage"){N.rotation.y+=j*.045,N.rotation.x=Math.sin(ae*.18+N.userData.phase)*.035,N.material.opacity=.14+(Math.sin(ae*.7)+1)*.025;return}if(N.userData.kind==="corePulse"){let pe=1+Math.sin(ae*1.15+N.userData.phase)*.075;N.scale.setScalar(pe),N.material.emissiveIntensity=1.45+(Math.sin(ae*1.15)+1)*.34;return}if(N.userData.kind==="coreBeam"){N.material.opacity=N.userData.baseOpacity+(Math.sin(ae*1.05)+1)*.09,N.scale.y=.96+Math.sin(ae*.72)*.04;return}if(N.userData.kind==="coreSatellite"){let pe=ae*N.userData.speed+N.userData.phase;N.position.x=Math.cos(pe)*N.userData.radius,N.position.z=Math.sin(pe)*N.userData.radius,N.position.y=3.4+N.userData.lift+Math.sin(pe*1.7)*.28,N.scale.setScalar(.82+(Math.sin(ae*1.8+N.userData.phase)+1)*.16);return}if(N.userData.kind==="coreLight"){N.intensity=N.userData.baseIntensity*(.82+(Math.sin(ae*1.15)+1)*.09);return}if(N.userData.kind==="dataPacket"){if(N.userData.lifespan&&(N.visible=D&&ae-N.userData.born<N.userData.lifespan,!N.visible))return;let pe=(ae*(N.userData.speed??.1)+N.userData.phase)%1;N.position.lerpVectors(N.userData.from,N.userData.to,pe),N.material.opacity=.18+Math.sin(pe*Math.PI)*.74;let ht=.75+Math.sin(pe*Math.PI)*.55;N.scale.setScalar(ht);return}if(N.userData.kind==="sweep"){N.rotation.z+=j*(N.userData.speed??.08),N.material.emissiveIntensity=.26+(Math.sin(ae*1.4)+1)*.14;return}if(N.userData.kind==="bucketRevealDoor"){let pe=xe(N,.9,.12);N.position.x=dn.lerp(N.userData.startX,N.userData.targetX,pe),N.rotation.z=dn.lerp(0,N.userData.targetRotZ,pe),N.rotation.y=dn.lerp(N.userData.startRotY??0,N.userData.targetRotY??0,pe),wa(N,dn.lerp(N.userData.baseOpacity??.1,N.userData.targetOpacity??.38,pe)),Pu(N,.2+Math.sin(ae*3.2+N.userData.phase)*.04);return}if(N.userData.kind==="bucketRevealPanel"){let pe=xe(N,.52,N.userData.delay??0);wa(N,dn.lerp(N.userData.baseOpacity??0,N.userData.targetOpacity??1,pe)),Pu(N,.12+pe*.18),N.scale.setScalar(.96+pe*.04);return}if(N.userData.kind==="bucketRevealCard"){let pe=xe(N,.86,.12);N.position.y=dn.lerp(N.userData.baseY,N.userData.targetY,pe),N.material.opacity=pe,N.scale.copy(N.userData.targetScale).multiplyScalar(.86+pe*.14);return}if(N.userData.kind==="bucketRevealChip"){let pe=xe(N,.7,N.userData.delay);N.position.x=dn.lerp(0,N.userData.targetX,pe),N.position.y=dn.lerp(N.position.y,N.userData.targetY+Math.sin(ae*1.4+N.id)*.035,.16),N.position.z=dn.lerp(N.position.z,N.userData.targetZ,.14),N.material.opacity=pe*.88;return}if(N.userData.kind==="revealAperture"){let pe=xe(N,.62),ht=dn.lerp(N.userData.baseScale,N.userData.targetScale,pe);N.scale.set(ht,ht,1),N.rotation.z+=j*.9,N.material.emissiveIntensity=.62+Math.sin(ae*3.4)*.12;return}if(!N.userData.payload)return;let X=N===ve||N===Se;N.userData.selectionOutline&&(N.userData.selectionOutline.material.opacity=X?.85:.05);let We=N.userData.baseScale.clone().multiplyScalar(X?1.05:1);N.scale.lerp(We,D?.14:1);let _e=(N.userData.bob??0)*Math.sin(ae*1.1+N.id*.7),ke=X?.1:0;if(N.position.y+=(N.userData.baseY+_e+ke-N.position.y)*(D?.12:1),N.material.emissive){let pe=N.userData.baseEmissive;N.material.emissiveIntensity+=((X?pe+.7:pe)-N.material.emissiveIntensity)*.14}});let Le=D?Math.max(0,1-(ae-K)/2.5):0;ut.material.opacity=.48+Le*.5,Be.forEach((N,X)=>{for(let We=0;We<3;We+=1){let _e=(ae*.065+X*.14+We*.023)%1;N.getPoint(_e,Nt),N.getTangent(_e,fn),yt.setFromUnitVectors(nn,fn),Ue.set(1+Le,1,1),Ut.compose(Nt,yt,Ue),ut.setMatrixAt(X*3+We,Ut)}}),ut.instanceMatrix.needsUpdate=!0,Mt.forEach(({sprite:N,zone:X})=>{let We=se.aspect<.75,ke=Xe==="overview"||Xe===X?We&&Xe==="overview"?.58:.86:.035;N.material.opacity+=(ke-N.material.opacity)*Math.min(1,j*4)}),is.rotation.z+=j*.7;let mt=1+Math.sin(ae*2.4)*.045;if(is.visible){let N=Se?.userData.payload.focusRadius??1;is.scale.set(N*mt,N*mt,1)}if(ne.t<1){ne.t=D?Math.min(1,ne.t+j/ne.duration):1;let N=ep(ne.t);ne.basePos.lerpVectors(ne.fromPos,ne.toPos,N),ne.baseLook.lerpVectors(ne.fromLook,ne.toLook,N),ne.yaw=ne.yawStart*(1-N),ne.pitch=ne.pitchStart*(1-N)}if(Ae.subVectors(ne.basePos,ne.baseLook),at.setFromVector3(Ae),at.theta+=ne.yaw,at.phi=dn.clamp(at.phi-ne.pitch,.8,1.24),Ae.setFromSpherical(at),se.position.copy(ne.baseLook).add(Ae),se.lookAt(ne.baseLook),Uu(!D),B.info.reset(),be.render(),I+=1,bp&&ee&&!Fu&&(wp(),Fu=!0),ee&&!ku&&(ku=!0,M({qualityTier:L.effective})),!document.hidden&&D){Pi+=1,Aa+=q,q>Z*1.5&&(Ra+=1);let N=v-Cl;N>=(zu?6e4:6e3)&&(m({fps:Pi/(N/1e3),frameMs:Pi?Aa/Pi:0,slowFramePercent:Pi?Ra/Pi*100:0,drawCalls:B.info.render.calls,triangles:B.info.render.triangles,geometries:B.info.memory.geometries,textures:B.info.memory.textures,contextLosses:Rl,qualityTier:L.effective}),Cl=v,Pi=0,Aa=0,Ra=0,zu=!0)}}return Vu(),{setMotionPaused(v){Je=!!v,Pl()},updateSnapshot(v){let D=JSON.stringify(i.map(q=>q.valueLabel))!==JSON.stringify(v.buckets.map(q=>q.valueLabel));i.splice(0,i.length,...v.buckets),a.splice(0,a.length,...v.files),r.splice(0,r.length,...v.months),Object.assign(l,v.core),Ve.forEach((q,j)=>{q.parent.visible=!!i[j],i[j]&&Object.assign(q.userData.payload,{bucket:i[j],tooltip:[i[j].title,i[j].valueLabel]})}),pn.forEach((q,j)=>{q.visible=!!a[j],a[j]&&Object.assign(q.userData.payload,{file:a[j],tooltip:[a[j].name,a[j].valueLabel]})});let R=U.find(q=>q.userData.payload.type==="vault");R&&(R.userData.payload.tooltip=[l.title,l.tooltip]),Pr.forEach(({button:q,object:j})=>q.setAttribute("aria-label",Lu(j.userData.payload)));let W=l.rows?.find(([q])=>q==="Health score")?.[1]||"APP",Z=Ln([W,"HEALTH"],{accent:"#dff4ff",scale:.52});if(Ce.material.map.dispose(),Ce.material.map=Z.material.map,Ce.scale.copy(Z.scale),Z.material.dispose(),Se){let q=Se.userData.payload,j=q.type==="bucket"?i[q.index]:q.type==="file"?a[q.index]:l;j?y(j):Al()}D&&v.sampling.status==="current"&&(K=pt.elapsedTime),w+=1,le()},quality(){return{...L}},setQuality(v){return It(v)},setView:gp,focusBucket(v){Ve[v]&&Is(Ve[v],{silent:!0})},focusMonth(v){xt[v]&&Is(xt[v],{silent:!0})},focusFile(v){pn[v]&&Is(pn[v],{silent:!0})}}}var As=window.location.origin,Ml=1024*1024,ri=null,ip=!1,tn=null,np=!1,Av=performance.now(),Es={sampledAt:new Date().toISOString(),sampling:{status:"pending",message:"Waiting for the host application to provide company data.",notices:[]},telemetry:{message:"Platform instrumentation is not connected yet."},health:{score:null,status:"collecting",label:"Collecting",measuredCount:0,totalCount:4,metrics:[{metric:"lcp_ms",label:"Largest Contentful Paint",shortLabel:"Page paint (LCP)",valueText:"Collecting",status:"collecting",statusLabel:"Collecting",gaugePosition:0,direction:"lower",directionLabel:"Lower is better",statisticLabel:"Collecting",target:"2.5 s or less",basis:"Core Web Vitals page-paint threshold; separate from workspace readiness",sampleCount:0},{metric:"inp_ms",label:"Interaction to Next Paint",shortLabel:"Responsiveness",valueText:"Collecting",status:"collecting",statusLabel:"Collecting",gaugePosition:0,direction:"lower",directionLabel:"Lower is better",statisticLabel:"Collecting",target:"200 ms or less",basis:"Core Web Vitals threshold",sampleCount:0},{metric:"query_latency_ms",label:"Data Loader Response",shortLabel:"Data loader",valueText:"Collecting",status:"collecting",statusLabel:"Collecting",gaugePosition:0,direction:"lower",directionLabel:"Lower is better",statisticLabel:"Collecting",target:"500 ms or less",basis:"MaintainOps product target",sampleCount:0},{metric:"spatial_fps",label:"3D Frame Rate",shortLabel:"3D smoothness",valueText:"Collecting",status:"collecting",statusLabel:"Collecting",gaugePosition:0,direction:"higher",directionLabel:"Higher is better",statisticLabel:"Collecting",target:"40 FPS or more",basis:"Mixed-device MaintainOps target",sampleCount:0}]},summary:{teamSeats:0,requestsToday:0,ordersReceivedToday:0,processEventsToday:0,publicIntakeTotal:0,ordersReceivedTotal:0,totalRecords:0,assets:0,parts:0,locations:0,storage:{available:!1,totalBytesText:"Role limited",fileCount:0}},systems:[{id:"intake",label:"Public Intake",value:"0 received",detail:"Awaiting company telemetry"},{id:"orders",label:"Order Throughput",value:"0 total",detail:"Awaiting company telemetry"},{id:"flow",label:"Today's Process Flow",value:"0 events",detail:"Awaiting company telemetry"},{id:"vault",label:"Data Vault",value:"Role limited",detail:"Storage detail follows existing access"},{id:"footprint",label:"Platform Footprint",value:"0 records",detail:"Awaiting company telemetry"}],signals:[{title:"Platform snapshot loading",value:"Waiting",detail:"The host application is preparing live company data.",kind:"active"}],timeline:[],plants:[]};function tt(s){return String(s??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function Ts(s){return Number(s)||0}function Zn(s){if(s==null||s==="")return"Unavailable";let e=Number(s);return Number.isFinite(e)?new Intl.NumberFormat("en-US").format(e):"Unavailable"}function sp(s){return s?.status==="degraded"?"Partial data":s?.status==="pending"?"Pending":"Current"}function Su(s,e){return s==null?"Unavailable":`${Zn(s)} ${e}`}function Rv(s,e){let t=String(s||e||"").trim();return t.length>18?`${t.slice(0,17)}...`:t}function Cv(s,e){let t=String(s||"");return t?Rv(t.replace(/\s+\d{4}$/,""),`D${e+1}`):`D${e+1}`}function Pv(s){return s==="attention"?"high":s==="stable"?"low":"medium"}function Iv(s,e){let t=Number.parseFloat(String(s?.value||"").replace(/[^0-9.]/g,""));return Math.max(1,t||10-e)*Ml}function Lv(s,e){let t=Number.parseFloat(String(s?.value||"").replace(/[^0-9.]/g,""));return Math.max(1,t||8-e)*Ml}function Dv(s){let e=Array.isArray(s.signals)?s.signals:[],t=Array.isArray(s.systems)?s.systems:[],n=Array.isArray(s.timeline)?s.timeline:[],i=t.map(l=>({title:l.label,value:l.value,detail:l.detail,kind:l.tone==="amber"?"attention":"active",system:l.label})),r=n.at(-1);if(r){let l=Ts(r.ordersReceived??r.workCreated);i.push({title:"Today's process flow",value:`${Ts(r.requests)+l} events`,detail:`${Ts(r.requests)} intake and ${l} orders received`,kind:"active",system:"Process Data Flow"})}let a=[],o=new Set;for([...e,...i].forEach(l=>{let c=String(l.system||l.title||"").trim().toLowerCase();!c||o.has(c)||(o.add(c),a.push(l))});a.length<10;){let l=String(a.length+1).padStart(2,"0");a.push({title:`Telemetry channel ${l}`,value:"Pending",detail:"Telemetry will appear after it is connected to Maintain Ops.",kind:"stable",system:`Platform Instrumentation ${l}`})}return a.slice(0,10)}function Uv(s){let e=s.summary||Es.summary,t=s.health||Es.health,n=s.sampling||{status:"current",message:"Company data sampled.",notices:[]},i=sp(n),r=(s.systems||Es.systems).slice(0,5),a=Dv(s),o=(s.timeline||[]).slice(-12),l=r.map((u,d)=>({title:u.label,files:Math.max(1,Ts(String(u.value).replace(/[^0-9.]/g,""))||1),itemLabel:"signals",size:Lv(u,d),valueLabel:u.value,type:"systems",eyebrow:`Major app systems / ${String(d+1).padStart(2,"0")} of ${String(r.length).padStart(2,"0")}`,subtitle:"All-plant aggregated platform metric",badge:u.value,rows:[["Current measure",u.value],["System detail",u.detail],["Scope","Current company / all plants"],["Telemetry","Company sampled"]],footer:"Maintain Ops performance index",status:i})),c=a.map((u,d)=>({name:u.title,bucket:u.system||r[d%Math.max(r.length,1)]?.label||"Platform Signal",category:"App performance",equipment:u.detail,size:Iv(u,d),valueLabel:u.value,eyebrow:"Current notable signal",subtitle:`${u.system||"Platform"} / all-plant aggregate`,badge:`Rank ${String(d+1).padStart(2,"0")} of ${a.length}`,rows:[["Current value",u.value],["System",u.system||"Platform"],["Context",u.detail],["State",u.kind==="attention"?"Review":"Current"]],footer:"Live platform signal index",status:u.kind==="attention"?"Review":"Current"})),h=o.map((u,d)=>{let f=Ts(u.ordersReceived??u.workCreated),g=Ts(u.requests)+f;return{label:u.label||`Day ${d+1}`,added:Math.max(g,0)*Ml,valueLabel:`${g} events`,subtitle:"Daily platform activity",badge:g?"Active":"Quiet",rows:[["Public intake",String(Ts(u.requests))],["Orders received",String(f)],["Order throughput",String(f)],["Process data flow",`${g} events`]],footer:"Company activity runway",status:g?"Tracked":"Quiet"}});return{health:t,telemetry:s.telemetry||Es.telemetry,summary:e,systems:r,signals:a,buckets:l,files:c,months:h,days:jf(o),rules:r.map(u=>({title:u.label,summary:u.value,detail:u.detail})),operations:a.slice(0,5).map(u=>({severity:Pv(u.kind),title:u.title,detail:`${u.value} - ${u.detail}`})),recentActivity:[{label:"Public intake",value:Su(e.requestsToday,"today"),detail:e.publicIntakeTotal===null?"Company total unavailable":`${Zn(e.publicIntakeTotal)} total received`},{label:"Orders received",value:Su(e.ordersReceivedToday,"today"),detail:e.ordersReceivedTotal===null?"Company total unavailable":`${Zn(e.ordersReceivedTotal)} total recorded`},{label:"Process data flow",value:Su(e.processEventsToday,"events"),detail:"Today across public intake and orders received"}],core:{eyebrow:"Maintain Ops / App Health",title:"App Health",subtitle:"Measured browser and platform responsiveness",badge:t.label,tooltip:t.score===null?"Collecting performance samples":`${t.score} of 100 across measured signals`,rows:[["Health score",t.score===null?"Collecting":`${t.score}/100`],["Signals measured",`${t.measuredCount||0}/${t.totalCount||0}`],[t.metrics?.[0]?.shortLabel||"Page load",t.metrics?.[0]?.valueText||"Collecting"],[t.metrics?.[1]?.shortLabel||"Responsiveness",t.metrics?.[1]?.valueText||"Collecting"]],footer:"Company app health command core",status:t.label},sampling:n}}function Nv(){return{headerKicker:document.querySelector(".header-kicker"),headerSubtitle:document.querySelector(".subtitle.subtle"),headerStateLabel:document.querySelector(".header-system-state small"),headerState:document.querySelector(".header-system-state strong"),samplingNotice:document.querySelector("#sampling-notice"),stageReadoutStatus:document.querySelector(".readout-status"),stageReadoutMetrics:[...document.querySelectorAll(".readout-metrics > span")],search:document.querySelector("#file-search"),refresh:document.querySelector("#refresh-button"),zoneIndicator:document.querySelector("#zone-indicator"),telemetryRows:[...document.querySelectorAll(".telemetry-row")],activityEvents:[...document.querySelectorAll(".activity-event")],chartStats:[...document.querySelectorAll(".chart-stats > span")],timelineMonths:[...document.querySelectorAll("[data-timeline-month]")],stageActions:[...document.querySelectorAll("[data-world-target]")],timelineSource:document.querySelector("#timeline-source"),sourcePanels:[...document.querySelectorAll(".source-lattice > .source-panel")],summarySource:document.querySelector(".summary-source"),rulesGrid:document.querySelector("#rules-grid"),usageChart:document.querySelector("#usage-chart"),bucketList:document.querySelector("#bucket-list"),fileList:document.querySelector("#file-list"),fileEmpty:document.querySelector("#file-empty"),filesCount:document.querySelector("#files-count"),clearSearch:document.querySelector("#clear-search"),updated:document.querySelector("#updated-pill"),opsGrid:document.querySelector("#ops-grid"),dialog:document.querySelector("#file-dialog"),dialogTitle:document.querySelector("#dialog-title"),dialogDetails:document.querySelector("#dialog-details"),canvas:document.querySelector("#storage-world"),touchTargets:document.querySelector("[data-spatial-touch-targets]"),tooltip:document.querySelector("#world-tooltip"),exit:document.querySelector("[data-performance-exit]"),qualityButtons:[...document.querySelectorAll("[data-quality-tier]")],motion:document.querySelector("#motion-button"),inspector:document.querySelector(".spatial-inspector"),timelineDays:document.querySelector(".timeline-days"),timelineDetail:document.querySelector(".timeline-detail"),timelineConsoleDetail:document.querySelector(".timeline-console-head small"),timelineConsoleWindow:document.querySelector(".timeline-console-head > span")}}var me=null,Tu="all",xl=null;function Ov(s){let e=document.activeElement?.dataset?.dayKey,t=s.days;t.some(n=>n.key===xl)||(xl=t.at(-1)?.key??null),me.timelineDays.replaceChildren(),me.timelineDays.style.setProperty("--day-count",Math.max(1,t.length)),t.forEach((n,i)=>{let r=document.createElement("button");r.type="button",r.dataset.timelineMonth=String(i),r.dataset.dayKey=n.key,r.setAttribute("aria-label",`${n.label}: ${n.requests} intake, ${n.orders} orders`);let a=document.createElement("span");a.className="timeline-day-bars",a.setAttribute("aria-hidden","true"),[n.requestScale,n.orderScale].forEach(l=>{let c=document.createElement("i");c.style.setProperty("--activity-scale",l),a.append(c)});let o=document.createElement("span");o.textContent=Cv(n.label,i),r.append(a,o),r.addEventListener("click",()=>vl(i)),me.timelineDays.append(r)}),me.timelineMonths=[...me.timelineDays.querySelectorAll("button")],vl(t.findIndex(n=>n.key===xl)),e&&me.timelineMonths.find(n=>n.dataset.dayKey===e)?.focus({preventScroll:!0})}function Fv(s){if(me.inspector.hidden=!s,document.documentElement.classList.toggle("spatial-inspecting",!!s),!s)return;me.inspector.querySelector(".inspector-eyebrow").textContent=s.eyebrow||"App performance",me.inspector.querySelector("h2").textContent=s.title||s.name,me.inspector.querySelector(".inspector-subtitle").textContent=s.subtitle||"";let e=me.inspector.querySelector("dl");e.replaceChildren(),(s.rows||[]).forEach(([t,n])=>{let i=document.createElement("dt"),r=document.createElement("dd");i.textContent=t,r.textContent=n,e.append(i,r)}),me.inspector.querySelector("footer").textContent=`${s.status||"Collecting"} / Company sample`}function Bv({enabled:s,reduced:e}){document.documentElement.dataset.motion=s?"on":"off",me.motion.textContent=e?"Reduced motion":s?"Motion on":"Motion off",me.motion.setAttribute("aria-pressed",String(s)),me.motion.disabled=e,me.motion.title=e?"Following your device's reduced-motion preference":s?"Pause room animation":"Resume room animation"}function kv(s){let{summary:e,systems:t,months:n,sampling:i,health:r}=s,a=r?.label||sp(i),o=i.status==="current",l=s.telemetry?.status==="unavailable";document.title="Maintain Ops App Performance",document.documentElement.classList.toggle("platform-spatial-degraded",i.status==="degraded"),document.documentElement.classList.toggle("platform-spatial-pending",i.status==="pending"),document.documentElement.dataset.health=r?.status||"collecting",me.headerKicker.textContent="App Performance",me.headerSubtitle.innerHTML=e.totalRecords===null?"Company record count unavailable":`<span id="linked-files-count">${tt(Zn(e.totalRecords))}</span> company records monitored`,me.headerStateLabel.textContent="App experience",me.headerState.innerHTML=`<i aria-hidden="true"></i>${tt(a)}`,me.samplingNotice.hidden=o&&!l,me.samplingNotice.hidden||(me.samplingNotice.querySelector("strong").textContent=l?"Telemetry unavailable":a,me.samplingNotice.querySelector("span").textContent=l?s.telemetry.message:i.message);let c=[["Orders Through System",Zn(e.ordersReceivedTotal),"all company history"],["Public Intake Total",Zn(e.publicIntakeTotal),"all company history"],["Data Stored",e.storage?.available?e.storage.totalBytesText:"Role limited",""],["Records Monitored",Zn(e.totalRecords),""]];me.stageReadoutStatus.innerHTML=`App Experience <b>${tt(a)}</b>`,me.stageReadoutMetrics.forEach((m,p)=>{let[M,y,S]=c[p]||["Platform signal","Current",""];m.querySelector("small").textContent=M,m.querySelector("b").textContent=y;let F=m.querySelector("em");F&&(F.textContent=S)}),me.search.placeholder="Search systems...";let h=[["App health",r?.score===null?"Collecting":`${r.score}/100`],...(r?.metrics||[]).slice(0,4).map(m=>[m.shortLabel,m.valueText])];me.telemetryRows.forEach((m,p)=>{let M=h[p]||["Platform signal","Current"];m.querySelector("small").textContent=M[0],m.querySelector("strong").textContent=M[1]}),me.activityEvents.forEach((m,p)=>{let M=s.recentActivity[p]||{label:"Process telemetry",value:"Pending",detail:"Awaiting source connection"};m.querySelector("small").textContent="TODAY",m.querySelector("strong").innerHTML=`${tt(M.label)}<em>${tt(`${M.value} - ${M.detail}`)}</em>`});let u=document.querySelector(".activity-head");u.querySelector("small").textContent="Process data stream",u.querySelector("strong").textContent="Today at a glance",u.querySelector("b").innerHTML=`<i aria-hidden="true"></i>${tt(a)}`,document.querySelector(".source-lattice-head p").textContent="Performance sources",document.querySelector(".source-lattice-head h2").textContent="Maintain Ops Platform Archive",document.querySelector(".source-lattice-head > span").innerHTML=`<i aria-hidden="true"></i>${t.length} systems sampled`;let d=[...document.querySelectorAll(".source-summary")],f=[["App Health",`${r?.measuredCount||0}/${r?.totalCount||0} measured`],["App Systems",`${t.length} systems`],["Activity Runway",`${n.length} days`],["Platform Systems",`${t.length} systems`],["Notable Signals",`${s.files.length} shown`],["Instrumentation Queue",`${s.operations.length} signals`]];d.forEach((m,p)=>{let[M,y]=f[p]||["Platform source","Current"];m.querySelector("span").textContent=M,m.querySelector("strong").textContent=y}),document.querySelector("#rules-title").innerHTML="Major App Systems <span>Current company-scoped operating signals</span>",document.querySelector(".rules-panel .section-heading p").textContent="Each tower above represents one part of the Maintain Ops platform. Values are sampled from live company records where they exist.",document.querySelector("#month-title").innerHTML="Activity Runway <span>Recent company activity</span>",document.querySelector(".chart-panel .section-heading p").textContent="Public intake and order throughput across the selected activity window.",document.querySelector("#space-title").innerHTML="Platform Systems <span>Major capabilities</span>",document.querySelector(".buckets-panel .section-heading p").textContent="The spatial towers map directly to the five major platform systems.",document.querySelector("#files-title").innerHTML="Current Notable Signals <span>Live platform index</span>",document.querySelector(".files-panel .section-heading p").textContent="The front physical cubes represent the current signals that need attention or mark momentum.",document.querySelector("#ops-title").innerHTML="Instrumentation Queue <span>Observed platform conditions</span>",document.querySelector(".operations-panel .section-heading p").textContent="Only values Maintain Ops can actually observe are presented as live. Missing telemetry remains marked as pending.";let g=[["Process Events Today",Zn(e.processEventsToday)],["Public Intake Today",Zn(e.requestsToday)],["Orders Received Today",Zn(e.ordersReceivedToday)]];me.chartStats.forEach((m,p)=>{let[M,y]=g[p]||["Platform signal","0"];m.querySelector("small").textContent=M,m.querySelector("strong").textContent=y}),me.timelineConsoleDetail.textContent=`${n.length} day activity view`,me.timelineConsoleWindow.textContent=`${n.length} Days`;let _=[...document.querySelectorAll("[data-bucket-filter]")];["All","Systems","Signals"].forEach((m,p)=>{_[p]&&(_[p].textContent=m,_[p].dataset.bucketFilter=p===0?"all":p===1?"systems":"signals")})}function zv(s){let e=s.health?.metrics||[],t=me.summarySource.querySelector(".summary-grid");t.innerHTML=e.map(n=>`
    <article class="metric-card health-metric-card status-${tt(n.status)}">
      <div class="health-metric-head"><span>${tt(n.shortLabel)}</span><b>${tt(n.statusLabel)}</b></div>
      <strong>${tt(n.valueText)}</strong>
      <div class="health-metric-period">
        <span>${tt(n.statisticLabel||"Current")}</span>
        ${n.currentComparisonLabel?`<span>${tt(n.currentComparisonLabel)}</span>`:""}
      </div>
      <div class="metric-scale direction-${tt(n.direction)} ${n.status==="collecting"?"is-collecting":""}" style="--good-position:${Math.round(n.goodPosition||0)}%;--watch-position:${Math.round(n.watchPosition||0)}%" role="meter" aria-label="${tt(n.label)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(n.gaugePosition||0)}" aria-valuetext="${tt(`${n.valueText}, ${n.statusLabel}, ${n.directionLabel||""}`)}">
        <i style="left:${Math.max(0,Math.min(100,n.gaugePosition||0))}%"></i>
      </div>
      <small>${tt(n.target)}${n.directionLabel?` / ${tt(n.directionLabel)}`:""}</small>
      <p>${tt(n.basis)}${n.sampleCount?` / ${Zn(n.sampleCount)} samples`:""}</p>
    </article>
  `).join("")}function Hv(s){me.rulesGrid.innerHTML=s.rules.map(e=>`
    <article class="rule-card">
      <h3>${tt(e.title)}</h3>
      <strong>${tt(e.summary)}</strong>
      <p>${tt(e.detail)}</p>
    </article>
  `).join("")}function Vv(s){let e=Math.max(1,...s.months.map(t=>t.added));me.usageChart.innerHTML=s.months.map((t,n)=>{let i=Math.max(t.added?10:0,t.added/e*184);return`
      <article class="month-bar" data-month-index="${n}" title="View ${tt(t.label)} activity">
        <div class="month-plot"><div class="month-total" style="height:${i}px"></div><div class="month-fill" style="height:${i}px"></div></div>
        <div class="month-labels"><strong>${tt(t.valueLabel)}</strong><span>Company activity</span><small>${tt(t.label)}</small></div>
      </article>
    `}).join(""),me.usageChart.querySelectorAll(".month-bar").forEach(t=>{t.addEventListener("click",()=>vl(Number(t.dataset.monthIndex)))})}function bu(s){let e=s.buckets,t=Math.max(1,...s.buckets.map(n=>n.size));me.bucketList.innerHTML=e.map((n,i)=>{let r=Math.max(4,n.size/t*100);return`
      <article class="bucket-card" data-bucket-index="${i}" title="Focus ${tt(n.title)} in the 3D model">
        <div class="bucket-card-main">
          <div><h3 class="bucket-title">${tt(n.title)}</h3><div class="bucket-meta">${tt(n.valueLabel)} - company scoped</div></div>
          <div class="bar-track" aria-hidden="true"><div class="bar-fill" style="width:${r}%"></div></div>
          <div class="bucket-size"><span>${r.toFixed(0)}%</span>${tt(n.valueLabel)}</div>
        </div>
        <details class="bucket-source"><summary>System context <span>${tt(n.badge)}</span></summary><div class="bucket-source-list">
          ${n.rows.map(([a,o])=>`<div class="source-file"><span>${tt(a)}</span><strong>${tt(o)}</strong><small>${tt(n.title)}</small></div>`).join("")}
        </div></details>
      </article>
    `}).join(""),me.bucketList.querySelectorAll(".bucket-card").forEach(n=>{n.addEventListener("click",i=>{i.target.closest(".bucket-source")||ri?.focusBucket(Number(n.dataset.bucketIndex))})})}function Gv(s,e){return!e||`${s.name} ${s.bucket} ${s.category} ${s.equipment}`.toLowerCase().includes(e.toLowerCase())}function wu(s){let e=me.search.value.trim(),n=[...s.files].sort((i,r)=>r.size-i.size).filter(i=>Gv(i,e));me.filesCount.textContent=`${n.length} shown`,me.fileEmpty.hidden=n.length>0,me.fileList.innerHTML=n.map(i=>{let r=s.files.indexOf(i);return`
      <article class="file-row" data-file-index="${r}" data-file-type="signal">
        <div class="file-token" aria-hidden="true">SIG</div>
        <div><h3 class="file-name">${tt(i.name)}</h3><p class="file-meta">${tt(i.bucket)} - ${tt(i.category)}</p></div>
        <div class="file-equipment">${tt(i.equipment)}</div>
        <button class="button open-file" data-file-index="${r}" type="button">Inspect</button>
        <div class="file-size">${tt(i.valueLabel)}</div>
      </article>
    `}).join(""),me.fileList.querySelectorAll(".open-file").forEach(i=>{i.addEventListener("click",r=>{r.stopPropagation();let a=s.files[Number(i.dataset.fileIndex)];a&&Xv(a)})}),me.fileList.querySelectorAll(".file-row").forEach(i=>{i.addEventListener("click",()=>ri?.focusFile(Number(i.dataset.fileIndex)))})}function Wv(s){me.opsGrid.innerHTML=s.operations.map(e=>`
    <article class="ops-card"><span class="severity ${tt(e.severity)}">${tt(e.severity)}</span><h3>${tt(e.title)}</h3><p>${tt(e.detail)}</p></article>
  `).join("")}function Xv(s){me.dialogTitle.textContent=s.name,me.dialogDetails.innerHTML=`
    <dt>System</dt><dd>${tt(s.bucket)}</dd>
    <dt>Signal</dt><dd>${tt(s.valueLabel)}</dd>
    <dt>Context</dt><dd>${tt(s.equipment)}</dd>
    <dt>Scope</dt><dd>Current company / all plants</dd>
    <dt>Status</dt><dd>${tt(s.status)}</dd>
  `,me.dialog.open||me.dialog.showModal()}function vl(s){let e=tn?.days[s];xl=e?.key??null,me.timelineDetail.textContent=e?`${e.label}: ${e.requests} intake / ${e.orders} orders / ${e.total} total`:"Awaiting activity sample",me.timelineMonths.forEach(t=>t.classList.toggle("active",Number(t.dataset.timelineMonth)===s)),me.timelineMonths.forEach(t=>t.setAttribute("aria-pressed",String(Number(t.dataset.timelineMonth)===s))),me.timelineDays.style.setProperty("--selected-day",Math.max(0,s)),me.timelineDays.classList.toggle("has-days",!!e),me.usageChart.querySelectorAll(".month-bar").forEach(t=>t.classList.toggle("active",Number(t.dataset.monthIndex)===s))}function Eu(s=null){me.timelineSource.open=!0,rp("timeline"),me.zoneIndicator.textContent="Viewing: Activity Runway",s!==null&&vl(s),requestAnimationFrame(()=>me.timelineSource.scrollIntoView({behavior:document.documentElement.dataset.motion==="off"?"instant":"smooth",block:"start"}))}function rp(s){me.stageActions.forEach(e=>{let t=e.dataset.worldTarget===s;e.classList.toggle("active",t),e.setAttribute("aria-pressed",String(t))})}function ap(s){tn=Uv(s||Es),kv(tn),zv(tn),Hv(tn),Vv(tn),bu(tn),wu(tn),Wv(tn),me.refresh.classList.remove("refreshing");let e=me.refresh.querySelector("span:last-child");e&&(e.textContent="Refresh"),me.updated.textContent=`Sampled ${new Date(s?.sampledAt||Date.now()).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}`,Ov(tn),ri?ri.updateSnapshot(tn):ri=tp({canvas:me.canvas,touchTargets:me.touchTargets,tooltip:me.tooltip,buckets:tn.buckets,months:tn.months,files:tn.files,core:tn.core,activity:tn.recentActivity,onInspection:Fv,onMotionChange:Bv,motionPaused:localStorage.getItem("maintainops.performanceMotion")==="off",formatBytes:t=>`${Zn(t/Ml)} events`,onZoneChange:t=>{rp(t.id),me.zoneIndicator.textContent=`Viewing: ${t.label}`},onBucketSelected:()=>{Tu="all",bu(tn)},onMonthSelected:(t,n)=>Eu(n),onFileSelected:()=>{},onVaultSelected:()=>{me.summarySource.open=!0},qualityPreference:localStorage.getItem("maintainops.performanceQuality")||"auto",onPerformanceSample:t=>{window.parent.postMessage({type:"maintainops-platform-spatial-telemetry",sample:t},As)},onQualityChange:t=>op(t.preference,t.effective),onFirstRender:t=>{np||(np=!0,document.documentElement.classList.add("platform-spatial-ready"),window.__MAINTAIN_OPS_PLATFORM_SPATIAL_READY=!0,window.parent.postMessage({type:"maintainops-platform-spatial-rendered"},As),window.parent.postMessage({type:"maintainops-platform-spatial-telemetry",sample:{...t,readyMs:performance.now()-Av}},As))}})}function op(s,e){me.qualityButtons.forEach(t=>{let n=t.dataset.qualityTier===s;t.classList.toggle("active",n),t.setAttribute("aria-pressed",String(n));let i=t.dataset.qualityTier==="performance"?"Efficient":t.dataset.qualityTier==="cinematic"?"Ultra":"Auto";t.textContent=t.dataset.qualityTier==="auto"&&e?`${i}: ${e==="performance"?"Efficient":e==="cinematic"?"Ultra":"Balanced"}`:i})}function qv(){let s=me.refresh.querySelector("span:last-child");me.refresh.classList.add("refreshing"),s&&(s.textContent="Sampling"),window.parent.postMessage({type:"maintainops-platform-spatial-refresh"},As)}function Yv(){me.exit?.addEventListener("click",s=>{if(window.self===window.top){localStorage.setItem("maintainops.activeSection","mywork");return}s.preventDefault(),window.parent.postMessage({type:"maintainops-platform-spatial-exit"},As)}),document.querySelectorAll("[data-bucket-filter]").forEach(s=>{s.addEventListener("click",()=>{Tu=s.dataset.bucketFilter,document.querySelectorAll("[data-bucket-filter]").forEach(e=>e.classList.toggle("active",e===s)),bu(tn)})}),me.sourcePanels.forEach(s=>s.addEventListener("toggle",()=>{s.open&&me.sourcePanels.forEach(e=>{e!==s&&(e.open=!1)})})),me.search.addEventListener("input",()=>wu(tn)),me.clearSearch.addEventListener("click",()=>{me.search.value="",me.search.focus(),wu(tn)}),me.refresh.addEventListener("click",qv),me.motion.addEventListener("click",()=>{let s=me.motion.getAttribute("aria-pressed")==="true";localStorage.setItem("maintainops.performanceMotion",s?"off":"on"),ri?.setMotionPaused(s)}),me.inspector.querySelector(".inspector-close").addEventListener("click",()=>{ri?.setView("overview"),me.stageActions[0]?.focus({preventScroll:!0})}),me.qualityButtons.forEach(s=>s.addEventListener("click",()=>{let e=s.dataset.qualityTier||"auto";localStorage.setItem("maintainops.performanceQuality",e);let t=ri?.setQuality(e);op(e,t?.effective||"")})),me.stageActions.forEach(s=>s.addEventListener("click",()=>{let e=s.dataset.worldTarget;e==="timeline"?Eu():ri?.setView(e)})),window.addEventListener("keydown",s=>{if(s.key==="Escape"&&!me.inspector.hidden){ri?.setView("overview"),me.stageActions[0]?.focus({preventScroll:!0});return}if(s.altKey||s.ctrlKey||s.metaKey||s.target instanceof HTMLInputElement)return;let e=["overview","buckets","timeline","files","vault"],t=Number(s.key)-1;t<0||t>=e.length||(s.preventDefault(),e[t]==="timeline"?Eu():ri?.setView(e[t]))})}window.addEventListener("message",s=>{s.origin!==As||s.data?.type!=="maintainops-platform-spatial-snapshot"||(ip=!0,document.documentElement.classList.remove("platform-spatial-standalone"),ap(s.data.snapshot||Es))});me=Nv();Yv();window.parent.postMessage({type:"maintainops-platform-spatial-ready"},As);window.setTimeout(()=>{ip||(document.documentElement.classList.add("platform-spatial-standalone"),ap(Es))},800);})();
//# sourceMappingURL=platformSpatial.103e67aeb7.js.map
