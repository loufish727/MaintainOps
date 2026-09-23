(()=>{var Cp=0,Xu=1,Pp=2;var yf=1,wh=2,Si=3,Gn=0,Cn=1,$t=2,ci=0,rr=1,Wn=2,qu=3,Yu=4,Ip=5,fs=100,Lp=101,Dp=102,Up=103,Np=104,Op=200,Fp=201,Bp=202,kp=203,dc=204,fc=205,zp=206,Hp=207,Vp=208,Gp=209,Wp=210,Xp=211,qp=212,Yp=213,$p=214,Kp=0,Zp=1,Jp=2,yo=3,Qp=4,jp=5,em=6,tm=7,xf=0,nm=1,im=2,Vi=0,Eh=1,Th=2,Ah=3,pa=4,sm=5,Rh=6,Ch=7,$u="attached",rm="detached",vf=300,hr=301,ur=302,Kr=303,pc=304,rl=306,ms=1e3,Ct=1001,Zr=1002,vn=1003,Ph=1004;var nr=1005;var Ht=1006,Gr=1007;var ri=1008;var Ti=1009,Mf=1010,Sf=1011,Jr=1012,Ih=1013,gs=1014,Tn=1015,Mn=1016,Lh=1017,Dh=1018,dr=1020,bf=35902,wf=1021,Ef=1022,Hn=1023,Tf=1024,Af=1025,ar=1026,fr=1027,Uh=1028,Nh=1029,Rf=1030,Oh=1031;var Fh=1033,fo=33776,po=33777,mo=33778,go=33779,mc=35840,gc=35841,_c=35842,yc=35843,xc=36196,vc=37492,Mc=37496,Sc=37808,bc=37809,wc=37810,Ec=37811,Tc=37812,Ac=37813,Rc=37814,Cc=37815,Pc=37816,Ic=37817,Lc=37818,Dc=37819,Uc=37820,Nc=37821,_o=36492,Oc=36494,Fc=36495,Cf=36283,Bc=36284,kc=36285,zc=36286;var pr=2300,mr=2301,Il=2302,Ku=2400,Zu=2401,Ju=2402,am=2500;var Pf=0,al=1,ma=2,om=3200,lm=3201,If=0,cm=1,ki="",Mt="srgb",en="srgb-linear",Bh="display-p3",ol="display-p3-linear",xo="linear",Tt="srgb",vo="rec709",Mo="p3";var Us=7680;var Qu=519,hm=512,um=513,dm=514,Lf=515,fm=516,pm=517,mm=518,gm=519,Hc=35044,Df=35048;var ju="300 es",Ei=2e3,So=2001,Gi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let i=this._listeners[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}},yn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ed=1234567,or=Math.PI/180,gr=180/Math.PI;function Vn(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(yn[s&255]+yn[s>>8&255]+yn[s>>16&255]+yn[s>>24&255]+"-"+yn[e&255]+yn[e>>8&255]+"-"+yn[e>>16&15|64]+yn[e>>24&255]+"-"+yn[t&63|128]+yn[t>>8&255]+"-"+yn[t>>16&255]+yn[t>>24&255]+yn[n&255]+yn[n>>8&255]+yn[n>>16&255]+yn[n>>24&255]).toLowerCase()}function Jt(s,e,t){return Math.max(e,Math.min(t,s))}function kh(s,e){return(s%e+e)%e}function _m(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function ym(s,e,t){return s!==e?(t-s)/(e-s):0}function Wr(s,e,t){return(1-t)*s+t*e}function xm(s,e,t,n){return Wr(s,e,1-Math.exp(-t*n))}function vm(s,e=1){return e-Math.abs(kh(s,e*2)-e)}function Mm(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Sm(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function bm(s,e){return s+Math.floor(Math.random()*(e-s+1))}function wm(s,e){return s+Math.random()*(e-s)}function Em(s){return s*(.5-Math.random())}function Tm(s){s!==void 0&&(ed=s);let e=ed+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Am(s){return s*or}function Rm(s){return s*gr}function Cm(s){return(s&s-1)===0&&s!==0}function Pm(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Im(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Lm(s,e,t,n,i){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":s.set(o*h,l*u,l*d,o*c);break;case"YZY":s.set(l*d,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*d,o*h,o*c);break;case"XZX":s.set(o*h,l*g,l*f,o*c);break;case"YXY":s.set(l*f,o*h,l*g,o*c);break;case"ZYZ":s.set(l*g,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function si(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function bt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var dn={DEG2RAD:or,RAD2DEG:gr,generateUUID:Vn,clamp:Jt,euclideanModulo:kh,mapLinear:_m,inverseLerp:ym,lerp:Wr,damp:xm,pingpong:vm,smoothstep:Mm,smootherstep:Sm,randInt:bm,randFloat:wm,randFloatSpread:Em,seededRandom:Tm,degToRad:Am,radToDeg:Rm,isPowerOfTwo:Cm,ceilPowerOfTwo:Pm,floorPowerOfTwo:Im,setQuaternionFromProperEuler:Lm,normalize:bt,denormalize:si},ce=class s{constructor(e=0,t=0){s.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Jt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ct=class s{constructor(e,t,n,i,r,a,o,l,c){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c)}set(e,t,n,i,r,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=i[0],m=i[3],p=i[6],M=i[1],y=i[4],S=i[7],F=i[2],R=i[5],P=i[8];return r[0]=a*_+o*M+l*F,r[3]=a*m+o*y+l*R,r[6]=a*p+o*S+l*P,r[1]=c*_+h*M+u*F,r[4]=c*m+h*y+u*R,r[7]=c*p+h*S+u*P,r[2]=d*_+f*M+g*F,r[5]=d*m+f*y+g*R,r[8]=d*p+f*S+g*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,g=t*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return e[0]=u*_,e[1]=(i*c-h*n)*_,e[2]=(o*n-i*a)*_,e[3]=d*_,e[4]=(h*t-i*l)*_,e[5]=(i*r-o*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ll.makeScale(e,t)),this}rotate(e){return this.premultiply(Ll.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ll.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ll=new ct;function Uf(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Qr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Dm(){let s=Qr("canvas");return s.style.display="block",s}var td={};function zh(s){s in td||(td[s]=!0,console.warn(s))}function Um(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var nd=new ct().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),id=new ct().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ca={[en]:{transfer:xo,primaries:vo,toReference:s=>s,fromReference:s=>s},[Mt]:{transfer:Tt,primaries:vo,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[ol]:{transfer:xo,primaries:Mo,toReference:s=>s.applyMatrix3(id),fromReference:s=>s.applyMatrix3(nd)},[Bh]:{transfer:Tt,primaries:Mo,toReference:s=>s.convertSRGBToLinear().applyMatrix3(id),fromReference:s=>s.applyMatrix3(nd).convertLinearToSRGB()}},Nm=new Set([en,ol]),_t={enabled:!0,_workingColorSpace:en,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Nm.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;let n=Ca[e].toReference,i=Ca[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return Ca[s].primaries},getTransfer:function(s){return s===ki?xo:Ca[s].transfer}};function lr(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Dl(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Ns,Vc=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ns===void 0&&(Ns=Qr("canvas")),Ns.width=e.width,Ns.height=e.height;let n=Ns.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ns}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Qr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=lr(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(lr(t[n]/255)*255):t[n]=lr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Om=0,bo=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Om++}),this.uuid=Vn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Ul(i[a].image)):r.push(Ul(i[a]))}else r=Ul(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function Ul(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Vc.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Fm=0,un=class s extends Gi{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=Ct,i=Ct,r=Ht,a=ri,o=Hn,l=Ti,c=s.DEFAULT_ANISOTROPY,h=ki){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fm++}),this.uuid=Vn(),this.name="",this.source=new bo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ce(0,0),this.repeat=new ce(1,1),this.center=new ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ct,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==vf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ms:e.x=e.x-Math.floor(e.x);break;case Ct:e.x=e.x<0?0:1;break;case Zr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ms:e.y=e.y-Math.floor(e.y);break;case Ct:e.y=e.y<0?0:1;break;case Zr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};un.DEFAULT_IMAGE=null;un.DEFAULT_MAPPING=vf;un.DEFAULT_ANISOTROPY=1;var Et=class s{constructor(e=0,t=0,n=0,i=1){s.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(c+1)/2,S=(f+1)/2,F=(p+1)/2,R=(h+d)/4,P=(u+_)/4,L=(g+m)/4;return y>S&&y>F?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=R/n,r=P/n):S>F?S<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(S),n=R/i,r=L/i):F<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(F),n=P/r,i=L/r),this.set(n,i,r,t),this}let M=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-_)/M,this.z=(d-h)/M,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Gc=class extends Gi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Et(0,0,e,t),this.scissorTest=!1,this.viewport=new Et(0,0,e,t);let i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ht,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new un(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new bo(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},An=class extends Gc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},wo=class extends un{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=vn,this.minFilter=vn,this.wrapR=Ct,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Wc=class extends un{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=vn,this.minFilter=vn,this.wrapR=Ct,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Pn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==d||c!==f||h!==g){let m=1-o,p=l*d+c*f+h*g+u*_,M=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){let F=Math.sqrt(y),R=Math.atan2(F,p*M);m=Math.sin(m*R)/F,o=Math.sin(o*R)/F}let S=o*M;if(l=l*m+d*S,c=c*m+f*S,h=h*m+g*S,u=u*m+_*S,m===1-o){let F=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=F,c*=F,h*=F,u*=F}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-o*f,e[t+2]=c*g+h*f+o*d-l*u,e[t+3]=h*g-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(r/2),d=l(n/2),f=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>u){let f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>u){let f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Jt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,r=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},A=class s{constructor(e=0,t=0,n=0){s.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(sd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(sd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-r*i),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=i+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Nl.copy(this).projectOnVector(e),this.sub(Nl)}reflect(e){return this.sub(Nl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Jt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Nl=new A,sd=new Pn,Xn=class{constructor(e=new A(1/0,1/0,1/0),t=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ti.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ti.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ti.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ti):ti.fromBufferAttribute(r,a),ti.applyMatrix4(e.matrixWorld),this.expandByPoint(ti);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Pa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Pa.copy(n.boundingBox)),Pa.applyMatrix4(e.matrixWorld),this.union(Pa)}let i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,ti),ti.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ir),Ia.subVectors(this.max,Ir),Os.subVectors(e.a,Ir),Fs.subVectors(e.b,Ir),Bs.subVectors(e.c,Ir),Di.subVectors(Fs,Os),Ui.subVectors(Bs,Fs),as.subVectors(Os,Bs);let t=[0,-Di.z,Di.y,0,-Ui.z,Ui.y,0,-as.z,as.y,Di.z,0,-Di.x,Ui.z,0,-Ui.x,as.z,0,-as.x,-Di.y,Di.x,0,-Ui.y,Ui.x,0,-as.y,as.x,0];return!Ol(t,Os,Fs,Bs,Ia)||(t=[1,0,0,0,1,0,0,0,1],!Ol(t,Os,Fs,Bs,Ia))?!1:(La.crossVectors(Di,Ui),t=[La.x,La.y,La.z],Ol(t,Os,Fs,Bs,Ia))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ti).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ti).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},gi=[new A,new A,new A,new A,new A,new A,new A,new A],ti=new A,Pa=new Xn,Os=new A,Fs=new A,Bs=new A,Di=new A,Ui=new A,as=new A,Ir=new A,Ia=new A,La=new A,os=new A;function Ol(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){os.fromArray(s,r);let o=i.x*Math.abs(os.x)+i.y*Math.abs(os.y)+i.z*Math.abs(os.z),l=e.dot(os),c=t.dot(os),h=n.dot(os);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Bm=new Xn,Lr=new A,Fl=new A,Fn=class{constructor(e=new A,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Bm.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Lr.subVectors(e,this.center);let t=Lr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Lr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Fl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Lr.copy(e.center).add(Fl)),this.expandByPoint(Lr.copy(e.center).sub(Fl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},_i=new A,Bl=new A,Da=new A,Ni=new A,kl=new A,Ua=new A,zl=new A,_s=class{constructor(e=new A,t=new A(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_i)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=_i.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_i.copy(this.origin).addScaledVector(this.direction,t),_i.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Bl.copy(e).add(t).multiplyScalar(.5),Da.copy(t).sub(e).normalize(),Ni.copy(this.origin).sub(Bl);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Da),o=Ni.dot(this.direction),l=-Ni.dot(Da),c=Ni.lengthSq(),h=Math.abs(1-a*a),u,d,f,g;if(h>0)if(u=a*l-o,d=a*o-l,g=r*h,u>=0)if(d>=-g)if(d<=g){let _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Bl).addScaledVector(Da,d),f}intersectSphere(e,t){_i.subVectors(e.center,this.origin);let n=_i.dot(this.direction),i=_i.dot(_i)-n*n,r=e.radius*e.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,_i)!==null}intersectTriangle(e,t,n,i,r){kl.subVectors(t,e),Ua.subVectors(n,e),zl.crossVectors(kl,Ua);let a=this.direction.dot(zl),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ni.subVectors(this.origin,e);let l=o*this.direction.dot(Ua.crossVectors(Ni,Ua));if(l<0)return null;let c=o*this.direction.dot(kl.cross(Ni));if(c<0||l+c>a)return null;let h=-o*Ni.dot(zl);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},je=class s{constructor(e,t,n,i,r,a,o,l,c,h,u,d,f,g,_,m){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c,h,u,d,f,g,_,m)}set(e,t,n,i,r,a,o,l,c,h,u,d,f,g,_,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/ks.setFromMatrixColumn(e,0).length(),r=1/ks.setFromMatrixColumn(e,1).length(),a=1/ks.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=a*h,f=a*u,g=o*h,_=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-_*c,t[9]=-o*l,t[2]=_-d*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d+_*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=_+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d-_*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*h,f=a*u,g=o*h,_=o*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){let d=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=a*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(km,e,zm)}lookAt(e,t,n){let i=this.elements;return Nn.subVectors(e,t),Nn.lengthSq()===0&&(Nn.z=1),Nn.normalize(),Oi.crossVectors(n,Nn),Oi.lengthSq()===0&&(Math.abs(n.z)===1?Nn.x+=1e-4:Nn.z+=1e-4,Nn.normalize(),Oi.crossVectors(n,Nn)),Oi.normalize(),Na.crossVectors(Nn,Oi),i[0]=Oi.x,i[4]=Na.x,i[8]=Nn.x,i[1]=Oi.y,i[5]=Na.y,i[9]=Nn.y,i[2]=Oi.z,i[6]=Na.z,i[10]=Nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],M=n[3],y=n[7],S=n[11],F=n[15],R=i[0],P=i[4],L=i[8],b=i[12],v=i[1],U=i[5],G=i[9],z=i[13],B=i[2],ee=i[6],W=i[10],ie=i[14],j=i[3],be=i[7],xe=i[11],Ce=i[15];return r[0]=a*R+o*v+l*B+c*j,r[4]=a*P+o*U+l*ee+c*be,r[8]=a*L+o*G+l*W+c*xe,r[12]=a*b+o*z+l*ie+c*Ce,r[1]=h*R+u*v+d*B+f*j,r[5]=h*P+u*U+d*ee+f*be,r[9]=h*L+u*G+d*W+f*xe,r[13]=h*b+u*z+d*ie+f*Ce,r[2]=g*R+_*v+m*B+p*j,r[6]=g*P+_*U+m*ee+p*be,r[10]=g*L+_*G+m*W+p*xe,r[14]=g*b+_*z+m*ie+p*Ce,r[3]=M*R+y*v+S*B+F*j,r[7]=M*P+y*U+S*ee+F*be,r[11]=M*L+y*G+S*W+F*xe,r[15]=M*b+y*z+S*ie+F*Ce,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*l*u-i*c*u-r*o*d+n*c*d+i*o*f-n*l*f)+_*(+t*l*f-t*c*d+r*a*d-i*a*f+i*c*h-r*l*h)+m*(+t*c*u-t*o*f-r*a*u+n*a*f+r*o*h-n*c*h)+p*(-i*o*h-t*l*u+t*o*d+i*a*u-n*a*d+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],M=u*m*c-_*d*c+_*l*f-o*m*f-u*l*p+o*d*p,y=g*d*c-h*m*c-g*l*f+a*m*f+h*l*p-a*d*p,S=h*_*c-g*u*c+g*o*f-a*_*f-h*o*p+a*u*p,F=g*u*l-h*_*l-g*o*d+a*_*d+h*o*m-a*u*m,R=t*M+n*y+i*S+r*F;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let P=1/R;return e[0]=M*P,e[1]=(_*d*r-u*m*r-_*i*f+n*m*f+u*i*p-n*d*p)*P,e[2]=(o*m*r-_*l*r+_*i*c-n*m*c-o*i*p+n*l*p)*P,e[3]=(u*l*r-o*d*r-u*i*c+n*d*c+o*i*f-n*l*f)*P,e[4]=y*P,e[5]=(h*m*r-g*d*r+g*i*f-t*m*f-h*i*p+t*d*p)*P,e[6]=(g*l*r-a*m*r-g*i*c+t*m*c+a*i*p-t*l*p)*P,e[7]=(a*d*r-h*l*r+h*i*c-t*d*c-a*i*f+t*l*f)*P,e[8]=S*P,e[9]=(g*u*r-h*_*r-g*n*f+t*_*f+h*n*p-t*u*p)*P,e[10]=(a*_*r-g*o*r+g*n*c-t*_*c-a*n*p+t*o*p)*P,e[11]=(h*o*r-a*u*r-h*n*c+t*u*c+a*n*f-t*o*f)*P,e[12]=F*P,e[13]=(h*_*i-g*u*i+g*n*d-t*_*d-h*n*m+t*u*m)*P,e[14]=(g*o*i-a*_*i-g*n*l+t*_*l+a*n*m-t*o*m)*P,e[15]=(a*u*i-h*o*i+h*n*l-t*u*l-a*n*d+t*o*d)*P,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,g=r*u,_=a*h,m=a*u,p=o*u,M=l*c,y=l*h,S=l*u,F=n.x,R=n.y,P=n.z;return i[0]=(1-(_+p))*F,i[1]=(f+S)*F,i[2]=(g-y)*F,i[3]=0,i[4]=(f-S)*R,i[5]=(1-(d+p))*R,i[6]=(m+M)*R,i[7]=0,i[8]=(g+y)*P,i[9]=(m-M)*P,i[10]=(1-(d+_))*P,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,r=ks.set(i[0],i[1],i[2]).length(),a=ks.set(i[4],i[5],i[6]).length(),o=ks.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],ni.copy(this);let c=1/r,h=1/a,u=1/o;return ni.elements[0]*=c,ni.elements[1]*=c,ni.elements[2]*=c,ni.elements[4]*=h,ni.elements[5]*=h,ni.elements[6]*=h,ni.elements[8]*=u,ni.elements[9]*=u,ni.elements[10]*=u,t.setFromRotationMatrix(ni),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,a,o=Ei){let l=this.elements,c=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i),f,g;if(o===Ei)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===So)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=Ei){let l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(a-r),d=(t+e)*c,f=(n+i)*h,g,_;if(o===Ei)g=(a+r)*u,_=-2*u;else if(o===So)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ks=new A,ni=new je,km=new A(0,0,0),zm=new A(1,1,1),Oi=new A,Na=new A,Nn=new A,rd=new je,ad=new Pn,qn=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Jt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Jt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Jt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Jt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Jt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return rd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(rd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ad.setFromEuler(this),this.setFromQuaternion(ad,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};qn.DEFAULT_ORDER="XYZ";var jr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Hm=0,od=new A,zs=new Pn,yi=new je,Oa=new A,Dr=new A,Vm=new A,Gm=new Pn,ld=new A(1,0,0),cd=new A(0,1,0),hd=new A(0,0,1),ud={type:"added"},Wm={type:"removed"},Hs={type:"childadded",child:null},Hl={type:"childremoved",child:null},kt=class s extends Gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hm++}),this.uuid=Vn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new A,t=new qn,n=new Pn,i=new A(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new je},normalMatrix:{value:new ct}}),this.matrix=new je,this.matrixWorld=new je,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return zs.setFromAxisAngle(e,t),this.quaternion.multiply(zs),this}rotateOnWorldAxis(e,t){return zs.setFromAxisAngle(e,t),this.quaternion.premultiply(zs),this}rotateX(e){return this.rotateOnAxis(ld,e)}rotateY(e){return this.rotateOnAxis(cd,e)}rotateZ(e){return this.rotateOnAxis(hd,e)}translateOnAxis(e,t){return od.copy(e).applyQuaternion(this.quaternion),this.position.add(od.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ld,e)}translateY(e){return this.translateOnAxis(cd,e)}translateZ(e){return this.translateOnAxis(hd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Oa.copy(e):Oa.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Dr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yi.lookAt(Dr,Oa,this.up):yi.lookAt(Oa,Dr,this.up),this.quaternion.setFromRotationMatrix(yi),i&&(yi.extractRotation(i.matrixWorld),zs.setFromRotationMatrix(yi),this.quaternion.premultiply(zs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ud),Hs.child=e,this.dispatchEvent(Hs),Hs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Wm),Hl.child=e,this.dispatchEvent(Hl),Hl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yi.multiply(e.parent.matrixWorld)),e.applyMatrix4(yi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ud),Hs.child=e,this.dispatchEvent(Hs),Hs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Dr,e,Vm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Dr,Gm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};kt.DEFAULT_UP=new A(0,1,0);kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ii=new A,xi=new A,Vl=new A,vi=new A,Vs=new A,Gs=new A,dd=new A,Gl=new A,Wl=new A,Xl=new A,zi=class s{constructor(e=new A,t=new A,n=new A){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),ii.subVectors(e,t),i.cross(ii);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){ii.subVectors(i,t),xi.subVectors(n,t),Vl.subVectors(e,t);let a=ii.dot(ii),o=ii.dot(xi),l=ii.dot(Vl),c=xi.dot(xi),h=xi.dot(Vl),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,vi)===null?!1:vi.x>=0&&vi.y>=0&&vi.x+vi.y<=1}static getInterpolation(e,t,n,i,r,a,o,l){return this.getBarycoord(e,t,n,i,vi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,vi.x),l.addScaledVector(a,vi.y),l.addScaledVector(o,vi.z),l)}static isFrontFacing(e,t,n,i){return ii.subVectors(n,t),xi.subVectors(e,t),ii.cross(xi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ii.subVectors(this.c,this.b),xi.subVectors(this.a,this.b),ii.cross(xi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,a,o;Vs.subVectors(i,n),Gs.subVectors(r,n),Gl.subVectors(e,n);let l=Vs.dot(Gl),c=Gs.dot(Gl);if(l<=0&&c<=0)return t.copy(n);Wl.subVectors(e,i);let h=Vs.dot(Wl),u=Gs.dot(Wl);if(h>=0&&u<=h)return t.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Vs,a);Xl.subVectors(e,r);let f=Vs.dot(Xl),g=Gs.dot(Xl);if(g>=0&&f<=g)return t.copy(r);let _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Gs,o);let m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return dd.subVectors(r,i),o=(u-h)/(u-h+(f-g)),t.copy(i).addScaledVector(dd,o);let p=1/(m+_+d);return a=_*p,o=d*p,t.copy(n).addScaledVector(Vs,a).addScaledVector(Gs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Nf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Fi={h:0,s:0,l:0},Fa={h:0,s:0,l:0};function ql(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var Ne=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Mt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,_t.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=_t.workingColorSpace){return this.r=e,this.g=t,this.b=n,_t.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=_t.workingColorSpace){if(e=kh(e,1),t=Jt(t,0,1),n=Jt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=ql(a,r,e+1/3),this.g=ql(a,r,e),this.b=ql(a,r,e-1/3)}return _t.toWorkingColorSpace(this,i),this}setStyle(e,t=Mt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Mt){let n=Nf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=lr(e.r),this.g=lr(e.g),this.b=lr(e.b),this}copyLinearToSRGB(e){return this.r=Dl(e.r),this.g=Dl(e.g),this.b=Dl(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Mt){return _t.fromWorkingColorSpace(xn.copy(this),e),Math.round(Jt(xn.r*255,0,255))*65536+Math.round(Jt(xn.g*255,0,255))*256+Math.round(Jt(xn.b*255,0,255))}getHexString(e=Mt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=_t.workingColorSpace){_t.fromWorkingColorSpace(xn.copy(this),t);let n=xn.r,i=xn.g,r=xn.b,a=Math.max(n,i,r),o=Math.min(n,i,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=_t.workingColorSpace){return _t.fromWorkingColorSpace(xn.copy(this),t),e.r=xn.r,e.g=xn.g,e.b=xn.b,e}getStyle(e=Mt){_t.fromWorkingColorSpace(xn.copy(this),e);let t=xn.r,n=xn.g,i=xn.b;return e!==Mt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Fi),this.setHSL(Fi.h+e,Fi.s+t,Fi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Fi),e.getHSL(Fa);let n=Wr(Fi.h,Fa.h,t),i=Wr(Fi.s,Fa.s,t),r=Wr(Fi.l,Fa.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},xn=new Ne;Ne.NAMES=Nf;var Xm=0,In=class extends Gi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xm++}),this.uuid=Vn(),this.name="",this.type="Material",this.blending=rr,this.side=Gn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=dc,this.blendDst=fc,this.blendEquation=fs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ne(0,0,0),this.blendAlpha=0,this.depthFunc=yo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Us,this.stencilZFail=Us,this.stencilZPass=Us,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==rr&&(n.blending=this.blending),this.side!==Gn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==dc&&(n.blendSrc=this.blendSrc),this.blendDst!==fc&&(n.blendDst=this.blendDst),this.blendEquation!==fs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==yo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Qu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Us&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Us&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Us&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}onBeforeRender(){console.warn("Material: onBeforeRender() has been removed.")}},Pt=class extends In{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.combine=xf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},wi=qm();function qm(){let s=new ArrayBuffer(4),e=new Float32Array(s),t=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}let r=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(c&8388608)===0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,r[l]=c|h}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:a,offsetTable:o}}function Ym(s){Math.abs(s)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),s=Jt(s,-65504,65504),wi.floatView[0]=s;let e=wi.uint32View[0],t=e>>23&511;return wi.baseTable[t]+((e&8388607)>>wi.shiftTable[t])}function $m(s){let e=s>>10;return wi.uint32View[0]=wi.mantissaTable[wi.offsetTable[e]+(s&1023)]+wi.exponentTable[e],wi.floatView[0]}var ga={toHalfFloat:Ym,fromHalfFloat:$m},Zt=new A,Ba=new ce,rn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Hc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Tn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return zh("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ba.fromBufferAttribute(this,t),Ba.applyMatrix3(e),this.setXY(t,Ba.x,Ba.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix3(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix4(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyNormalMatrix(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.transformDirection(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=si(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=bt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=si(t,this.array)),t}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=si(t,this.array)),t}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=si(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=si(t,this.array)),t}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),i=bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),i=bt(i,this.array),r=bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Hc&&(e.usage=this.usage),e}};var Eo=class extends rn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var To=class extends rn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var ft=class extends rn{constructor(e,t,n){super(new Float32Array(e),t,n)}},Km=0,zn=new je,Yl=new kt,Ws=new A,On=new Xn,Ur=new Xn,hn=new A,Ot=class s extends Gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Km++}),this.uuid=Vn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Uf(e)?To:Eo)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new ct().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return zn.makeRotationFromQuaternion(e),this.applyMatrix4(zn),this}rotateX(e){return zn.makeRotationX(e),this.applyMatrix4(zn),this}rotateY(e){return zn.makeRotationY(e),this.applyMatrix4(zn),this}rotateZ(e){return zn.makeRotationZ(e),this.applyMatrix4(zn),this}translate(e,t,n){return zn.makeTranslation(e,t,n),this.applyMatrix4(zn),this}scale(e,t,n){return zn.makeScale(e,t,n),this.applyMatrix4(zn),this}lookAt(e){return Yl.lookAt(e),Yl.updateMatrix(),this.applyMatrix4(Yl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ws).negate(),this.translate(Ws.x,Ws.y,Ws.z),this}setFromPoints(e){let t=[];for(let n=0,i=e.length;n<i;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ft(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];On.setFromBufferAttribute(r),this.morphTargetsRelative?(hn.addVectors(this.boundingBox.min,On.min),this.boundingBox.expandByPoint(hn),hn.addVectors(this.boundingBox.max,On.max),this.boundingBox.expandByPoint(hn)):(this.boundingBox.expandByPoint(On.min),this.boundingBox.expandByPoint(On.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(e){let n=this.boundingSphere.center;if(On.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Ur.setFromBufferAttribute(o),this.morphTargetsRelative?(hn.addVectors(On.min,Ur.min),On.expandByPoint(hn),hn.addVectors(On.max,Ur.max),On.expandByPoint(hn)):(On.expandByPoint(Ur.min),On.expandByPoint(Ur.max))}On.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)hn.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(hn));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)hn.fromBufferAttribute(o,c),l&&(Ws.fromBufferAttribute(e,c),hn.add(Ws)),i=Math.max(i,n.distanceToSquared(hn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new rn(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let L=0;L<n.count;L++)o[L]=new A,l[L]=new A;let c=new A,h=new A,u=new A,d=new ce,f=new ce,g=new ce,_=new A,m=new A;function p(L,b,v){c.fromBufferAttribute(n,L),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,v),d.fromBufferAttribute(r,L),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,v),h.sub(c),u.sub(c),f.sub(d),g.sub(d);let U=1/(f.x*g.y-g.x*f.y);isFinite(U)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(U),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(U),o[L].add(_),o[b].add(_),o[v].add(_),l[L].add(m),l[b].add(m),l[v].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let L=0,b=M.length;L<b;++L){let v=M[L],U=v.start,G=v.count;for(let z=U,B=U+G;z<B;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}let y=new A,S=new A,F=new A,R=new A;function P(L){F.fromBufferAttribute(i,L),R.copy(F);let b=o[L];y.copy(b),y.sub(F.multiplyScalar(F.dot(b))).normalize(),S.crossVectors(R,b);let U=S.dot(l[L])<0?-1:1;a.setXYZW(L,y.x,y.y,y.z,U)}for(let L=0,b=M.length;L<b;++L){let v=M[L],U=v.start,G=v.count;for(let z=U,B=U+G;z<B;z+=3)P(e.getX(z+0)),P(e.getX(z+1)),P(e.getX(z+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new rn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new A,r=new A,a=new A,o=new A,l=new A,c=new A,h=new A,u=new A;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)hn.fromBufferAttribute(e,t),hn.normalize(),e.setXYZ(t,hn.x,hn.y,hn.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),f=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new rn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},fd=new je,ls=new _s,ka=new Fn,pd=new A,Xs=new A,qs=new A,Ys=new A,$l=new A,za=new A,Ha=new ce,Va=new ce,Ga=new ce,md=new A,gd=new A,_d=new A,Wa=new A,Xa=new A,Xt=class extends kt{constructor(e=new Ot,t=new Pt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(r&&o){za.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&($l.fromBufferAttribute(u,e),a?za.addScaledVector($l,h):za.addScaledVector($l.sub(t),h))}t.add(za)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ka.copy(n.boundingSphere),ka.applyMatrix4(r),ls.copy(e.ray).recast(e.near),!(ka.containsPoint(ls.origin)===!1&&(ls.intersectSphere(ka,pd)===null||ls.origin.distanceToSquared(pd)>(e.far-e.near)**2))&&(fd.copy(r).invert(),ls.copy(e.ray).applyMatrix4(fd),!(n.boundingBox!==null&&ls.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ls)))}_computeIntersections(e,t,n){let i,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){let m=d[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),y=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let S=M,F=y;S<F;S+=3){let R=o.getX(S),P=o.getX(S+1),L=o.getX(S+2);i=qa(this,p,e,n,c,h,u,R,P,L),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let M=o.getX(m),y=o.getX(m+1),S=o.getX(m+2);i=qa(this,a,e,n,c,h,u,M,y,S),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){let m=d[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),y=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let S=M,F=y;S<F;S+=3){let R=S,P=S+1,L=S+2;i=qa(this,p,e,n,c,h,u,R,P,L),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let M=m,y=m+1,S=m+2;i=qa(this,a,e,n,c,h,u,M,y,S),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}};function Zm(s,e,t,n,i,r,a,o){let l;if(e.side===Cn?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,e.side===Gn,o),l===null)return null;Xa.copy(o),Xa.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(Xa);return c<t.near||c>t.far?null:{distance:c,point:Xa.clone(),object:s}}function qa(s,e,t,n,i,r,a,o,l,c){s.getVertexPosition(o,Xs),s.getVertexPosition(l,qs),s.getVertexPosition(c,Ys);let h=Zm(s,e,t,n,Xs,qs,Ys,Wa);if(h){i&&(Ha.fromBufferAttribute(i,o),Va.fromBufferAttribute(i,l),Ga.fromBufferAttribute(i,c),h.uv=zi.getInterpolation(Wa,Xs,qs,Ys,Ha,Va,Ga,new ce)),r&&(Ha.fromBufferAttribute(r,o),Va.fromBufferAttribute(r,l),Ga.fromBufferAttribute(r,c),h.uv1=zi.getInterpolation(Wa,Xs,qs,Ys,Ha,Va,Ga,new ce)),a&&(md.fromBufferAttribute(a,o),gd.fromBufferAttribute(a,l),_d.fromBufferAttribute(a,c),h.normal=zi.getInterpolation(Wa,Xs,qs,Ys,md,gd,_d,new A),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new A,materialIndex:0};zi.getNormal(Xs,qs,Ys,u.normal),h.face=u}return h}var hi=class s extends Ot{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new ft(c,3)),this.setAttribute("normal",new ft(h,3)),this.setAttribute("uv",new ft(u,2));function g(_,m,p,M,y,S,F,R,P,L,b){let v=S/P,U=F/L,G=S/2,z=F/2,B=R/2,ee=P+1,W=L+1,ie=0,j=0,be=new A;for(let xe=0;xe<W;xe++){let Ce=xe*U-z;for(let Ge=0;Ge<ee;Ge++){let $e=Ge*v-G;be[_]=$e*M,be[m]=Ce*y,be[p]=B,c.push(be.x,be.y,be.z),be[_]=0,be[m]=0,be[p]=R>0?1:-1,h.push(be.x,be.y,be.z),u.push(Ge/P),u.push(1-xe/L),ie+=1}}for(let xe=0;xe<L;xe++)for(let Ce=0;Ce<P;Ce++){let Ge=d+Ce+ee*xe,$e=d+Ce+ee*(xe+1),ne=d+(Ce+1)+ee*(xe+1),he=d+(Ce+1)+ee*xe;l.push(Ge,$e,he),l.push($e,ne,he),j+=6}o.addGroup(f,j,b),f+=j,d+=ie}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function _r(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function En(s){let e={};for(let t=0;t<s.length;t++){let n=_r(s[t]);for(let i in n)e[i]=n[i]}return e}function Jm(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Of(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:_t.workingColorSpace}var ji={clone:_r,merge:En},Qm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,jm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,an=class extends In{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qm,this.fragmentShader=jm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=_r(e.uniforms),this.uniformsGroups=Jm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Ao=class extends kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new je,this.projectionMatrix=new je,this.projectionMatrixInverse=new je,this.coordinateSystem=Ei}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Bi=new A,yd=new ce,xd=new ce,sn=class extends Ao{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=gr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(or*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return gr*2*Math.atan(Math.tan(or*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Bi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Bi.x,Bi.y).multiplyScalar(-e/Bi.z),Bi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Bi.x,Bi.y).multiplyScalar(-e/Bi.z)}getViewSize(e,t){return this.getViewBounds(e,yd,xd),t.subVectors(xd,yd)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(or*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},$s=-90,Ks=1,Xc=class extends kt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new sn($s,Ks,e,t);i.layers=this.layers,this.add(i);let r=new sn($s,Ks,e,t);r.layers=this.layers,this.add(r);let a=new sn($s,Ks,e,t);a.layers=this.layers,this.add(a);let o=new sn($s,Ks,e,t);o.layers=this.layers,this.add(o);let l=new sn($s,Ks,e,t);l.layers=this.layers,this.add(l);let c=new sn($s,Ks,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Ei)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===So)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Ro=class extends un{constructor(e,t,n,i,r,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:hr,super(e,t,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},qc=class extends An{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ro(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ht}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new hi(5,5,5),r=new an({name:"CubemapFromEquirect",uniforms:_r(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Cn,blending:ci});r.uniforms.tEquirect.value=t;let a=new Xt(i,r),o=t.minFilter;return t.minFilter===ri&&(t.minFilter=Ht),new Xc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}},Kl=new A,e0=new A,t0=new ct,bi=class{constructor(e=new A(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Kl.subVectors(n,t).cross(e0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Kl),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||t0.getNormalMatrix(e),i=this.coplanarPoint(Kl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},cs=new Fn,Ya=new A,ea=class{constructor(e=new bi,t=new bi,n=new bi,i=new bi,r=new bi,a=new bi){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ei){let n=this.planes,i=e.elements,r=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],g=i[9],_=i[10],m=i[11],p=i[12],M=i[13],y=i[14],S=i[15];if(n[0].setComponents(l-r,d-c,m-f,S-p).normalize(),n[1].setComponents(l+r,d+c,m+f,S+p).normalize(),n[2].setComponents(l+a,d+h,m+g,S+M).normalize(),n[3].setComponents(l-a,d-h,m-g,S-M).normalize(),n[4].setComponents(l-o,d-u,m-_,S-y).normalize(),t===Ei)n[5].setComponents(l+o,d+u,m+_,S+y).normalize();else if(t===So)n[5].setComponents(o,u,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),cs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),cs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(cs)}intersectsSprite(e){return cs.center.set(0,0,0),cs.radius=.7071067811865476,cs.applyMatrix4(e.matrixWorld),this.intersectsSphere(cs)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Ya.x=i.normal.x>0?e.max.x:e.min.x,Ya.y=i.normal.y>0?e.max.y:e.min.y,Ya.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ya)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Ff(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function n0(s){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){let h=l.array,u=l._updateRange,d=l.updateRanges;if(s.bindBuffer(c,o),u.count===-1&&d.length===0&&s.bufferSubData(c,0,h),d.length!==0){for(let f=0,g=d.length;f<g;f++){let _=d[f];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}u.count!==-1&&(s.bufferSubData(c,u.offset*h.BYTES_PER_ELEMENT,h,u.offset,u.count),u.count=-1),l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(s.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var yr=class s extends Ot{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=e/o,d=t/l,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){let M=p*d-a;for(let y=0;y<c;y++){let S=y*u-r;g.push(S,-M,0),_.push(0,0,1),m.push(y/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<o;M++){let y=M+c*p,S=M+c*(p+1),F=M+1+c*(p+1),R=M+1+c*p;f.push(y,S,R),f.push(S,F,R)}this.setIndex(f),this.setAttribute("position",new ft(g,3)),this.setAttribute("normal",new ft(_,3)),this.setAttribute("uv",new ft(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},i0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,s0=`#ifdef USE_ALPHAHASH
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
#endif`,r0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,a0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,o0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,l0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,c0=`#ifdef USE_AOMAP
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
#endif`,h0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,u0=`#ifdef USE_BATCHING
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
#endif`,d0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,f0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,p0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,m0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,g0=`#ifdef USE_IRIDESCENCE
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
#endif`,_0=`#ifdef USE_BUMPMAP
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
#endif`,y0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,x0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,v0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,M0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,S0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,b0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,w0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,E0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,T0=`#define PI 3.141592653589793
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
} // validated`,A0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,R0=`vec3 transformedNormal = objectNormal;
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
#endif`,C0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,P0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,I0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,L0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,D0="gl_FragColor = linearToOutputTexel( gl_FragColor );",U0=`
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
}`,N0=`#ifdef USE_ENVMAP
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
#endif`,O0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif

#endif`,F0=`#ifdef USE_ENVMAP
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
#endif`,B0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,k0=`#ifdef USE_ENVMAP
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
#endif`,z0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,H0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,V0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,G0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,W0=`#ifdef USE_GRADIENTMAP
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
}`,X0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,q0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Y0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$0=`uniform bool receiveShadow;
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
#endif`,K0=`#ifdef USE_ENVMAP
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
#endif`,Z0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,J0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Q0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,j0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,eg=`PhysicalMaterial material;
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
#endif`,tg=`struct PhysicalMaterial {
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
}`,ng=`
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
#endif`,ig=`#if defined( RE_IndirectDiffuse )
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
#endif`,sg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ag=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,og=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,cg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );

	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ug=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,dg=`#if defined( USE_POINTS_UV )
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
#endif`,fg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,pg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,mg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,gg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_g=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yg=`#ifdef USE_MORPHTARGETS
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
#endif`,xg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Mg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Sg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Eg=`#ifdef USE_NORMALMAP
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
#endif`,Tg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ag=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Pg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ig=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Lg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Dg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ug=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ng=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Og=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Fg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Hg=`float getShadowMask() {
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
}`,Vg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Gg=`#ifdef USE_SKINNING
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
#endif`,Wg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xg=`#ifdef USE_SKINNING
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
#endif`,qg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Yg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$g=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Kg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zg=`#ifdef USE_TRANSMISSION
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
#endif`,Jg=`#ifdef USE_TRANSMISSION
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
#endif`,Qg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,e_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,t_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,n_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,i_=`uniform sampler2D t2D;
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
}`,s_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,r_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,a_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,o_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,l_=`#include <common>
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
}`,c_=`#if DEPTH_PACKING == 3200
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
}`,h_=`#define DISTANCE
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
}`,u_=`#define DISTANCE
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
}`,d_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,f_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,p_=`uniform float scale;
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
}`,m_=`uniform vec3 diffuse;
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
}`,g_=`#include <common>
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
}`,__=`uniform vec3 diffuse;
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
}`,y_=`#define LAMBERT
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
}`,x_=`#define LAMBERT
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
}`,v_=`#define MATCAP
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
}`,M_=`#define MATCAP
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
}`,S_=`#define NORMAL
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
}`,b_=`#define NORMAL
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
}`,w_=`#define PHONG
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
}`,E_=`#define PHONG
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
}`,T_=`#define STANDARD
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
}`,A_=`#define STANDARD
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
}`,R_=`#define TOON
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
}`,C_=`#define TOON
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
}`,P_=`uniform float size;
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
}`,I_=`uniform vec3 diffuse;
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
}`,L_=`#include <common>
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
}`,D_=`uniform vec3 color;
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
}`,U_=`uniform float rotation;
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
}`,N_=`uniform vec3 diffuse;
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
}`,lt={alphahash_fragment:i0,alphahash_pars_fragment:s0,alphamap_fragment:r0,alphamap_pars_fragment:a0,alphatest_fragment:o0,alphatest_pars_fragment:l0,aomap_fragment:c0,aomap_pars_fragment:h0,batching_pars_vertex:u0,batching_vertex:d0,begin_vertex:f0,beginnormal_vertex:p0,bsdfs:m0,iridescence_fragment:g0,bumpmap_pars_fragment:_0,clipping_planes_fragment:y0,clipping_planes_pars_fragment:x0,clipping_planes_pars_vertex:v0,clipping_planes_vertex:M0,color_fragment:S0,color_pars_fragment:b0,color_pars_vertex:w0,color_vertex:E0,common:T0,cube_uv_reflection_fragment:A0,defaultnormal_vertex:R0,displacementmap_pars_vertex:C0,displacementmap_vertex:P0,emissivemap_fragment:I0,emissivemap_pars_fragment:L0,colorspace_fragment:D0,colorspace_pars_fragment:U0,envmap_fragment:N0,envmap_common_pars_fragment:O0,envmap_pars_fragment:F0,envmap_pars_vertex:B0,envmap_physical_pars_fragment:K0,envmap_vertex:k0,fog_vertex:z0,fog_pars_vertex:H0,fog_fragment:V0,fog_pars_fragment:G0,gradientmap_pars_fragment:W0,lightmap_pars_fragment:X0,lights_lambert_fragment:q0,lights_lambert_pars_fragment:Y0,lights_pars_begin:$0,lights_toon_fragment:Z0,lights_toon_pars_fragment:J0,lights_phong_fragment:Q0,lights_phong_pars_fragment:j0,lights_physical_fragment:eg,lights_physical_pars_fragment:tg,lights_fragment_begin:ng,lights_fragment_maps:ig,lights_fragment_end:sg,logdepthbuf_fragment:rg,logdepthbuf_pars_fragment:ag,logdepthbuf_pars_vertex:og,logdepthbuf_vertex:lg,map_fragment:cg,map_pars_fragment:hg,map_particle_fragment:ug,map_particle_pars_fragment:dg,metalnessmap_fragment:fg,metalnessmap_pars_fragment:pg,morphinstance_vertex:mg,morphcolor_vertex:gg,morphnormal_vertex:_g,morphtarget_pars_vertex:yg,morphtarget_vertex:xg,normal_fragment_begin:vg,normal_fragment_maps:Mg,normal_pars_fragment:Sg,normal_pars_vertex:bg,normal_vertex:wg,normalmap_pars_fragment:Eg,clearcoat_normal_fragment_begin:Tg,clearcoat_normal_fragment_maps:Ag,clearcoat_pars_fragment:Rg,iridescence_pars_fragment:Cg,opaque_fragment:Pg,packing:Ig,premultiplied_alpha_fragment:Lg,project_vertex:Dg,dithering_fragment:Ug,dithering_pars_fragment:Ng,roughnessmap_fragment:Og,roughnessmap_pars_fragment:Fg,shadowmap_pars_fragment:Bg,shadowmap_pars_vertex:kg,shadowmap_vertex:zg,shadowmask_pars_fragment:Hg,skinbase_vertex:Vg,skinning_pars_vertex:Gg,skinning_vertex:Wg,skinnormal_vertex:Xg,specularmap_fragment:qg,specularmap_pars_fragment:Yg,tonemapping_fragment:$g,tonemapping_pars_fragment:Kg,transmission_fragment:Zg,transmission_pars_fragment:Jg,uv_pars_fragment:Qg,uv_pars_vertex:jg,uv_vertex:e_,worldpos_vertex:t_,background_vert:n_,background_frag:i_,backgroundCube_vert:s_,backgroundCube_frag:r_,cube_vert:a_,cube_frag:o_,depth_vert:l_,depth_frag:c_,distanceRGBA_vert:h_,distanceRGBA_frag:u_,equirect_vert:d_,equirect_frag:f_,linedashed_vert:p_,linedashed_frag:m_,meshbasic_vert:g_,meshbasic_frag:__,meshlambert_vert:y_,meshlambert_frag:x_,meshmatcap_vert:v_,meshmatcap_frag:M_,meshnormal_vert:S_,meshnormal_frag:b_,meshphong_vert:w_,meshphong_frag:E_,meshphysical_vert:T_,meshphysical_frag:A_,meshtoon_vert:R_,meshtoon_frag:C_,points_vert:P_,points_frag:I_,shadow_vert:L_,shadow_frag:D_,sprite_vert:U_,sprite_frag:N_},Se={common:{diffuse:{value:new Ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ct}},envmap:{envMap:{value:null},envMapRotation:{value:new ct},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ct}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ct}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ct},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ct},normalScale:{value:new ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ct},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ct}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ct}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ct}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0},uvTransform:{value:new ct}},sprite:{diffuse:{value:new Ne(16777215)},opacity:{value:1},center:{value:new ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}}},li={basic:{uniforms:En([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.fog]),vertexShader:lt.meshbasic_vert,fragmentShader:lt.meshbasic_frag},lambert:{uniforms:En([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Ne(0)}}]),vertexShader:lt.meshlambert_vert,fragmentShader:lt.meshlambert_frag},phong:{uniforms:En([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Ne(0)},specular:{value:new Ne(1118481)},shininess:{value:30}}]),vertexShader:lt.meshphong_vert,fragmentShader:lt.meshphong_frag},standard:{uniforms:En([Se.common,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.roughnessmap,Se.metalnessmap,Se.fog,Se.lights,{emissive:{value:new Ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag},toon:{uniforms:En([Se.common,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.gradientmap,Se.fog,Se.lights,{emissive:{value:new Ne(0)}}]),vertexShader:lt.meshtoon_vert,fragmentShader:lt.meshtoon_frag},matcap:{uniforms:En([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,{matcap:{value:null}}]),vertexShader:lt.meshmatcap_vert,fragmentShader:lt.meshmatcap_frag},points:{uniforms:En([Se.points,Se.fog]),vertexShader:lt.points_vert,fragmentShader:lt.points_frag},dashed:{uniforms:En([Se.common,Se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:lt.linedashed_vert,fragmentShader:lt.linedashed_frag},depth:{uniforms:En([Se.common,Se.displacementmap]),vertexShader:lt.depth_vert,fragmentShader:lt.depth_frag},normal:{uniforms:En([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,{opacity:{value:1}}]),vertexShader:lt.meshnormal_vert,fragmentShader:lt.meshnormal_frag},sprite:{uniforms:En([Se.sprite,Se.fog]),vertexShader:lt.sprite_vert,fragmentShader:lt.sprite_frag},background:{uniforms:{uvTransform:{value:new ct},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:lt.background_vert,fragmentShader:lt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ct}},vertexShader:lt.backgroundCube_vert,fragmentShader:lt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:lt.cube_vert,fragmentShader:lt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:lt.equirect_vert,fragmentShader:lt.equirect_frag},distanceRGBA:{uniforms:En([Se.common,Se.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:lt.distanceRGBA_vert,fragmentShader:lt.distanceRGBA_frag},shadow:{uniforms:En([Se.lights,Se.fog,{color:{value:new Ne(0)},opacity:{value:1}}]),vertexShader:lt.shadow_vert,fragmentShader:lt.shadow_frag}};li.physical={uniforms:En([li.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ct},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ct},clearcoatNormalScale:{value:new ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ct},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ct},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ct},sheen:{value:0},sheenColor:{value:new Ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ct},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ct},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ct},transmissionSamplerSize:{value:new ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ct},attenuationDistance:{value:0},attenuationColor:{value:new Ne(0)},specularColor:{value:new Ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ct},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ct},anisotropyVector:{value:new ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ct}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag};var $a={r:0,b:0,g:0},hs=new qn,O_=new je;function F_(s,e,t,n,i,r,a){let o=new Ne(0),l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(M){let y=M.isScene===!0?M.background:null;return y&&y.isTexture&&(y=(M.backgroundBlurriness>0?t:e).get(y)),y}function _(M){let y=!1,S=g(M);S===null?p(o,l):S&&S.isColor&&(p(S,1),y=!0);let F=s.xr.getEnvironmentBlendMode();F==="additive"?n.buffers.color.setClear(0,0,0,1,a):F==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(M,y){let S=g(y);S&&(S.isCubeTexture||S.mapping===rl)?(h===void 0&&(h=new Xt(new hi(1,1,1),new an({name:"BackgroundCubeMaterial",uniforms:_r(li.backgroundCube.uniforms),vertexShader:li.backgroundCube.vertexShader,fragmentShader:li.backgroundCube.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(F,R,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),hs.copy(y.backgroundRotation),hs.x*=-1,hs.y*=-1,hs.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(hs.y*=-1,hs.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(O_.makeRotationFromEuler(hs)),h.material.toneMapped=_t.getTransfer(S.colorSpace)!==Tt,(u!==S||d!==S.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=S,d=S.version,f=s.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new Xt(new yr(2,2),new an({name:"BackgroundMaterial",uniforms:_r(li.background.uniforms),vertexShader:li.background.vertexShader,fragmentShader:li.background.fragmentShader,side:Gn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=_t.getTransfer(S.colorSpace)!==Tt,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=S,d=S.version,f=s.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,y){M.getRGB($a,Of(s)),n.buffers.color.setClear($a.r,$a.g,$a.b,y,a)}return{getClearColor:function(){return o},setClearColor:function(M,y=1){o.set(M),l=y,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,p(o,l)},render:_,addToRenderList:m}}function B_(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,a=!1;function o(v,U,G,z,B){let ee=!1,W=u(z,G,U);r!==W&&(r=W,c(r.object)),ee=f(v,z,G,B),ee&&g(v,z,G,B),B!==null&&e.update(B,s.ELEMENT_ARRAY_BUFFER),(ee||a)&&(a=!1,S(v,U,G,z),B!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return s.createVertexArray()}function c(v){return s.bindVertexArray(v)}function h(v){return s.deleteVertexArray(v)}function u(v,U,G){let z=G.wireframe===!0,B=n[v.id];B===void 0&&(B={},n[v.id]=B);let ee=B[U.id];ee===void 0&&(ee={},B[U.id]=ee);let W=ee[z];return W===void 0&&(W=d(l()),ee[z]=W),W}function d(v){let U=[],G=[],z=[];for(let B=0;B<t;B++)U[B]=0,G[B]=0,z[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:G,attributeDivisors:z,object:v,attributes:{},index:null}}function f(v,U,G,z){let B=r.attributes,ee=U.attributes,W=0,ie=G.getAttributes();for(let j in ie)if(ie[j].location>=0){let xe=B[j],Ce=ee[j];if(Ce===void 0&&(j==="instanceMatrix"&&v.instanceMatrix&&(Ce=v.instanceMatrix),j==="instanceColor"&&v.instanceColor&&(Ce=v.instanceColor)),xe===void 0||xe.attribute!==Ce||Ce&&xe.data!==Ce.data)return!0;W++}return r.attributesNum!==W||r.index!==z}function g(v,U,G,z){let B={},ee=U.attributes,W=0,ie=G.getAttributes();for(let j in ie)if(ie[j].location>=0){let xe=ee[j];xe===void 0&&(j==="instanceMatrix"&&v.instanceMatrix&&(xe=v.instanceMatrix),j==="instanceColor"&&v.instanceColor&&(xe=v.instanceColor));let Ce={};Ce.attribute=xe,xe&&xe.data&&(Ce.data=xe.data),B[j]=Ce,W++}r.attributes=B,r.attributesNum=W,r.index=z}function _(){let v=r.newAttributes;for(let U=0,G=v.length;U<G;U++)v[U]=0}function m(v){p(v,0)}function p(v,U){let G=r.newAttributes,z=r.enabledAttributes,B=r.attributeDivisors;G[v]=1,z[v]===0&&(s.enableVertexAttribArray(v),z[v]=1),B[v]!==U&&(s.vertexAttribDivisor(v,U),B[v]=U)}function M(){let v=r.newAttributes,U=r.enabledAttributes;for(let G=0,z=U.length;G<z;G++)U[G]!==v[G]&&(s.disableVertexAttribArray(G),U[G]=0)}function y(v,U,G,z,B,ee,W){W===!0?s.vertexAttribIPointer(v,U,G,B,ee):s.vertexAttribPointer(v,U,G,z,B,ee)}function S(v,U,G,z){_();let B=z.attributes,ee=G.getAttributes(),W=U.defaultAttributeValues;for(let ie in ee){let j=ee[ie];if(j.location>=0){let be=B[ie];if(be===void 0&&(ie==="instanceMatrix"&&v.instanceMatrix&&(be=v.instanceMatrix),ie==="instanceColor"&&v.instanceColor&&(be=v.instanceColor)),be!==void 0){let xe=be.normalized,Ce=be.itemSize,Ge=e.get(be);if(Ge===void 0)continue;let $e=Ge.buffer,ne=Ge.type,he=Ge.bytesPerElement,Pe=ne===s.INT||ne===s.UNSIGNED_INT||be.gpuType===Ih;if(be.isInterleavedBufferAttribute){let Me=be.data,it=Me.stride,at=be.offset;if(Me.isInstancedInterleavedBuffer){for(let ht=0;ht<j.locationSize;ht++)p(j.location+ht,Me.meshPerAttribute);v.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=Me.meshPerAttribute*Me.count)}else for(let ht=0;ht<j.locationSize;ht++)m(j.location+ht);s.bindBuffer(s.ARRAY_BUFFER,$e);for(let ht=0;ht<j.locationSize;ht++)y(j.location+ht,Ce/j.locationSize,ne,xe,it*he,(at+Ce/j.locationSize*ht)*he,Pe)}else{if(be.isInstancedBufferAttribute){for(let Me=0;Me<j.locationSize;Me++)p(j.location+Me,be.meshPerAttribute);v.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=be.meshPerAttribute*be.count)}else for(let Me=0;Me<j.locationSize;Me++)m(j.location+Me);s.bindBuffer(s.ARRAY_BUFFER,$e);for(let Me=0;Me<j.locationSize;Me++)y(j.location+Me,Ce/j.locationSize,ne,xe,Ce*he,Ce/j.locationSize*Me*he,Pe)}}else if(W!==void 0){let xe=W[ie];if(xe!==void 0)switch(xe.length){case 2:s.vertexAttrib2fv(j.location,xe);break;case 3:s.vertexAttrib3fv(j.location,xe);break;case 4:s.vertexAttrib4fv(j.location,xe);break;default:s.vertexAttrib1fv(j.location,xe)}}}}M()}function F(){L();for(let v in n){let U=n[v];for(let G in U){let z=U[G];for(let B in z)h(z[B].object),delete z[B];delete U[G]}delete n[v]}}function R(v){if(n[v.id]===void 0)return;let U=n[v.id];for(let G in U){let z=U[G];for(let B in z)h(z[B].object),delete z[B];delete U[G]}delete n[v.id]}function P(v){for(let U in n){let G=n[U];if(G[v.id]===void 0)continue;let z=G[v.id];for(let B in z)h(z[B].object),delete z[B];delete G[v.id]}}function L(){b(),a=!0,r!==i&&(r=i,c(r.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:L,resetDefaultState:b,dispose:F,releaseStatesOfGeometry:R,releaseStatesOfProgram:P,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function k_(s,e,t){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),t.update(h,n,1)}function a(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function o(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_];for(let _=0;_<d.length;_++)t.update(g,n,d[_])}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function z_(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(R){return!(R!==Hn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){let P=R===Mn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Ti&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Tn&&!P)}function l(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_TEXTURE_SIZE),_=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),p=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),S=f>0,F=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:g,maxCubemapSize:_,maxAttributes:m,maxVertexUniforms:p,maxVaryings:M,maxFragmentUniforms:y,vertexTextures:S,maxSamples:F}}function H_(s){let e=this,t=null,n=0,i=!1,r=!1,a=new bi,o=new ct,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{let M=r?0:n,y=M*4,S=p.clippingState||null;l.value=S,S=h(g,d,y,f);for(let F=0;F!==y;++F)S[F]=t[F];p.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){let _=u!==null?u.length:0,m=null;if(_!==0){if(m=l.value,g!==!0||m===null){let p=f+_*4,M=d.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,S=f;y!==_;++y,S+=4)a.copy(u[y]).applyMatrix4(M,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function V_(s){let e=new WeakMap;function t(a,o){return o===Kr?a.mapping=hr:o===pc&&(a.mapping=ur),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===Kr||o===pc)if(e.has(a)){let l=e.get(a).texture;return t(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new qc(l.height);return c.fromEquirectangularTexture(s,a),e.set(a,c),a.addEventListener("dispose",i),t(c.texture,a.mapping)}else return null}}return a}function i(a){let o=a.target;o.removeEventListener("dispose",i);let l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var Wi=class extends Ao{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ir=4,vd=[.125,.215,.35,.446,.526,.582],ps=20,Zl=new Wi,Md=new Ne,Jl=null,Ql=0,jl=0,ec=!1,ds=(1+Math.sqrt(5))/2,Zs=1/ds,Sd=[new A(-ds,Zs,0),new A(ds,Zs,0),new A(-Zs,0,ds),new A(Zs,0,ds),new A(0,ds,-Zs),new A(0,ds,Zs),new A(-1,1,-1),new A(1,1,-1),new A(-1,1,1),new A(1,1,1)],Co=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Jl=this._renderer.getRenderTarget(),Ql=this._renderer.getActiveCubeFace(),jl=this._renderer.getActiveMipmapLevel(),ec=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ed(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Jl,Ql,jl),this._renderer.xr.enabled=ec,e.scissorTest=!1,Ka(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===hr||e.mapping===ur?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Jl=this._renderer.getRenderTarget(),Ql=this._renderer.getActiveCubeFace(),jl=this._renderer.getActiveMipmapLevel(),ec=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ht,minFilter:Ht,generateMipmaps:!1,type:Mn,format:Hn,colorSpace:en,depthBuffer:!1},i=bd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bd(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=G_(r)),this._blurMaterial=W_(r,e,t)}return i}_compileMaterial(e){let t=new Xt(this._lodPlanes[0],e);this._renderer.compile(t,Zl)}_sceneToCubeUV(e,t,n,i){let o=new sn(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Md),h.toneMapping=Vi,h.autoClear=!1;let f=new Pt({name:"PMREM.Background",side:Cn,depthWrite:!1,depthTest:!1}),g=new Xt(new hi,f),_=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,_=!0):(f.color.copy(Md),_=!0);for(let p=0;p<6;p++){let M=p%3;M===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):M===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));let y=this._cubeSize;Ka(i,M*y,p>2?y:0,y,y),h.setRenderTarget(i),_&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===hr||e.mapping===ur;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ed()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wd());let r=i?this._cubemapMaterial:this._equirectMaterial,a=new Xt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;Ka(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Zl)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let r=1;r<i;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Sd[(i-r-1)%Sd.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,i,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Xt(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ps-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):ps;m>ps&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ps}`);let p=[],M=0;for(let P=0;P<ps;++P){let L=P/_,b=Math.exp(-L*L/2);p.push(b),P===0?M+=b:P<m&&(M+=2*b)}for(let P=0;P<p.length;P++)p[P]=p[P]/M;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-n;let S=this._sizeLods[i],F=3*S*(i>y-ir?i-y+ir:0),R=4*(this._cubeSize-S);Ka(t,F,R,3*S,2*S),l.setRenderTarget(t),l.render(u,Zl)}};function G_(s){let e=[],t=[],n=[],i=s,r=s-ir+1+vd.length;for(let a=0;a<r;a++){let o=Math.pow(2,i);t.push(o);let l=1/o;a>s-ir?l=vd[a-s+ir-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*f),y=new Float32Array(m*g*f),S=new Float32Array(p*g*f);for(let R=0;R<f;R++){let P=R%3*2/3-1,L=R>2?0:-1,b=[P,L,0,P+2/3,L,0,P+2/3,L+1,0,P,L,0,P+2/3,L+1,0,P,L+1,0];M.set(b,_*g*R),y.set(d,m*g*R);let v=[R,R,R,R,R,R];S.set(v,p*g*R)}let F=new Ot;F.setAttribute("position",new rn(M,_)),F.setAttribute("uv",new rn(y,m)),F.setAttribute("faceIndex",new rn(S,p)),e.push(F),i>ir&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function bd(s,e,t){let n=new An(s,e,t);return n.texture.mapping=rl,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ka(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function W_(s,e,t){let n=new Float32Array(ps),i=new A(0,1,0);return new an({name:"SphericalGaussianBlur",defines:{n:ps,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Hh(),fragmentShader:`

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
		`,blending:ci,depthTest:!1,depthWrite:!1})}function wd(){return new an({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Hh(),fragmentShader:`

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
		`,blending:ci,depthTest:!1,depthWrite:!1})}function Ed(){return new an({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Hh(),fragmentShader:`

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
	`}function X_(s){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===Kr||l===pc,h=l===hr||l===ur;if(c||h){let u=e.get(o),d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new Co(s)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{let f=o.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new Co(s)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function i(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function q_(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&zh("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Y_(s,e,t,n){let i={},r=new WeakMap;function a(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);for(let g in d.morphAttributes){let _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}d.removeEventListener("dispose",a),delete i[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function l(u){let d=u.attributes;for(let g in d)e.update(d[g],s.ARRAY_BUFFER);let f=u.morphAttributes;for(let g in f){let _=f[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],s.ARRAY_BUFFER)}}function c(u){let d=[],f=u.index,g=u.attributes.position,_=0;if(f!==null){let M=f.array;_=f.version;for(let y=0,S=M.length;y<S;y+=3){let F=M[y+0],R=M[y+1],P=M[y+2];d.push(F,R,R,P,P,F)}}else if(g!==void 0){let M=g.array;_=g.version;for(let y=0,S=M.length/3-1;y<S;y+=3){let F=y+0,R=y+1,P=y+2;d.push(F,R,R,P,P,F)}}else return;let m=new(Uf(d)?To:Eo)(d,1);m.version=_;let p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function $_(s,e,t){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*a),t.update(f,n,1)}function c(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,d*a,g),t.update(f,n,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(d,f,g,_){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let p=0;for(let M=0;M<g;M++)p+=f[M];for(let M=0;M<_.length;M++)t.update(p,n,_[M])}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function K_(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Z_(s,e,t){let n=new WeakMap,i=new Et;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(o);if(d===void 0||d.count!==u){let b=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],y=0;f===!0&&(y=1),g===!0&&(y=2),_===!0&&(y=3);let S=o.attributes.position.count*y,F=1;S>e.maxTextureSize&&(F=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);let R=new Float32Array(S*F*4*u),P=new wo(R,S,F,u);P.type=Tn,P.needsUpdate=!0;let L=y*4;for(let v=0;v<u;v++){let U=m[v],G=p[v],z=M[v],B=S*F*4*v;for(let ee=0;ee<U.count;ee++){let W=ee*L;f===!0&&(i.fromBufferAttribute(U,ee),R[B+W+0]=i.x,R[B+W+1]=i.y,R[B+W+2]=i.z,R[B+W+3]=0),g===!0&&(i.fromBufferAttribute(G,ee),R[B+W+4]=i.x,R[B+W+5]=i.y,R[B+W+6]=i.z,R[B+W+7]=0),_===!0&&(i.fromBufferAttribute(z,ee),R[B+W+8]=i.x,R[B+W+9]=i.y,R[B+W+10]=i.z,R[B+W+11]=z.itemSize===4?i.w:1)}}d={count:u,texture:P,size:new ce(S,F)},n.set(o,d),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function J_(s,e,t,n){let i=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function a(){i=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}var Po=class extends un{constructor(e,t,n,i,r,a,o,l,c,h=ar){if(h!==ar&&h!==fr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ar&&(n=gs),n===void 0&&h===fr&&(n=dr),super(null,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:vn,this.minFilter=l!==void 0?l:vn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Bf=new un,Td=new Po(1,1),kf=new wo,zf=new Wc,Hf=new Ro,Ad=[],Rd=[],Cd=new Float32Array(16),Pd=new Float32Array(9),Id=new Float32Array(4);function Er(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=Ad[i];if(r===void 0&&(r=new Float32Array(i),Ad[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function on(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function ln(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function ll(s,e){let t=Rd[e];t===void 0&&(t=new Int32Array(e),Rd[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Q_(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function j_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;s.uniform2fv(this.addr,e),ln(t,e)}}function ey(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(on(t,e))return;s.uniform3fv(this.addr,e),ln(t,e)}}function ty(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;s.uniform4fv(this.addr,e),ln(t,e)}}function ny(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),ln(t,e)}else{if(on(t,n))return;Id.set(n),s.uniformMatrix2fv(this.addr,!1,Id),ln(t,n)}}function iy(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),ln(t,e)}else{if(on(t,n))return;Pd.set(n),s.uniformMatrix3fv(this.addr,!1,Pd),ln(t,n)}}function sy(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),ln(t,e)}else{if(on(t,n))return;Cd.set(n),s.uniformMatrix4fv(this.addr,!1,Cd),ln(t,n)}}function ry(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function ay(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;s.uniform2iv(this.addr,e),ln(t,e)}}function oy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;s.uniform3iv(this.addr,e),ln(t,e)}}function ly(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;s.uniform4iv(this.addr,e),ln(t,e)}}function cy(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function hy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;s.uniform2uiv(this.addr,e),ln(t,e)}}function uy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;s.uniform3uiv(this.addr,e),ln(t,e)}}function dy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;s.uniform4uiv(this.addr,e),ln(t,e)}}function fy(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Td.compareFunction=Lf,r=Td):r=Bf,t.setTexture2D(e||r,i)}function py(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||zf,i)}function my(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Hf,i)}function gy(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||kf,i)}function _y(s){switch(s){case 5126:return Q_;case 35664:return j_;case 35665:return ey;case 35666:return ty;case 35674:return ny;case 35675:return iy;case 35676:return sy;case 5124:case 35670:return ry;case 35667:case 35671:return ay;case 35668:case 35672:return oy;case 35669:case 35673:return ly;case 5125:return cy;case 36294:return hy;case 36295:return uy;case 36296:return dy;case 35678:case 36198:case 36298:case 36306:case 35682:return fy;case 35679:case 36299:case 36307:return py;case 35680:case 36300:case 36308:case 36293:return my;case 36289:case 36303:case 36311:case 36292:return gy}}function yy(s,e){s.uniform1fv(this.addr,e)}function xy(s,e){let t=Er(e,this.size,2);s.uniform2fv(this.addr,t)}function vy(s,e){let t=Er(e,this.size,3);s.uniform3fv(this.addr,t)}function My(s,e){let t=Er(e,this.size,4);s.uniform4fv(this.addr,t)}function Sy(s,e){let t=Er(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function by(s,e){let t=Er(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function wy(s,e){let t=Er(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Ey(s,e){s.uniform1iv(this.addr,e)}function Ty(s,e){s.uniform2iv(this.addr,e)}function Ay(s,e){s.uniform3iv(this.addr,e)}function Ry(s,e){s.uniform4iv(this.addr,e)}function Cy(s,e){s.uniform1uiv(this.addr,e)}function Py(s,e){s.uniform2uiv(this.addr,e)}function Iy(s,e){s.uniform3uiv(this.addr,e)}function Ly(s,e){s.uniform4uiv(this.addr,e)}function Dy(s,e,t){let n=this.cache,i=e.length,r=ll(t,i);on(n,r)||(s.uniform1iv(this.addr,r),ln(n,r));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Bf,r[a])}function Uy(s,e,t){let n=this.cache,i=e.length,r=ll(t,i);on(n,r)||(s.uniform1iv(this.addr,r),ln(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||zf,r[a])}function Ny(s,e,t){let n=this.cache,i=e.length,r=ll(t,i);on(n,r)||(s.uniform1iv(this.addr,r),ln(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Hf,r[a])}function Oy(s,e,t){let n=this.cache,i=e.length,r=ll(t,i);on(n,r)||(s.uniform1iv(this.addr,r),ln(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||kf,r[a])}function Fy(s){switch(s){case 5126:return yy;case 35664:return xy;case 35665:return vy;case 35666:return My;case 35674:return Sy;case 35675:return by;case 35676:return wy;case 5124:case 35670:return Ey;case 35667:case 35671:return Ty;case 35668:case 35672:return Ay;case 35669:case 35673:return Ry;case 5125:return Cy;case 36294:return Py;case 36295:return Iy;case 36296:return Ly;case 35678:case 36198:case 36298:case 36306:case 35682:return Dy;case 35679:case 36299:case 36307:return Uy;case 35680:case 36300:case 36308:case 36293:return Ny;case 36289:case 36303:case 36311:case 36292:return Oy}}var Yc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=_y(t.type)}},$c=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Fy(t.type)}},Kc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(e,t[o.id],n)}}},tc=/(\w+)(\])?(\[|\.)?/g;function Ld(s,e){s.seq.push(e),s.map[e.id]=e}function By(s,e,t){let n=s.name,i=n.length;for(tc.lastIndex=0;;){let r=tc.exec(n),a=tc.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Ld(t,c===void 0?new Yc(o,s,e):new $c(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new Kc(o),Ld(t,u)),t=u}}}var cr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=e.getActiveUniform(t,i),a=e.getUniformLocation(t,r.name);By(r,a,this)}}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function Dd(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var ky=37297,zy=0;function Hy(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function Vy(s){let e=_t.getPrimaries(_t.workingColorSpace),t=_t.getPrimaries(s),n;switch(e===t?n="":e===Mo&&t===vo?n="LinearDisplayP3ToLinearSRGB":e===vo&&t===Mo&&(n="LinearSRGBToLinearDisplayP3"),s){case en:case ol:return[n,"LinearTransferOETF"];case Mt:case Bh:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function Ud(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";let r=/ERROR: 0:(\d+)/.exec(i);if(r){let a=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+Hy(s.getShaderSource(e),a)}else return i}function Gy(s,e){let t=Vy(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Wy(s,e){let t;switch(e){case Eh:t="Linear";break;case Th:t="Reinhard";break;case Ah:t="OptimizedCineon";break;case pa:t="ACESFilmic";break;case Rh:t="AgX";break;case Ch:t="Neutral";break;case sm:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Xy(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Vr).join(`
`)}function qy(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Yy(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function Vr(s){return s!==""}function Nd(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Od(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var $y=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zc(s){return s.replace($y,Zy)}var Ky=new Map;function Zy(s,e){let t=lt[e];if(t===void 0){let n=Ky.get(e);if(n!==void 0)t=lt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Zc(t)}var Jy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fd(s){return s.replace(Jy,Qy)}function Qy(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Bd(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}function jy(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===yf?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===wh?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Si&&(e="SHADOWMAP_TYPE_VSM"),e}function ex(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case hr:case ur:e="ENVMAP_TYPE_CUBE";break;case rl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function tx(s){let e="ENVMAP_MODE_REFLECTION";return s.envMap&&s.envMapMode===ur&&(e="ENVMAP_MODE_REFRACTION"),e}function nx(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case xf:e="ENVMAP_BLENDING_MULTIPLY";break;case nm:e="ENVMAP_BLENDING_MIX";break;case im:e="ENVMAP_BLENDING_ADD";break}return e}function ix(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function sx(s,e,t,n){let i=s.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=jy(t),c=ex(t),h=tx(t),u=nx(t),d=ix(t),f=Xy(t),g=qy(r),_=i.createProgram(),m,p,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Vr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Vr).join(`
`),p.length>0&&(p+=`
`)):(m=[Bd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vr).join(`
`),p=[Bd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Vi?"#define TONE_MAPPING":"",t.toneMapping!==Vi?lt.tonemapping_pars_fragment:"",t.toneMapping!==Vi?Wy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",lt.colorspace_pars_fragment,Gy("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Vr).join(`
`)),a=Zc(a),a=Nd(a,t),a=Od(a,t),o=Zc(o),o=Nd(o,t),o=Od(o,t),a=Fd(a),o=Fd(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===ju?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ju?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let y=M+m+a,S=M+p+o,F=Dd(i,i.VERTEX_SHADER,y),R=Dd(i,i.FRAGMENT_SHADER,S);i.attachShader(_,F),i.attachShader(_,R),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function P(U){if(s.debug.checkShaderErrors){let G=i.getProgramInfoLog(_).trim(),z=i.getShaderInfoLog(F).trim(),B=i.getShaderInfoLog(R).trim(),ee=!0,W=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(ee=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,F,R);else{let ie=Ud(i,F,"vertex"),j=Ud(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+G+`
`+ie+`
`+j)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(z===""||B==="")&&(W=!1);W&&(U.diagnostics={runnable:ee,programLog:G,vertexShader:{log:z,prefix:m},fragmentShader:{log:B,prefix:p}})}i.deleteShader(F),i.deleteShader(R),L=new cr(i,_),b=Yy(i,_)}let L;this.getUniforms=function(){return L===void 0&&P(this),L};let b;this.getAttributes=function(){return b===void 0&&P(this),b};let v=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=i.getProgramParameter(_,ky)),v},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=zy++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=F,this.fragmentShader=R,this}var rx=0,Jc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Qc(e),t.set(e,n)),n}},Qc=class{constructor(e){this.id=rx++,this.code=e,this.usedTimes=0}};function ax(s,e,t,n,i,r,a){let o=new jr,l=new Jc,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,f=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,v,U,G,z){let B=G.fog,ee=z.geometry,W=b.isMeshStandardMaterial?G.environment:null,ie=(b.isMeshStandardMaterial?t:e).get(b.envMap||W),j=ie&&ie.mapping===rl?ie.image.height:null,be=g[b.type];b.precision!==null&&(f=i.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));let xe=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,Ce=xe!==void 0?xe.length:0,Ge=0;ee.morphAttributes.position!==void 0&&(Ge=1),ee.morphAttributes.normal!==void 0&&(Ge=2),ee.morphAttributes.color!==void 0&&(Ge=3);let $e,ne,he,Pe;if(be){let yt=li[be];$e=yt.vertexShader,ne=yt.fragmentShader}else $e=b.vertexShader,ne=b.fragmentShader,l.update(b),he=l.getVertexShaderID(b),Pe=l.getFragmentShaderID(b);let Me=s.getRenderTarget(),it=z.isInstancedMesh===!0,at=z.isBatchedMesh===!0,ht=!!b.map,It=!!b.matcap,N=!!ie,st=!!b.aoMap,St=!!b.lightMap,mt=!!b.bumpMap,De=!!b.normalMap,Lt=!!b.displacementMap,Qe=!!b.emissiveMap,et=!!b.metalnessMap,D=!!b.roughnessMap,w=b.anisotropy>0,K=b.clearcoat>0,oe=b.dispersion>0,le=b.iridescence>0,ae=b.sheen>0,Be=b.transmission>0,ye=w&&!!b.anisotropyMap,ve=K&&!!b.clearcoatMap,qe=K&&!!b.clearcoatNormalMap,te=K&&!!b.clearcoatRoughnessMap,Ee=le&&!!b.iridescenceMap,ot=le&&!!b.iridescenceThicknessMap,Je=ae&&!!b.sheenColorMap,Ae=ae&&!!b.sheenRoughnessMap,Ke=!!b.specularMap,me=!!b.specularColorMap,Ft=!!b.specularIntensityMap,O=Be&&!!b.transmissionMap,Z=Be&&!!b.thicknessMap,J=!!b.gradientMap,re=!!b.alphaMap,ue=b.alphaTest>0,We=!!b.alphaHash,Ze=!!b.extensions,qt=Vi;b.toneMapped&&(Me===null||Me.isXRRenderTarget===!0)&&(qt=s.toneMapping);let Dt={shaderID:be,shaderType:b.type,shaderName:b.name,vertexShader:$e,fragmentShader:ne,defines:b.defines,customVertexShaderID:he,customFragmentShaderID:Pe,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:at,batchingColor:at&&z._colorsTexture!==null,instancing:it,instancingColor:it&&z.instanceColor!==null,instancingMorph:it&&z.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Me===null?s.outputColorSpace:Me.isXRRenderTarget===!0?Me.texture.colorSpace:en,alphaToCoverage:!!b.alphaToCoverage,map:ht,matcap:It,envMap:N,envMapMode:N&&ie.mapping,envMapCubeUVHeight:j,aoMap:st,lightMap:St,bumpMap:mt,normalMap:De,displacementMap:d&&Lt,emissiveMap:Qe,normalMapObjectSpace:De&&b.normalMapType===cm,normalMapTangentSpace:De&&b.normalMapType===If,metalnessMap:et,roughnessMap:D,anisotropy:w,anisotropyMap:ye,clearcoat:K,clearcoatMap:ve,clearcoatNormalMap:qe,clearcoatRoughnessMap:te,dispersion:oe,iridescence:le,iridescenceMap:Ee,iridescenceThicknessMap:ot,sheen:ae,sheenColorMap:Je,sheenRoughnessMap:Ae,specularMap:Ke,specularColorMap:me,specularIntensityMap:Ft,transmission:Be,transmissionMap:O,thicknessMap:Z,gradientMap:J,opaque:b.transparent===!1&&b.blending===rr&&b.alphaToCoverage===!1,alphaMap:re,alphaTest:ue,alphaHash:We,combine:b.combine,mapUv:ht&&_(b.map.channel),aoMapUv:st&&_(b.aoMap.channel),lightMapUv:St&&_(b.lightMap.channel),bumpMapUv:mt&&_(b.bumpMap.channel),normalMapUv:De&&_(b.normalMap.channel),displacementMapUv:Lt&&_(b.displacementMap.channel),emissiveMapUv:Qe&&_(b.emissiveMap.channel),metalnessMapUv:et&&_(b.metalnessMap.channel),roughnessMapUv:D&&_(b.roughnessMap.channel),anisotropyMapUv:ye&&_(b.anisotropyMap.channel),clearcoatMapUv:ve&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:qe&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:te&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Ee&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:ot&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Je&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&_(b.sheenRoughnessMap.channel),specularMapUv:Ke&&_(b.specularMap.channel),specularColorMapUv:me&&_(b.specularColorMap.channel),specularIntensityMapUv:Ft&&_(b.specularIntensityMap.channel),transmissionMapUv:O&&_(b.transmissionMap.channel),thicknessMapUv:Z&&_(b.thicknessMap.channel),alphaMapUv:re&&_(b.alphaMap.channel),vertexTangents:!!ee.attributes.tangent&&(De||w),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!ee.attributes.uv&&(ht||re),fog:!!B,useFog:b.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:z.isSkinnedMesh===!0,morphTargets:ee.morphAttributes.position!==void 0,morphNormals:ee.morphAttributes.normal!==void 0,morphColors:ee.morphAttributes.color!==void 0,morphTargetsCount:Ce,morphTextureStride:Ge,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&U.length>0,shadowMapType:s.shadowMap.type,toneMapping:qt,decodeVideoTexture:ht&&b.map.isVideoTexture===!0&&_t.getTransfer(b.map.colorSpace)===Tt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===$t,flipSided:b.side===Cn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ze&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ze&&b.extensions.multiDraw===!0||at)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Dt.vertexUv1s=c.has(1),Dt.vertexUv2s=c.has(2),Dt.vertexUv3s=c.has(3),c.clear(),Dt}function p(b){let v=[];if(b.shaderID?v.push(b.shaderID):(v.push(b.customVertexShaderID),v.push(b.customFragmentShaderID)),b.defines!==void 0)for(let U in b.defines)v.push(U),v.push(b.defines[U]);return b.isRawShaderMaterial===!1&&(M(v,b),y(v,b),v.push(s.outputColorSpace)),v.push(b.customProgramCacheKey),v.join()}function M(b,v){b.push(v.precision),b.push(v.outputColorSpace),b.push(v.envMapMode),b.push(v.envMapCubeUVHeight),b.push(v.mapUv),b.push(v.alphaMapUv),b.push(v.lightMapUv),b.push(v.aoMapUv),b.push(v.bumpMapUv),b.push(v.normalMapUv),b.push(v.displacementMapUv),b.push(v.emissiveMapUv),b.push(v.metalnessMapUv),b.push(v.roughnessMapUv),b.push(v.anisotropyMapUv),b.push(v.clearcoatMapUv),b.push(v.clearcoatNormalMapUv),b.push(v.clearcoatRoughnessMapUv),b.push(v.iridescenceMapUv),b.push(v.iridescenceThicknessMapUv),b.push(v.sheenColorMapUv),b.push(v.sheenRoughnessMapUv),b.push(v.specularMapUv),b.push(v.specularColorMapUv),b.push(v.specularIntensityMapUv),b.push(v.transmissionMapUv),b.push(v.thicknessMapUv),b.push(v.combine),b.push(v.fogExp2),b.push(v.sizeAttenuation),b.push(v.morphTargetsCount),b.push(v.morphAttributeCount),b.push(v.numDirLights),b.push(v.numPointLights),b.push(v.numSpotLights),b.push(v.numSpotLightMaps),b.push(v.numHemiLights),b.push(v.numRectAreaLights),b.push(v.numDirLightShadows),b.push(v.numPointLightShadows),b.push(v.numSpotLightShadows),b.push(v.numSpotLightShadowsWithMaps),b.push(v.numLightProbes),b.push(v.shadowMapType),b.push(v.toneMapping),b.push(v.numClippingPlanes),b.push(v.numClipIntersection),b.push(v.depthPacking)}function y(b,v){o.disableAll(),v.supportsVertexTextures&&o.enable(0),v.instancing&&o.enable(1),v.instancingColor&&o.enable(2),v.instancingMorph&&o.enable(3),v.matcap&&o.enable(4),v.envMap&&o.enable(5),v.normalMapObjectSpace&&o.enable(6),v.normalMapTangentSpace&&o.enable(7),v.clearcoat&&o.enable(8),v.iridescence&&o.enable(9),v.alphaTest&&o.enable(10),v.vertexColors&&o.enable(11),v.vertexAlphas&&o.enable(12),v.vertexUv1s&&o.enable(13),v.vertexUv2s&&o.enable(14),v.vertexUv3s&&o.enable(15),v.vertexTangents&&o.enable(16),v.anisotropy&&o.enable(17),v.alphaHash&&o.enable(18),v.batching&&o.enable(19),v.dispersion&&o.enable(20),v.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.skinning&&o.enable(4),v.morphTargets&&o.enable(5),v.morphNormals&&o.enable(6),v.morphColors&&o.enable(7),v.premultipliedAlpha&&o.enable(8),v.shadowMapEnabled&&o.enable(9),v.doubleSided&&o.enable(10),v.flipSided&&o.enable(11),v.useDepthPacking&&o.enable(12),v.dithering&&o.enable(13),v.transmission&&o.enable(14),v.sheen&&o.enable(15),v.opaque&&o.enable(16),v.pointsUvs&&o.enable(17),v.decodeVideoTexture&&o.enable(18),v.alphaToCoverage&&o.enable(19),b.push(o.mask)}function S(b){let v=g[b.type],U;if(v){let G=li[v];U=ji.clone(G.uniforms)}else U=b.uniforms;return U}function F(b,v){let U;for(let G=0,z=h.length;G<z;G++){let B=h[G];if(B.cacheKey===v){U=B,++U.usedTimes;break}}return U===void 0&&(U=new sx(s,v,b,r),h.push(U)),U}function R(b){if(--b.usedTimes===0){let v=h.indexOf(b);h[v]=h[h.length-1],h.pop(),b.destroy()}}function P(b){l.remove(b)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:F,releaseProgram:R,releaseShaderCache:P,programs:h,dispose:L}}function ox(){let s=new WeakMap;function e(r){let a=s.get(r);return a===void 0&&(a={},s.set(r,a)),a}function t(r){s.delete(r)}function n(r,a,o){s.get(r)[a]=o}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function lx(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function kd(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function zd(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(u,d,f,g,_,m){let p=s[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},s[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function o(u,d,f,g,_,m){let p=a(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(u,d,f,g,_,m){let p=a(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||lx),n.length>1&&n.sort(d||kd),i.length>1&&i.sort(d||kd)}function h(){for(let u=e,d=s.length;u<d;u++){let f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:h,sort:c}}function cx(){let s=new WeakMap;function e(n,i){let r=s.get(n),a;return r===void 0?(a=new zd,s.set(n,[a])):i>=r.length?(a=new zd,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function hx(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new A,color:new Ne};break;case"SpotLight":t={position:new A,direction:new A,color:new Ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new A,color:new Ne,distance:0,decay:0};break;case"HemisphereLight":t={direction:new A,skyColor:new Ne,groundColor:new Ne};break;case"RectAreaLight":t={color:new Ne,position:new A,halfWidth:new A,halfHeight:new A};break}return s[e.id]=t,t}}}function ux(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var dx=0;function fx(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function px(s){let e=new hx,t=ux(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new A);let i=new A,r=new je,a=new je;function o(c){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,M=0,y=0,S=0,F=0,R=0,P=0;c.sort(fx);for(let b=0,v=c.length;b<v;b++){let U=c[b],G=U.color,z=U.intensity,B=U.distance,ee=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)h+=G.r*z,u+=G.g*z,d+=G.b*z;else if(U.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(U.sh.coefficients[W],z);P++}else if(U.isDirectionalLight){let W=e.get(U);if(W.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let ie=U.shadow,j=t.get(U);j.shadowIntensity=ie.intensity,j.shadowBias=ie.bias,j.shadowNormalBias=ie.normalBias,j.shadowRadius=ie.radius,j.shadowMapSize=ie.mapSize,n.directionalShadow[f]=j,n.directionalShadowMap[f]=ee,n.directionalShadowMatrix[f]=U.shadow.matrix,M++}n.directional[f]=W,f++}else if(U.isSpotLight){let W=e.get(U);W.position.setFromMatrixPosition(U.matrixWorld),W.color.copy(G).multiplyScalar(z),W.distance=B,W.coneCos=Math.cos(U.angle),W.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),W.decay=U.decay,n.spot[_]=W;let ie=U.shadow;if(U.map&&(n.spotLightMap[F]=U.map,F++,ie.updateMatrices(U),U.castShadow&&R++),n.spotLightMatrix[_]=ie.matrix,U.castShadow){let j=t.get(U);j.shadowIntensity=ie.intensity,j.shadowBias=ie.bias,j.shadowNormalBias=ie.normalBias,j.shadowRadius=ie.radius,j.shadowMapSize=ie.mapSize,n.spotShadow[_]=j,n.spotShadowMap[_]=ee,S++}_++}else if(U.isRectAreaLight){let W=e.get(U);W.color.copy(G).multiplyScalar(z),W.halfWidth.set(U.width*.5,0,0),W.halfHeight.set(0,U.height*.5,0),n.rectArea[m]=W,m++}else if(U.isPointLight){let W=e.get(U);if(W.color.copy(U.color).multiplyScalar(U.intensity),W.distance=U.distance,W.decay=U.decay,U.castShadow){let ie=U.shadow,j=t.get(U);j.shadowIntensity=ie.intensity,j.shadowBias=ie.bias,j.shadowNormalBias=ie.normalBias,j.shadowRadius=ie.radius,j.shadowMapSize=ie.mapSize,j.shadowCameraNear=ie.camera.near,j.shadowCameraFar=ie.camera.far,n.pointShadow[g]=j,n.pointShadowMap[g]=ee,n.pointShadowMatrix[g]=U.shadow.matrix,y++}n.point[g]=W,g++}else if(U.isHemisphereLight){let W=e.get(U);W.skyColor.copy(U.color).multiplyScalar(z),W.groundColor.copy(U.groundColor).multiplyScalar(z),n.hemi[p]=W,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Se.LTC_FLOAT_1,n.rectAreaLTC2=Se.LTC_FLOAT_2):(n.rectAreaLTC1=Se.LTC_HALF_1,n.rectAreaLTC2=Se.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let L=n.hash;(L.directionalLength!==f||L.pointLength!==g||L.spotLength!==_||L.rectAreaLength!==m||L.hemiLength!==p||L.numDirectionalShadows!==M||L.numPointShadows!==y||L.numSpotShadows!==S||L.numSpotMaps!==F||L.numLightProbes!==P)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=S+F-R,n.spotLightMap.length=F,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=P,L.directionalLength=f,L.pointLength=g,L.spotLength=_,L.rectAreaLength=m,L.hemiLength=p,L.numDirectionalShadows=M,L.numPointShadows=y,L.numSpotShadows=S,L.numSpotMaps=F,L.numLightProbes=P,n.version=dx++)}function l(c,h){let u=0,d=0,f=0,g=0,_=0,m=h.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){let y=c[p];if(y.isDirectionalLight){let S=n.directional[u];S.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(m),u++}else if(y.isSpotLight){let S=n.spot[f];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(m),f++}else if(y.isRectAreaLight){let S=n.rectArea[g];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(m),a.identity(),r.copy(y.matrixWorld),r.premultiply(m),a.extractRotation(r),S.halfWidth.set(y.width*.5,0,0),S.halfHeight.set(0,y.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),g++}else if(y.isPointLight){let S=n.point[d];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(m),d++}else if(y.isHemisphereLight){let S=n.hemi[_];S.direction.setFromMatrixPosition(y.matrixWorld),S.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:n}}function Hd(s){let e=new px(s),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function mx(s){let e=new WeakMap;function t(i,r=0){let a=e.get(i),o;return a===void 0?(o=new Hd(s),e.set(i,[o])):r>=a.length?(o=new Hd(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var jc=class extends In{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=om,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},eh=class extends In{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},gx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_x=`uniform sampler2D shadow_pass;
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
}`;function yx(s,e,t){let n=new ea,i=new ce,r=new ce,a=new Et,o=new jc({depthPacking:lm}),l=new eh,c={},h=t.maxTextureSize,u={[Gn]:Cn,[Cn]:Gn,[$t]:$t},d=new an({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ce},radius:{value:4}},vertexShader:gx,fragmentShader:_x}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new Ot;g.setAttribute("position",new rn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Xt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=yf;let p=this.type;this.render=function(R,P,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;let b=s.getRenderTarget(),v=s.getActiveCubeFace(),U=s.getActiveMipmapLevel(),G=s.state;G.setBlending(ci),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);let z=p!==Si&&this.type===Si,B=p===Si&&this.type!==Si;for(let ee=0,W=R.length;ee<W;ee++){let ie=R[ee],j=ie.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",ie,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;i.copy(j.mapSize);let be=j.getFrameExtents();if(i.multiply(be),r.copy(j.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/be.x),i.x=r.x*be.x,j.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/be.y),i.y=r.y*be.y,j.mapSize.y=r.y)),j.map===null||z===!0||B===!0){let Ce=this.type!==Si?{minFilter:vn,magFilter:vn}:{};j.map!==null&&j.map.dispose(),j.map=new An(i.x,i.y,Ce),j.map.texture.name=ie.name+".shadowMap",j.camera.updateProjectionMatrix()}s.setRenderTarget(j.map),s.clear();let xe=j.getViewportCount();for(let Ce=0;Ce<xe;Ce++){let Ge=j.getViewport(Ce);a.set(r.x*Ge.x,r.y*Ge.y,r.x*Ge.z,r.y*Ge.w),G.viewport(a),j.updateMatrices(ie,Ce),n=j.getFrustum(),S(P,L,j.camera,ie,this.type)}j.isPointLightShadow!==!0&&this.type===Si&&M(j,L),j.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(b,v,U)};function M(R,P){let L=e.update(_);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new An(i.x,i.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,s.setRenderTarget(R.mapPass),s.clear(),s.renderBufferDirect(P,null,L,d,_,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,s.setRenderTarget(R.map),s.clear(),s.renderBufferDirect(P,null,L,f,_,null)}function y(R,P,L,b){let v=null,U=L.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(U!==void 0)v=U;else if(v=L.isPointLight===!0?l:o,s.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){let G=v.uuid,z=P.uuid,B=c[G];B===void 0&&(B={},c[G]=B);let ee=B[z];ee===void 0&&(ee=v.clone(),B[z]=ee,P.addEventListener("dispose",F)),v=ee}if(v.visible=P.visible,v.wireframe=P.wireframe,b===Si?v.side=P.shadowSide!==null?P.shadowSide:P.side:v.side=P.shadowSide!==null?P.shadowSide:u[P.side],v.alphaMap=P.alphaMap,v.alphaTest=P.alphaTest,v.map=P.map,v.clipShadows=P.clipShadows,v.clippingPlanes=P.clippingPlanes,v.clipIntersection=P.clipIntersection,v.displacementMap=P.displacementMap,v.displacementScale=P.displacementScale,v.displacementBias=P.displacementBias,v.wireframeLinewidth=P.wireframeLinewidth,v.linewidth=P.linewidth,L.isPointLight===!0&&v.isMeshDistanceMaterial===!0){let G=s.properties.get(v);G.light=L}return v}function S(R,P,L,b,v){if(R.visible===!1)return;if(R.layers.test(P.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&v===Si)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,R.matrixWorld);let z=e.update(R),B=R.material;if(Array.isArray(B)){let ee=z.groups;for(let W=0,ie=ee.length;W<ie;W++){let j=ee[W],be=B[j.materialIndex];if(be&&be.visible){let xe=y(R,be,b,v);R.onBeforeShadow(s,R,P,L,z,xe,j),s.renderBufferDirect(L,null,z,xe,R,j),R.onAfterShadow(s,R,P,L,z,xe,j)}}}else if(B.visible){let ee=y(R,B,b,v);R.onBeforeShadow(s,R,P,L,z,ee,null),s.renderBufferDirect(L,null,z,ee,R,null),R.onAfterShadow(s,R,P,L,z,ee,null)}}let G=R.children;for(let z=0,B=G.length;z<B;z++)S(G[z],P,L,b,v)}function F(R){R.target.removeEventListener("dispose",F);for(let L in c){let b=c[L],v=R.target.uuid;v in b&&(b[v].dispose(),delete b[v])}}}function xx(s){function e(){let O=!1,Z=new Et,J=null,re=new Et(0,0,0,0);return{setMask:function(ue){J!==ue&&!O&&(s.colorMask(ue,ue,ue,ue),J=ue)},setLocked:function(ue){O=ue},setClear:function(ue,We,Ze,qt,Dt){Dt===!0&&(ue*=qt,We*=qt,Ze*=qt),Z.set(ue,We,Ze,qt),re.equals(Z)===!1&&(s.clearColor(ue,We,Ze,qt),re.copy(Z))},reset:function(){O=!1,J=null,re.set(-1,0,0,0)}}}function t(){let O=!1,Z=null,J=null,re=null;return{setTest:function(ue){ue?Pe(s.DEPTH_TEST):Me(s.DEPTH_TEST)},setMask:function(ue){Z!==ue&&!O&&(s.depthMask(ue),Z=ue)},setFunc:function(ue){if(J!==ue){switch(ue){case Kp:s.depthFunc(s.NEVER);break;case Zp:s.depthFunc(s.ALWAYS);break;case Jp:s.depthFunc(s.LESS);break;case yo:s.depthFunc(s.LEQUAL);break;case Qp:s.depthFunc(s.EQUAL);break;case jp:s.depthFunc(s.GEQUAL);break;case em:s.depthFunc(s.GREATER);break;case tm:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}J=ue}},setLocked:function(ue){O=ue},setClear:function(ue){re!==ue&&(s.clearDepth(ue),re=ue)},reset:function(){O=!1,Z=null,J=null,re=null}}}function n(){let O=!1,Z=null,J=null,re=null,ue=null,We=null,Ze=null,qt=null,Dt=null;return{setTest:function(yt){O||(yt?Pe(s.STENCIL_TEST):Me(s.STENCIL_TEST))},setMask:function(yt){Z!==yt&&!O&&(s.stencilMask(yt),Z=yt)},setFunc:function(yt,Ln,Dn){(J!==yt||re!==Ln||ue!==Dn)&&(s.stencilFunc(yt,Ln,Dn),J=yt,re=Ln,ue=Dn)},setOp:function(yt,Ln,Dn){(We!==yt||Ze!==Ln||qt!==Dn)&&(s.stencilOp(yt,Ln,Dn),We=yt,Ze=Ln,qt=Dn)},setLocked:function(yt){O=yt},setClear:function(yt){Dt!==yt&&(s.clearStencil(yt),Dt=yt)},reset:function(){O=!1,Z=null,J=null,re=null,ue=null,We=null,Ze=null,qt=null,Dt=null}}}let i=new e,r=new t,a=new n,o=new WeakMap,l=new WeakMap,c={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,m=null,p=null,M=null,y=null,S=null,F=null,R=new Ne(0,0,0),P=0,L=!1,b=null,v=null,U=null,G=null,z=null,B=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ee=!1,W=0,ie=s.getParameter(s.VERSION);ie.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(ie)[1]),ee=W>=1):ie.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(ie)[1]),ee=W>=2);let j=null,be={},xe=s.getParameter(s.SCISSOR_BOX),Ce=s.getParameter(s.VIEWPORT),Ge=new Et().fromArray(xe),$e=new Et().fromArray(Ce);function ne(O,Z,J,re){let ue=new Uint8Array(4),We=s.createTexture();s.bindTexture(O,We),s.texParameteri(O,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(O,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ze=0;Ze<J;Ze++)O===s.TEXTURE_3D||O===s.TEXTURE_2D_ARRAY?s.texImage3D(Z,0,s.RGBA,1,1,re,0,s.RGBA,s.UNSIGNED_BYTE,ue):s.texImage2D(Z+Ze,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ue);return We}let he={};he[s.TEXTURE_2D]=ne(s.TEXTURE_2D,s.TEXTURE_2D,1),he[s.TEXTURE_CUBE_MAP]=ne(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),he[s.TEXTURE_2D_ARRAY]=ne(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),he[s.TEXTURE_3D]=ne(s.TEXTURE_3D,s.TEXTURE_3D,1,1),i.setClear(0,0,0,1),r.setClear(1),a.setClear(0),Pe(s.DEPTH_TEST),r.setFunc(yo),mt(!1),De(Xu),Pe(s.CULL_FACE),st(ci);function Pe(O){c[O]!==!0&&(s.enable(O),c[O]=!0)}function Me(O){c[O]!==!1&&(s.disable(O),c[O]=!1)}function it(O,Z){return h[O]!==Z?(s.bindFramebuffer(O,Z),h[O]=Z,O===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=Z),O===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=Z),!0):!1}function at(O,Z){let J=d,re=!1;if(O){J=u.get(Z),J===void 0&&(J=[],u.set(Z,J));let ue=O.textures;if(J.length!==ue.length||J[0]!==s.COLOR_ATTACHMENT0){for(let We=0,Ze=ue.length;We<Ze;We++)J[We]=s.COLOR_ATTACHMENT0+We;J.length=ue.length,re=!0}}else J[0]!==s.BACK&&(J[0]=s.BACK,re=!0);re&&s.drawBuffers(J)}function ht(O){return f!==O?(s.useProgram(O),f=O,!0):!1}let It={[fs]:s.FUNC_ADD,[Lp]:s.FUNC_SUBTRACT,[Dp]:s.FUNC_REVERSE_SUBTRACT};It[Up]=s.MIN,It[Np]=s.MAX;let N={[Op]:s.ZERO,[Fp]:s.ONE,[Bp]:s.SRC_COLOR,[dc]:s.SRC_ALPHA,[Wp]:s.SRC_ALPHA_SATURATE,[Vp]:s.DST_COLOR,[zp]:s.DST_ALPHA,[kp]:s.ONE_MINUS_SRC_COLOR,[fc]:s.ONE_MINUS_SRC_ALPHA,[Gp]:s.ONE_MINUS_DST_COLOR,[Hp]:s.ONE_MINUS_DST_ALPHA,[Xp]:s.CONSTANT_COLOR,[qp]:s.ONE_MINUS_CONSTANT_COLOR,[Yp]:s.CONSTANT_ALPHA,[$p]:s.ONE_MINUS_CONSTANT_ALPHA};function st(O,Z,J,re,ue,We,Ze,qt,Dt,yt){if(O===ci){g===!0&&(Me(s.BLEND),g=!1);return}if(g===!1&&(Pe(s.BLEND),g=!0),O!==Ip){if(O!==_||yt!==L){if((m!==fs||y!==fs)&&(s.blendEquation(s.FUNC_ADD),m=fs,y=fs),yt)switch(O){case rr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Wn:s.blendFunc(s.ONE,s.ONE);break;case qu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Yu:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case rr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Wn:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case qu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Yu:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}p=null,M=null,S=null,F=null,R.set(0,0,0),P=0,_=O,L=yt}return}ue=ue||Z,We=We||J,Ze=Ze||re,(Z!==m||ue!==y)&&(s.blendEquationSeparate(It[Z],It[ue]),m=Z,y=ue),(J!==p||re!==M||We!==S||Ze!==F)&&(s.blendFuncSeparate(N[J],N[re],N[We],N[Ze]),p=J,M=re,S=We,F=Ze),(qt.equals(R)===!1||Dt!==P)&&(s.blendColor(qt.r,qt.g,qt.b,Dt),R.copy(qt),P=Dt),_=O,L=!1}function St(O,Z){O.side===$t?Me(s.CULL_FACE):Pe(s.CULL_FACE);let J=O.side===Cn;Z&&(J=!J),mt(J),O.blending===rr&&O.transparent===!1?st(ci):st(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),r.setFunc(O.depthFunc),r.setTest(O.depthTest),r.setMask(O.depthWrite),i.setMask(O.colorWrite);let re=O.stencilWrite;a.setTest(re),re&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Qe(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?Pe(s.SAMPLE_ALPHA_TO_COVERAGE):Me(s.SAMPLE_ALPHA_TO_COVERAGE)}function mt(O){b!==O&&(O?s.frontFace(s.CW):s.frontFace(s.CCW),b=O)}function De(O){O!==Cp?(Pe(s.CULL_FACE),O!==v&&(O===Xu?s.cullFace(s.BACK):O===Pp?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Me(s.CULL_FACE),v=O}function Lt(O){O!==U&&(ee&&s.lineWidth(O),U=O)}function Qe(O,Z,J){O?(Pe(s.POLYGON_OFFSET_FILL),(G!==Z||z!==J)&&(s.polygonOffset(Z,J),G=Z,z=J)):Me(s.POLYGON_OFFSET_FILL)}function et(O){O?Pe(s.SCISSOR_TEST):Me(s.SCISSOR_TEST)}function D(O){O===void 0&&(O=s.TEXTURE0+B-1),j!==O&&(s.activeTexture(O),j=O)}function w(O,Z,J){J===void 0&&(j===null?J=s.TEXTURE0+B-1:J=j);let re=be[J];re===void 0&&(re={type:void 0,texture:void 0},be[J]=re),(re.type!==O||re.texture!==Z)&&(j!==J&&(s.activeTexture(J),j=J),s.bindTexture(O,Z||he[O]),re.type=O,re.texture=Z)}function K(){let O=be[j];O!==void 0&&O.type!==void 0&&(s.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function oe(){try{s.compressedTexImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function le(){try{s.compressedTexImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ae(){try{s.texSubImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Be(){try{s.texSubImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ye(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ve(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function qe(){try{s.texStorage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function te(){try{s.texStorage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ee(){try{s.texImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ot(){try{s.texImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Je(O){Ge.equals(O)===!1&&(s.scissor(O.x,O.y,O.z,O.w),Ge.copy(O))}function Ae(O){$e.equals(O)===!1&&(s.viewport(O.x,O.y,O.z,O.w),$e.copy(O))}function Ke(O,Z){let J=l.get(Z);J===void 0&&(J=new WeakMap,l.set(Z,J));let re=J.get(O);re===void 0&&(re=s.getUniformBlockIndex(Z,O.name),J.set(O,re))}function me(O,Z){let re=l.get(Z).get(O);o.get(Z)!==re&&(s.uniformBlockBinding(Z,re,O.__bindingPointIndex),o.set(Z,re))}function Ft(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),c={},j=null,be={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,m=null,p=null,M=null,y=null,S=null,F=null,R=new Ne(0,0,0),P=0,L=!1,b=null,v=null,U=null,G=null,z=null,Ge.set(0,0,s.canvas.width,s.canvas.height),$e.set(0,0,s.canvas.width,s.canvas.height),i.reset(),r.reset(),a.reset()}return{buffers:{color:i,depth:r,stencil:a},enable:Pe,disable:Me,bindFramebuffer:it,drawBuffers:at,useProgram:ht,setBlending:st,setMaterial:St,setFlipSided:mt,setCullFace:De,setLineWidth:Lt,setPolygonOffset:Qe,setScissorTest:et,activeTexture:D,bindTexture:w,unbindTexture:K,compressedTexImage2D:oe,compressedTexImage3D:le,texImage2D:Ee,texImage3D:ot,updateUBOMapping:Ke,uniformBlockBinding:me,texStorage2D:qe,texStorage3D:te,texSubImage2D:ae,texSubImage3D:Be,compressedTexSubImage2D:ye,compressedTexSubImage3D:ve,scissor:Je,viewport:Ae,reset:Ft}}function Vd(s,e,t,n){let i=vx(n);switch(t){case wf:return s*e;case Tf:return s*e;case Af:return s*e*2;case Uh:return s*e/i.components*i.byteLength;case Nh:return s*e/i.components*i.byteLength;case Rf:return s*e*2/i.components*i.byteLength;case Oh:return s*e*2/i.components*i.byteLength;case Ef:return s*e*3/i.components*i.byteLength;case Hn:return s*e*4/i.components*i.byteLength;case Fh:return s*e*4/i.components*i.byteLength;case fo:case po:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case mo:case go:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case gc:case yc:return Math.max(s,16)*Math.max(e,8)/4;case mc:case _c:return Math.max(s,8)*Math.max(e,8)/2;case xc:case vc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Mc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Sc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case bc:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case wc:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Ec:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Tc:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Ac:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Rc:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Cc:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Pc:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Ic:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Lc:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Dc:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Uc:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Nc:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case _o:case Oc:case Fc:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Cf:case Bc:return Math.ceil(s/4)*Math.ceil(e/4)*8;case kc:case zc:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function vx(s){switch(s){case Ti:case Mf:return{byteLength:1,components:1};case Jr:case Sf:case Mn:return{byteLength:2,components:1};case Lh:case Dh:return{byteLength:2,components:4};case gs:case Ih:case Tn:return{byteLength:4,components:1};case bf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function Mx(s,e,t,n,i,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ce,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(D,w){return f?new OffscreenCanvas(D,w):Qr("canvas")}function _(D,w,K){let oe=1,le=et(D);if((le.width>K||le.height>K)&&(oe=K/Math.max(le.width,le.height)),oe<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){let ae=Math.floor(oe*le.width),Be=Math.floor(oe*le.height);u===void 0&&(u=g(ae,Be));let ye=w?g(ae,Be):u;return ye.width=ae,ye.height=Be,ye.getContext("2d").drawImage(D,0,0,ae,Be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+le.width+"x"+le.height+") to ("+ae+"x"+Be+")."),ye}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+le.width+"x"+le.height+")."),D;return D}function m(D){return D.generateMipmaps&&D.minFilter!==vn&&D.minFilter!==Ht}function p(D){s.generateMipmap(D)}function M(D,w,K,oe,le=!1){if(D!==null){if(s[D]!==void 0)return s[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let ae=w;if(w===s.RED&&(K===s.FLOAT&&(ae=s.R32F),K===s.HALF_FLOAT&&(ae=s.R16F),K===s.UNSIGNED_BYTE&&(ae=s.R8)),w===s.RED_INTEGER&&(K===s.UNSIGNED_BYTE&&(ae=s.R8UI),K===s.UNSIGNED_SHORT&&(ae=s.R16UI),K===s.UNSIGNED_INT&&(ae=s.R32UI),K===s.BYTE&&(ae=s.R8I),K===s.SHORT&&(ae=s.R16I),K===s.INT&&(ae=s.R32I)),w===s.RG&&(K===s.FLOAT&&(ae=s.RG32F),K===s.HALF_FLOAT&&(ae=s.RG16F),K===s.UNSIGNED_BYTE&&(ae=s.RG8)),w===s.RG_INTEGER&&(K===s.UNSIGNED_BYTE&&(ae=s.RG8UI),K===s.UNSIGNED_SHORT&&(ae=s.RG16UI),K===s.UNSIGNED_INT&&(ae=s.RG32UI),K===s.BYTE&&(ae=s.RG8I),K===s.SHORT&&(ae=s.RG16I),K===s.INT&&(ae=s.RG32I)),w===s.RGB&&K===s.UNSIGNED_INT_5_9_9_9_REV&&(ae=s.RGB9_E5),w===s.RGBA){let Be=le?xo:_t.getTransfer(oe);K===s.FLOAT&&(ae=s.RGBA32F),K===s.HALF_FLOAT&&(ae=s.RGBA16F),K===s.UNSIGNED_BYTE&&(ae=Be===Tt?s.SRGB8_ALPHA8:s.RGBA8),K===s.UNSIGNED_SHORT_4_4_4_4&&(ae=s.RGBA4),K===s.UNSIGNED_SHORT_5_5_5_1&&(ae=s.RGB5_A1)}return(ae===s.R16F||ae===s.R32F||ae===s.RG16F||ae===s.RG32F||ae===s.RGBA16F||ae===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ae}function y(D,w){let K;return D?w===null||w===gs||w===dr?K=s.DEPTH24_STENCIL8:w===Tn?K=s.DEPTH32F_STENCIL8:w===Jr&&(K=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===gs||w===dr?K=s.DEPTH_COMPONENT24:w===Tn?K=s.DEPTH_COMPONENT32F:w===Jr&&(K=s.DEPTH_COMPONENT16),K}function S(D,w){return m(D)===!0||D.isFramebufferTexture&&D.minFilter!==vn&&D.minFilter!==Ht?Math.log2(Math.max(w.width,w.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?w.mipmaps.length:1}function F(D){let w=D.target;w.removeEventListener("dispose",F),P(w),w.isVideoTexture&&h.delete(w)}function R(D){let w=D.target;w.removeEventListener("dispose",R),b(w)}function P(D){let w=n.get(D);if(w.__webglInit===void 0)return;let K=D.source,oe=d.get(K);if(oe){let le=oe[w.__cacheKey];le.usedTimes--,le.usedTimes===0&&L(D),Object.keys(oe).length===0&&d.delete(K)}n.remove(D)}function L(D){let w=n.get(D);s.deleteTexture(w.__webglTexture);let K=D.source,oe=d.get(K);delete oe[w.__cacheKey],a.memory.textures--}function b(D){let w=n.get(D);if(D.depthTexture&&D.depthTexture.dispose(),D.isWebGLCubeRenderTarget)for(let oe=0;oe<6;oe++){if(Array.isArray(w.__webglFramebuffer[oe]))for(let le=0;le<w.__webglFramebuffer[oe].length;le++)s.deleteFramebuffer(w.__webglFramebuffer[oe][le]);else s.deleteFramebuffer(w.__webglFramebuffer[oe]);w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer[oe])}else{if(Array.isArray(w.__webglFramebuffer))for(let oe=0;oe<w.__webglFramebuffer.length;oe++)s.deleteFramebuffer(w.__webglFramebuffer[oe]);else s.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&s.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let oe=0;oe<w.__webglColorRenderbuffer.length;oe++)w.__webglColorRenderbuffer[oe]&&s.deleteRenderbuffer(w.__webglColorRenderbuffer[oe]);w.__webglDepthRenderbuffer&&s.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let K=D.textures;for(let oe=0,le=K.length;oe<le;oe++){let ae=n.get(K[oe]);ae.__webglTexture&&(s.deleteTexture(ae.__webglTexture),a.memory.textures--),n.remove(K[oe])}n.remove(D)}let v=0;function U(){v=0}function G(){let D=v;return D>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+i.maxTextures),v+=1,D}function z(D){let w=[];return w.push(D.wrapS),w.push(D.wrapT),w.push(D.wrapR||0),w.push(D.magFilter),w.push(D.minFilter),w.push(D.anisotropy),w.push(D.internalFormat),w.push(D.format),w.push(D.type),w.push(D.generateMipmaps),w.push(D.premultiplyAlpha),w.push(D.flipY),w.push(D.unpackAlignment),w.push(D.colorSpace),w.join()}function B(D,w){let K=n.get(D);if(D.isVideoTexture&&Lt(D),D.isRenderTargetTexture===!1&&D.version>0&&K.__version!==D.version){let oe=D.image;if(oe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$e(K,D,w);return}}t.bindTexture(s.TEXTURE_2D,K.__webglTexture,s.TEXTURE0+w)}function ee(D,w){let K=n.get(D);if(D.version>0&&K.__version!==D.version){$e(K,D,w);return}t.bindTexture(s.TEXTURE_2D_ARRAY,K.__webglTexture,s.TEXTURE0+w)}function W(D,w){let K=n.get(D);if(D.version>0&&K.__version!==D.version){$e(K,D,w);return}t.bindTexture(s.TEXTURE_3D,K.__webglTexture,s.TEXTURE0+w)}function ie(D,w){let K=n.get(D);if(D.version>0&&K.__version!==D.version){ne(K,D,w);return}t.bindTexture(s.TEXTURE_CUBE_MAP,K.__webglTexture,s.TEXTURE0+w)}let j={[ms]:s.REPEAT,[Ct]:s.CLAMP_TO_EDGE,[Zr]:s.MIRRORED_REPEAT},be={[vn]:s.NEAREST,[Ph]:s.NEAREST_MIPMAP_NEAREST,[nr]:s.NEAREST_MIPMAP_LINEAR,[Ht]:s.LINEAR,[Gr]:s.LINEAR_MIPMAP_NEAREST,[ri]:s.LINEAR_MIPMAP_LINEAR},xe={[hm]:s.NEVER,[gm]:s.ALWAYS,[um]:s.LESS,[Lf]:s.LEQUAL,[dm]:s.EQUAL,[mm]:s.GEQUAL,[fm]:s.GREATER,[pm]:s.NOTEQUAL};function Ce(D,w){if(w.type===Tn&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===Ht||w.magFilter===Gr||w.magFilter===nr||w.magFilter===ri||w.minFilter===Ht||w.minFilter===Gr||w.minFilter===nr||w.minFilter===ri)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(D,s.TEXTURE_WRAP_S,j[w.wrapS]),s.texParameteri(D,s.TEXTURE_WRAP_T,j[w.wrapT]),(D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY)&&s.texParameteri(D,s.TEXTURE_WRAP_R,j[w.wrapR]),s.texParameteri(D,s.TEXTURE_MAG_FILTER,be[w.magFilter]),s.texParameteri(D,s.TEXTURE_MIN_FILTER,be[w.minFilter]),w.compareFunction&&(s.texParameteri(D,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(D,s.TEXTURE_COMPARE_FUNC,xe[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===vn||w.minFilter!==nr&&w.minFilter!==ri||w.type===Tn&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){let K=e.get("EXT_texture_filter_anisotropic");s.texParameterf(D,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Ge(D,w){let K=!1;D.__webglInit===void 0&&(D.__webglInit=!0,w.addEventListener("dispose",F));let oe=w.source,le=d.get(oe);le===void 0&&(le={},d.set(oe,le));let ae=z(w);if(ae!==D.__cacheKey){le[ae]===void 0&&(le[ae]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,K=!0),le[ae].usedTimes++;let Be=le[D.__cacheKey];Be!==void 0&&(le[D.__cacheKey].usedTimes--,Be.usedTimes===0&&L(w)),D.__cacheKey=ae,D.__webglTexture=le[ae].texture}return K}function $e(D,w,K){let oe=s.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(oe=s.TEXTURE_2D_ARRAY),w.isData3DTexture&&(oe=s.TEXTURE_3D);let le=Ge(D,w),ae=w.source;t.bindTexture(oe,D.__webglTexture,s.TEXTURE0+K);let Be=n.get(ae);if(ae.version!==Be.__version||le===!0){t.activeTexture(s.TEXTURE0+K);let ye=_t.getPrimaries(_t.workingColorSpace),ve=w.colorSpace===ki?null:_t.getPrimaries(w.colorSpace),qe=w.colorSpace===ki||ye===ve?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,qe);let te=_(w.image,!1,i.maxTextureSize);te=Qe(w,te);let Ee=r.convert(w.format,w.colorSpace),ot=r.convert(w.type),Je=M(w.internalFormat,Ee,ot,w.colorSpace,w.isVideoTexture);Ce(oe,w);let Ae,Ke=w.mipmaps,me=w.isVideoTexture!==!0,Ft=Be.__version===void 0||le===!0,O=ae.dataReady,Z=S(w,te);if(w.isDepthTexture)Je=y(w.format===fr,w.type),Ft&&(me?t.texStorage2D(s.TEXTURE_2D,1,Je,te.width,te.height):t.texImage2D(s.TEXTURE_2D,0,Je,te.width,te.height,0,Ee,ot,null));else if(w.isDataTexture)if(Ke.length>0){me&&Ft&&t.texStorage2D(s.TEXTURE_2D,Z,Je,Ke[0].width,Ke[0].height);for(let J=0,re=Ke.length;J<re;J++)Ae=Ke[J],me?O&&t.texSubImage2D(s.TEXTURE_2D,J,0,0,Ae.width,Ae.height,Ee,ot,Ae.data):t.texImage2D(s.TEXTURE_2D,J,Je,Ae.width,Ae.height,0,Ee,ot,Ae.data);w.generateMipmaps=!1}else me?(Ft&&t.texStorage2D(s.TEXTURE_2D,Z,Je,te.width,te.height),O&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,te.width,te.height,Ee,ot,te.data)):t.texImage2D(s.TEXTURE_2D,0,Je,te.width,te.height,0,Ee,ot,te.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){me&&Ft&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Z,Je,Ke[0].width,Ke[0].height,te.depth);for(let J=0,re=Ke.length;J<re;J++)if(Ae=Ke[J],w.format!==Hn)if(Ee!==null)if(me){if(O)if(w.layerUpdates.size>0){let ue=Vd(Ae.width,Ae.height,w.format,w.type);for(let We of w.layerUpdates){let Ze=Ae.data.subarray(We*ue/Ae.data.BYTES_PER_ELEMENT,(We+1)*ue/Ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,We,Ae.width,Ae.height,1,Ee,Ze,0,0)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,0,Ae.width,Ae.height,te.depth,Ee,Ae.data,0,0)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,J,Je,Ae.width,Ae.height,te.depth,0,Ae.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else me?O&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,0,Ae.width,Ae.height,te.depth,Ee,ot,Ae.data):t.texImage3D(s.TEXTURE_2D_ARRAY,J,Je,Ae.width,Ae.height,te.depth,0,Ee,ot,Ae.data)}else{me&&Ft&&t.texStorage2D(s.TEXTURE_2D,Z,Je,Ke[0].width,Ke[0].height);for(let J=0,re=Ke.length;J<re;J++)Ae=Ke[J],w.format!==Hn?Ee!==null?me?O&&t.compressedTexSubImage2D(s.TEXTURE_2D,J,0,0,Ae.width,Ae.height,Ee,Ae.data):t.compressedTexImage2D(s.TEXTURE_2D,J,Je,Ae.width,Ae.height,0,Ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):me?O&&t.texSubImage2D(s.TEXTURE_2D,J,0,0,Ae.width,Ae.height,Ee,ot,Ae.data):t.texImage2D(s.TEXTURE_2D,J,Je,Ae.width,Ae.height,0,Ee,ot,Ae.data)}else if(w.isDataArrayTexture)if(me){if(Ft&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Z,Je,te.width,te.height,te.depth),O)if(w.layerUpdates.size>0){let J=Vd(te.width,te.height,w.format,w.type);for(let re of w.layerUpdates){let ue=te.data.subarray(re*J/te.data.BYTES_PER_ELEMENT,(re+1)*J/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,re,te.width,te.height,1,Ee,ot,ue)}w.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,Ee,ot,te.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Je,te.width,te.height,te.depth,0,Ee,ot,te.data);else if(w.isData3DTexture)me?(Ft&&t.texStorage3D(s.TEXTURE_3D,Z,Je,te.width,te.height,te.depth),O&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,Ee,ot,te.data)):t.texImage3D(s.TEXTURE_3D,0,Je,te.width,te.height,te.depth,0,Ee,ot,te.data);else if(w.isFramebufferTexture){if(Ft)if(me)t.texStorage2D(s.TEXTURE_2D,Z,Je,te.width,te.height);else{let J=te.width,re=te.height;for(let ue=0;ue<Z;ue++)t.texImage2D(s.TEXTURE_2D,ue,Je,J,re,0,Ee,ot,null),J>>=1,re>>=1}}else if(Ke.length>0){if(me&&Ft){let J=et(Ke[0]);t.texStorage2D(s.TEXTURE_2D,Z,Je,J.width,J.height)}for(let J=0,re=Ke.length;J<re;J++)Ae=Ke[J],me?O&&t.texSubImage2D(s.TEXTURE_2D,J,0,0,Ee,ot,Ae):t.texImage2D(s.TEXTURE_2D,J,Je,Ee,ot,Ae);w.generateMipmaps=!1}else if(me){if(Ft){let J=et(te);t.texStorage2D(s.TEXTURE_2D,Z,Je,J.width,J.height)}O&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Ee,ot,te)}else t.texImage2D(s.TEXTURE_2D,0,Je,Ee,ot,te);m(w)&&p(oe),Be.__version=ae.version,w.onUpdate&&w.onUpdate(w)}D.__version=w.version}function ne(D,w,K){if(w.image.length!==6)return;let oe=Ge(D,w),le=w.source;t.bindTexture(s.TEXTURE_CUBE_MAP,D.__webglTexture,s.TEXTURE0+K);let ae=n.get(le);if(le.version!==ae.__version||oe===!0){t.activeTexture(s.TEXTURE0+K);let Be=_t.getPrimaries(_t.workingColorSpace),ye=w.colorSpace===ki?null:_t.getPrimaries(w.colorSpace),ve=w.colorSpace===ki||Be===ye?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);let qe=w.isCompressedTexture||w.image[0].isCompressedTexture,te=w.image[0]&&w.image[0].isDataTexture,Ee=[];for(let re=0;re<6;re++)!qe&&!te?Ee[re]=_(w.image[re],!0,i.maxCubemapSize):Ee[re]=te?w.image[re].image:w.image[re],Ee[re]=Qe(w,Ee[re]);let ot=Ee[0],Je=r.convert(w.format,w.colorSpace),Ae=r.convert(w.type),Ke=M(w.internalFormat,Je,Ae,w.colorSpace),me=w.isVideoTexture!==!0,Ft=ae.__version===void 0||oe===!0,O=le.dataReady,Z=S(w,ot);Ce(s.TEXTURE_CUBE_MAP,w);let J;if(qe){me&&Ft&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Z,Ke,ot.width,ot.height);for(let re=0;re<6;re++){J=Ee[re].mipmaps;for(let ue=0;ue<J.length;ue++){let We=J[ue];w.format!==Hn?Je!==null?me?O&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,ue,0,0,We.width,We.height,Je,We.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,ue,Ke,We.width,We.height,0,We.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):me?O&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,ue,0,0,We.width,We.height,Je,Ae,We.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,ue,Ke,We.width,We.height,0,Je,Ae,We.data)}}}else{if(J=w.mipmaps,me&&Ft){J.length>0&&Z++;let re=et(Ee[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Z,Ke,re.width,re.height)}for(let re=0;re<6;re++)if(te){me?O&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Ee[re].width,Ee[re].height,Je,Ae,Ee[re].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ke,Ee[re].width,Ee[re].height,0,Je,Ae,Ee[re].data);for(let ue=0;ue<J.length;ue++){let Ze=J[ue].image[re].image;me?O&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,ue+1,0,0,Ze.width,Ze.height,Je,Ae,Ze.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,ue+1,Ke,Ze.width,Ze.height,0,Je,Ae,Ze.data)}}else{me?O&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Je,Ae,Ee[re]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ke,Je,Ae,Ee[re]);for(let ue=0;ue<J.length;ue++){let We=J[ue];me?O&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,ue+1,0,0,Je,Ae,We.image[re]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,ue+1,Ke,Je,Ae,We.image[re])}}}m(w)&&p(s.TEXTURE_CUBE_MAP),ae.__version=le.version,w.onUpdate&&w.onUpdate(w)}D.__version=w.version}function he(D,w,K,oe,le,ae){let Be=r.convert(K.format,K.colorSpace),ye=r.convert(K.type),ve=M(K.internalFormat,Be,ye,K.colorSpace);if(!n.get(w).__hasExternalTextures){let te=Math.max(1,w.width>>ae),Ee=Math.max(1,w.height>>ae);le===s.TEXTURE_3D||le===s.TEXTURE_2D_ARRAY?t.texImage3D(le,ae,ve,te,Ee,w.depth,0,Be,ye,null):t.texImage2D(le,ae,ve,te,Ee,0,Be,ye,null)}t.bindFramebuffer(s.FRAMEBUFFER,D),De(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,oe,le,n.get(K).__webglTexture,0,mt(w)):(le===s.TEXTURE_2D||le>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&le<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,oe,le,n.get(K).__webglTexture,ae),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Pe(D,w,K){if(s.bindRenderbuffer(s.RENDERBUFFER,D),w.depthBuffer){let oe=w.depthTexture,le=oe&&oe.isDepthTexture?oe.type:null,ae=y(w.stencilBuffer,le),Be=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ye=mt(w);De(w)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ye,ae,w.width,w.height):K?s.renderbufferStorageMultisample(s.RENDERBUFFER,ye,ae,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,ae,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Be,s.RENDERBUFFER,D)}else{let oe=w.textures;for(let le=0;le<oe.length;le++){let ae=oe[le],Be=r.convert(ae.format,ae.colorSpace),ye=r.convert(ae.type),ve=M(ae.internalFormat,Be,ye,ae.colorSpace),qe=mt(w);K&&De(w)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,qe,ve,w.width,w.height):De(w)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,qe,ve,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,ve,w.width,w.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Me(D,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,D),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),B(w.depthTexture,0);let oe=n.get(w.depthTexture).__webglTexture,le=mt(w);if(w.depthTexture.format===ar)De(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,oe,0,le):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,oe,0);else if(w.depthTexture.format===fr)De(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,oe,0,le):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,oe,0);else throw new Error("Unknown depthTexture format")}function it(D){let w=n.get(D),K=D.isWebGLCubeRenderTarget===!0;if(D.depthTexture&&!w.__autoAllocateDepthBuffer){if(K)throw new Error("target.depthTexture not supported in Cube render targets");Me(w.__webglFramebuffer,D)}else if(K){w.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[oe]),w.__webglDepthbuffer[oe]=s.createRenderbuffer(),Pe(w.__webglDepthbuffer[oe],D,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer=s.createRenderbuffer(),Pe(w.__webglDepthbuffer,D,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function at(D,w,K){let oe=n.get(D);w!==void 0&&he(oe.__webglFramebuffer,D,D.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),K!==void 0&&it(D)}function ht(D){let w=D.texture,K=n.get(D),oe=n.get(w);D.addEventListener("dispose",R);let le=D.textures,ae=D.isWebGLCubeRenderTarget===!0,Be=le.length>1;if(Be||(oe.__webglTexture===void 0&&(oe.__webglTexture=s.createTexture()),oe.__version=w.version,a.memory.textures++),ae){K.__webglFramebuffer=[];for(let ye=0;ye<6;ye++)if(w.mipmaps&&w.mipmaps.length>0){K.__webglFramebuffer[ye]=[];for(let ve=0;ve<w.mipmaps.length;ve++)K.__webglFramebuffer[ye][ve]=s.createFramebuffer()}else K.__webglFramebuffer[ye]=s.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){K.__webglFramebuffer=[];for(let ye=0;ye<w.mipmaps.length;ye++)K.__webglFramebuffer[ye]=s.createFramebuffer()}else K.__webglFramebuffer=s.createFramebuffer();if(Be)for(let ye=0,ve=le.length;ye<ve;ye++){let qe=n.get(le[ye]);qe.__webglTexture===void 0&&(qe.__webglTexture=s.createTexture(),a.memory.textures++)}if(D.samples>0&&De(D)===!1){K.__webglMultisampledFramebuffer=s.createFramebuffer(),K.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let ye=0;ye<le.length;ye++){let ve=le[ye];K.__webglColorRenderbuffer[ye]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,K.__webglColorRenderbuffer[ye]);let qe=r.convert(ve.format,ve.colorSpace),te=r.convert(ve.type),Ee=M(ve.internalFormat,qe,te,ve.colorSpace,D.isXRRenderTarget===!0),ot=mt(D);s.renderbufferStorageMultisample(s.RENDERBUFFER,ot,Ee,D.width,D.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ye,s.RENDERBUFFER,K.__webglColorRenderbuffer[ye])}s.bindRenderbuffer(s.RENDERBUFFER,null),D.depthBuffer&&(K.__webglDepthRenderbuffer=s.createRenderbuffer(),Pe(K.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ae){t.bindTexture(s.TEXTURE_CUBE_MAP,oe.__webglTexture),Ce(s.TEXTURE_CUBE_MAP,w);for(let ye=0;ye<6;ye++)if(w.mipmaps&&w.mipmaps.length>0)for(let ve=0;ve<w.mipmaps.length;ve++)he(K.__webglFramebuffer[ye][ve],D,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,ve);else he(K.__webglFramebuffer[ye],D,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0);m(w)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Be){for(let ye=0,ve=le.length;ye<ve;ye++){let qe=le[ye],te=n.get(qe);t.bindTexture(s.TEXTURE_2D,te.__webglTexture),Ce(s.TEXTURE_2D,qe),he(K.__webglFramebuffer,D,qe,s.COLOR_ATTACHMENT0+ye,s.TEXTURE_2D,0),m(qe)&&p(s.TEXTURE_2D)}t.unbindTexture()}else{let ye=s.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(ye=D.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ye,oe.__webglTexture),Ce(ye,w),w.mipmaps&&w.mipmaps.length>0)for(let ve=0;ve<w.mipmaps.length;ve++)he(K.__webglFramebuffer[ve],D,w,s.COLOR_ATTACHMENT0,ye,ve);else he(K.__webglFramebuffer,D,w,s.COLOR_ATTACHMENT0,ye,0);m(w)&&p(ye),t.unbindTexture()}D.depthBuffer&&it(D)}function It(D){let w=D.textures;for(let K=0,oe=w.length;K<oe;K++){let le=w[K];if(m(le)){let ae=D.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,Be=n.get(le).__webglTexture;t.bindTexture(ae,Be),p(ae),t.unbindTexture()}}}let N=[],st=[];function St(D){if(D.samples>0){if(De(D)===!1){let w=D.textures,K=D.width,oe=D.height,le=s.COLOR_BUFFER_BIT,ae=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Be=n.get(D),ye=w.length>1;if(ye)for(let ve=0;ve<w.length;ve++)t.bindFramebuffer(s.FRAMEBUFFER,Be.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ve,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Be.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ve,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Be.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Be.__webglFramebuffer);for(let ve=0;ve<w.length;ve++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(le|=s.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(le|=s.STENCIL_BUFFER_BIT)),ye){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Be.__webglColorRenderbuffer[ve]);let qe=n.get(w[ve]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,qe,0)}s.blitFramebuffer(0,0,K,oe,0,0,K,oe,le,s.NEAREST),l===!0&&(N.length=0,st.length=0,N.push(s.COLOR_ATTACHMENT0+ve),D.depthBuffer&&D.resolveDepthBuffer===!1&&(N.push(ae),st.push(ae),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,st)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,N))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ye)for(let ve=0;ve<w.length;ve++){t.bindFramebuffer(s.FRAMEBUFFER,Be.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ve,s.RENDERBUFFER,Be.__webglColorRenderbuffer[ve]);let qe=n.get(w[ve]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Be.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ve,s.TEXTURE_2D,qe,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Be.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&l){let w=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[w])}}}function mt(D){return Math.min(i.maxSamples,D.samples)}function De(D){let w=n.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Lt(D){let w=a.render.frame;h.get(D)!==w&&(h.set(D,w),D.update())}function Qe(D,w){let K=D.colorSpace,oe=D.format,le=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||K!==en&&K!==ki&&(_t.getTransfer(K)===Tt?(oe!==Hn||le!==Ti)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",K)),w}function et(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=U,this.setTexture2D=B,this.setTexture2DArray=ee,this.setTexture3D=W,this.setTextureCube=ie,this.rebindTextures=at,this.setupRenderTarget=ht,this.updateRenderTargetMipmap=It,this.updateMultisampleRenderTarget=St,this.setupDepthRenderbuffer=it,this.setupFrameBufferTexture=he,this.useMultisampledRTT=De}function Sx(s,e){function t(n,i=ki){let r,a=_t.getTransfer(i);if(n===Ti)return s.UNSIGNED_BYTE;if(n===Lh)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Dh)return s.UNSIGNED_SHORT_5_5_5_1;if(n===bf)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Mf)return s.BYTE;if(n===Sf)return s.SHORT;if(n===Jr)return s.UNSIGNED_SHORT;if(n===Ih)return s.INT;if(n===gs)return s.UNSIGNED_INT;if(n===Tn)return s.FLOAT;if(n===Mn)return s.HALF_FLOAT;if(n===wf)return s.ALPHA;if(n===Ef)return s.RGB;if(n===Hn)return s.RGBA;if(n===Tf)return s.LUMINANCE;if(n===Af)return s.LUMINANCE_ALPHA;if(n===ar)return s.DEPTH_COMPONENT;if(n===fr)return s.DEPTH_STENCIL;if(n===Uh)return s.RED;if(n===Nh)return s.RED_INTEGER;if(n===Rf)return s.RG;if(n===Oh)return s.RG_INTEGER;if(n===Fh)return s.RGBA_INTEGER;if(n===fo||n===po||n===mo||n===go)if(a===Tt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===fo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===po)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===mo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===go)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===fo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===po)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===mo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===go)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===mc||n===gc||n===_c||n===yc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===mc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===gc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===_c)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===yc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===xc||n===vc||n===Mc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===xc||n===vc)return a===Tt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Mc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Sc||n===bc||n===wc||n===Ec||n===Tc||n===Ac||n===Rc||n===Cc||n===Pc||n===Ic||n===Lc||n===Dc||n===Uc||n===Nc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Sc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===bc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===wc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ec)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Tc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ac)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Rc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Cc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Pc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ic)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Lc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Dc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Uc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Nc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===_o||n===Oc||n===Fc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===_o)return a===Tt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Oc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Fc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Cf||n===Bc||n===kc||n===zc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===_o)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Bc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===kc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===zc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===dr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var th=class extends sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Qt=class extends kt{constructor(){super(),this.isGroup=!0,this.type="Group"}},bx={type:"move"},Xr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let _ of e.hand.values()){let m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(bx)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Qt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},wx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ex=`
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

}`,nh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let i=new un,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new an({vertexShader:wx,fragmentShader:Ex,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Xt(new yr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ih=class extends Gi{constructor(e,t){super();let n=this,i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null,_=new nh,m=t.getContextAttributes(),p=null,M=null,y=[],S=[],F=new ce,R=null,P=new sn;P.layers.enable(1),P.viewport=new Et;let L=new sn;L.layers.enable(2),L.viewport=new Et;let b=[P,L],v=new th;v.layers.enable(1),v.layers.enable(2);let U=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ne){let he=y[ne];return he===void 0&&(he=new Xr,y[ne]=he),he.getTargetRaySpace()},this.getControllerGrip=function(ne){let he=y[ne];return he===void 0&&(he=new Xr,y[ne]=he),he.getGripSpace()},this.getHand=function(ne){let he=y[ne];return he===void 0&&(he=new Xr,y[ne]=he),he.getHandSpace()};function z(ne){let he=S.indexOf(ne.inputSource);if(he===-1)return;let Pe=y[he];Pe!==void 0&&(Pe.update(ne.inputSource,ne.frame,c||a),Pe.dispatchEvent({type:ne.type,data:ne.inputSource}))}function B(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",B),i.removeEventListener("inputsourceschange",ee);for(let ne=0;ne<y.length;ne++){let he=S[ne];he!==null&&(S[ne]=null,y[ne].disconnect(he))}U=null,G=null,_.reset(),e.setRenderTarget(p),f=null,d=null,u=null,i=null,M=null,$e.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(F.width,F.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ne){r=ne,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ne){o=ne,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(ne){c=ne},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(ne){if(i=ne,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",B),i.addEventListener("inputsourceschange",ee),m.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(F),i.renderState.layers===void 0){let he={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,he),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new An(f.framebufferWidth,f.framebufferHeight,{format:Hn,type:Ti,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let he=null,Pe=null,Me=null;m.depth&&(Me=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,he=m.stencil?fr:ar,Pe=m.stencil?dr:gs);let it={colorFormat:t.RGBA8,depthFormat:Me,scaleFactor:r};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(it),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new An(d.textureWidth,d.textureHeight,{format:Hn,type:Ti,depthTexture:new Po(d.textureWidth,d.textureHeight,Pe,void 0,void 0,void 0,void 0,void 0,void 0,he),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),$e.setContext(i),$e.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function ee(ne){for(let he=0;he<ne.removed.length;he++){let Pe=ne.removed[he],Me=S.indexOf(Pe);Me>=0&&(S[Me]=null,y[Me].disconnect(Pe))}for(let he=0;he<ne.added.length;he++){let Pe=ne.added[he],Me=S.indexOf(Pe);if(Me===-1){for(let at=0;at<y.length;at++)if(at>=S.length){S.push(Pe),Me=at;break}else if(S[at]===null){S[at]=Pe,Me=at;break}if(Me===-1)break}let it=y[Me];it&&it.connect(Pe)}}let W=new A,ie=new A;function j(ne,he,Pe){W.setFromMatrixPosition(he.matrixWorld),ie.setFromMatrixPosition(Pe.matrixWorld);let Me=W.distanceTo(ie),it=he.projectionMatrix.elements,at=Pe.projectionMatrix.elements,ht=it[14]/(it[10]-1),It=it[14]/(it[10]+1),N=(it[9]+1)/it[5],st=(it[9]-1)/it[5],St=(it[8]-1)/it[0],mt=(at[8]+1)/at[0],De=ht*St,Lt=ht*mt,Qe=Me/(-St+mt),et=Qe*-St;he.matrixWorld.decompose(ne.position,ne.quaternion,ne.scale),ne.translateX(et),ne.translateZ(Qe),ne.matrixWorld.compose(ne.position,ne.quaternion,ne.scale),ne.matrixWorldInverse.copy(ne.matrixWorld).invert();let D=ht+Qe,w=It+Qe,K=De-et,oe=Lt+(Me-et),le=N*It/w*D,ae=st*It/w*D;ne.projectionMatrix.makePerspective(K,oe,le,ae,D,w),ne.projectionMatrixInverse.copy(ne.projectionMatrix).invert()}function be(ne,he){he===null?ne.matrixWorld.copy(ne.matrix):ne.matrixWorld.multiplyMatrices(he.matrixWorld,ne.matrix),ne.matrixWorldInverse.copy(ne.matrixWorld).invert()}this.updateCamera=function(ne){if(i===null)return;_.texture!==null&&(ne.near=_.depthNear,ne.far=_.depthFar),v.near=L.near=P.near=ne.near,v.far=L.far=P.far=ne.far,(U!==v.near||G!==v.far)&&(i.updateRenderState({depthNear:v.near,depthFar:v.far}),U=v.near,G=v.far,P.near=U,P.far=G,L.near=U,L.far=G,P.updateProjectionMatrix(),L.updateProjectionMatrix(),ne.updateProjectionMatrix());let he=ne.parent,Pe=v.cameras;be(v,he);for(let Me=0;Me<Pe.length;Me++)be(Pe[Me],he);Pe.length===2?j(v,P,L):v.projectionMatrix.copy(P.projectionMatrix),xe(ne,v,he)};function xe(ne,he,Pe){Pe===null?ne.matrix.copy(he.matrixWorld):(ne.matrix.copy(Pe.matrixWorld),ne.matrix.invert(),ne.matrix.multiply(he.matrixWorld)),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.updateMatrixWorld(!0),ne.projectionMatrix.copy(he.projectionMatrix),ne.projectionMatrixInverse.copy(he.projectionMatrixInverse),ne.isPerspectiveCamera&&(ne.fov=gr*2*Math.atan(1/ne.projectionMatrix.elements[5]),ne.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(ne){l=ne,d!==null&&(d.fixedFoveation=ne),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=ne)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(v)};let Ce=null;function Ge(ne,he){if(h=he.getViewerPose(c||a),g=he,h!==null){let Pe=h.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let Me=!1;Pe.length!==v.cameras.length&&(v.cameras.length=0,Me=!0);for(let at=0;at<Pe.length;at++){let ht=Pe[at],It=null;if(f!==null)It=f.getViewport(ht);else{let st=u.getViewSubImage(d,ht);It=st.viewport,at===0&&(e.setRenderTargetTextures(M,st.colorTexture,d.ignoreDepthValues?void 0:st.depthStencilTexture),e.setRenderTarget(M))}let N=b[at];N===void 0&&(N=new sn,N.layers.enable(at),N.viewport=new Et,b[at]=N),N.matrix.fromArray(ht.transform.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale),N.projectionMatrix.fromArray(ht.projectionMatrix),N.projectionMatrixInverse.copy(N.projectionMatrix).invert(),N.viewport.set(It.x,It.y,It.width,It.height),at===0&&(v.matrix.copy(N.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),Me===!0&&v.cameras.push(N)}let it=i.enabledFeatures;if(it&&it.includes("depth-sensing")){let at=u.getDepthInformation(Pe[0]);at&&at.isValid&&at.texture&&_.init(e,at,i.renderState)}}for(let Pe=0;Pe<y.length;Pe++){let Me=S[Pe],it=y[Pe];Me!==null&&it!==void 0&&it.update(Me,he,c||a)}Ce&&Ce(ne,he),he.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:he}),g=null}let $e=new Ff;$e.setAnimationLoop(Ge),this.setAnimationLoop=function(ne){Ce=ne},this.dispose=function(){}}},us=new qn,Tx=new je;function Ax(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Of(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,M,y,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,S)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,M,y):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Cn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Cn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let M=e.get(p),y=M.envMap,S=M.envMapRotation;y&&(m.envMap.value=y,us.copy(S),us.x*=-1,us.y*=-1,us.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(us.y*=-1,us.z*=-1),m.envMapRotation.value.setFromMatrix4(Tx.makeRotationFromEuler(us)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Cn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Rx(s,e,t,n){let i={},r={},a=[],o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,y){let S=y.program;n.uniformBlockBinding(M,S)}function c(M,y){let S=i[M.id];S===void 0&&(g(M),S=h(M),i[M.id]=S,M.addEventListener("dispose",m));let F=y.program;n.updateUBOMapping(M,F);let R=e.render.frame;r[M.id]!==R&&(d(M),r[M.id]=R)}function h(M){let y=u();M.__bindingPointIndex=y;let S=s.createBuffer(),F=M.__size,R=M.usage;return s.bindBuffer(s.UNIFORM_BUFFER,S),s.bufferData(s.UNIFORM_BUFFER,F,R),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,S),S}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){let y=i[M.id],S=M.uniforms,F=M.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let R=0,P=S.length;R<P;R++){let L=Array.isArray(S[R])?S[R]:[S[R]];for(let b=0,v=L.length;b<v;b++){let U=L[b];if(f(U,R,b,F)===!0){let G=U.__offset,z=Array.isArray(U.value)?U.value:[U.value],B=0;for(let ee=0;ee<z.length;ee++){let W=z[ee],ie=_(W);typeof W=="number"||typeof W=="boolean"?(U.__data[0]=W,s.bufferSubData(s.UNIFORM_BUFFER,G+B,U.__data)):W.isMatrix3?(U.__data[0]=W.elements[0],U.__data[1]=W.elements[1],U.__data[2]=W.elements[2],U.__data[3]=0,U.__data[4]=W.elements[3],U.__data[5]=W.elements[4],U.__data[6]=W.elements[5],U.__data[7]=0,U.__data[8]=W.elements[6],U.__data[9]=W.elements[7],U.__data[10]=W.elements[8],U.__data[11]=0):(W.toArray(U.__data,B),B+=ie.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,G,U.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(M,y,S,F){let R=M.value,P=y+"_"+S;if(F[P]===void 0)return typeof R=="number"||typeof R=="boolean"?F[P]=R:F[P]=R.clone(),!0;{let L=F[P];if(typeof R=="number"||typeof R=="boolean"){if(L!==R)return F[P]=R,!0}else if(L.equals(R)===!1)return L.copy(R),!0}return!1}function g(M){let y=M.uniforms,S=0,F=16;for(let P=0,L=y.length;P<L;P++){let b=Array.isArray(y[P])?y[P]:[y[P]];for(let v=0,U=b.length;v<U;v++){let G=b[v],z=Array.isArray(G.value)?G.value:[G.value];for(let B=0,ee=z.length;B<ee;B++){let W=z[B],ie=_(W),j=S%F;j!==0&&F-j<ie.boundary&&(S+=F-j),G.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=S,S+=ie.storage}}}let R=S%F;return R>0&&(S+=F-R),M.__size=S,M.__cache={},this}function _(M){let y={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(y.boundary=4,y.storage=4):M.isVector2?(y.boundary=8,y.storage=8):M.isVector3||M.isColor?(y.boundary=16,y.storage=12):M.isVector4?(y.boundary=16,y.storage=16):M.isMatrix3?(y.boundary=48,y.storage=48):M.isMatrix4?(y.boundary=64,y.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),y}function m(M){let y=M.target;y.removeEventListener("dispose",m);let S=a.indexOf(y.__bindingPointIndex);a.splice(S,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function p(){for(let M in i)s.deleteBuffer(i[M]);a=[],i={},r={}}return{bind:l,update:c,dispose:p}}var Io=class{constructor(e={}){let{canvas:t=Dm(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;let f=new Uint32Array(4),g=new Int32Array(4),_=null,m=null,p=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Mt,this.toneMapping=Vi,this.toneMappingExposure=1;let y=this,S=!1,F=0,R=0,P=null,L=-1,b=null,v=new Et,U=new Et,G=null,z=new Ne(0),B=0,ee=t.width,W=t.height,ie=1,j=null,be=null,xe=new Et(0,0,ee,W),Ce=new Et(0,0,ee,W),Ge=!1,$e=new ea,ne=!1,he=!1,Pe=new je,Me=new A,it=new Et,at={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ht=!1;function It(){return P===null?ie:1}let N=n;function st(E,k){return t.getContext(E,k)}try{let E={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r166"),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",re,!1),t.addEventListener("webglcontextcreationerror",ue,!1),N===null){let k="webgl2";if(N=st(k,E),N===null)throw st(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let St,mt,De,Lt,Qe,et,D,w,K,oe,le,ae,Be,ye,ve,qe,te,Ee,ot,Je,Ae,Ke,me,Ft;function O(){St=new q_(N),St.init(),Ke=new Sx(N,St),mt=new z_(N,St,e,Ke),De=new xx(N),Lt=new K_(N),Qe=new ox,et=new Mx(N,St,De,Qe,mt,Ke,Lt),D=new V_(y),w=new X_(y),K=new n0(N),me=new B_(N,K),oe=new Y_(N,K,Lt,me),le=new J_(N,oe,K,Lt),ot=new Z_(N,mt,et),qe=new H_(Qe),ae=new ax(y,D,w,St,mt,me,qe),Be=new Ax(y,Qe),ye=new cx,ve=new mx(St),Ee=new F_(y,D,w,De,le,d,l),te=new yx(y,le,mt),Ft=new Rx(N,Lt,mt,De),Je=new k_(N,St,Lt),Ae=new $_(N,St,Lt),Lt.programs=ae.programs,y.capabilities=mt,y.extensions=St,y.properties=Qe,y.renderLists=ye,y.shadowMap=te,y.state=De,y.info=Lt}O();let Z=new ih(y,N);this.xr=Z,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let E=St.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=St.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(E){E!==void 0&&(ie=E,this.setSize(ee,W,!1))},this.getSize=function(E){return E.set(ee,W)},this.setSize=function(E,k,q=!0){if(Z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}ee=E,W=k,t.width=Math.floor(E*ie),t.height=Math.floor(k*ie),q===!0&&(t.style.width=E+"px",t.style.height=k+"px"),this.setViewport(0,0,E,k)},this.getDrawingBufferSize=function(E){return E.set(ee*ie,W*ie).floor()},this.setDrawingBufferSize=function(E,k,q){ee=E,W=k,ie=q,t.width=Math.floor(E*q),t.height=Math.floor(k*q),this.setViewport(0,0,E,k)},this.getCurrentViewport=function(E){return E.copy(v)},this.getViewport=function(E){return E.copy(xe)},this.setViewport=function(E,k,q,$){E.isVector4?xe.set(E.x,E.y,E.z,E.w):xe.set(E,k,q,$),De.viewport(v.copy(xe).multiplyScalar(ie).round())},this.getScissor=function(E){return E.copy(Ce)},this.setScissor=function(E,k,q,$){E.isVector4?Ce.set(E.x,E.y,E.z,E.w):Ce.set(E,k,q,$),De.scissor(U.copy(Ce).multiplyScalar(ie).round())},this.getScissorTest=function(){return Ge},this.setScissorTest=function(E){De.setScissorTest(Ge=E)},this.setOpaqueSort=function(E){j=E},this.setTransparentSort=function(E){be=E},this.getClearColor=function(E){return E.copy(Ee.getClearColor())},this.setClearColor=function(){Ee.setClearColor.apply(Ee,arguments)},this.getClearAlpha=function(){return Ee.getClearAlpha()},this.setClearAlpha=function(){Ee.setClearAlpha.apply(Ee,arguments)},this.clear=function(E=!0,k=!0,q=!0){let $=0;if(E){let X=!1;if(P!==null){let de=P.texture.format;X=de===Fh||de===Oh||de===Nh}if(X){let de=P.texture.type,we=de===Ti||de===gs||de===Jr||de===dr||de===Lh||de===Dh,Re=Ee.getClearColor(),ge=Ee.getClearAlpha(),Ye=Re.r,Xe=Re.g,ke=Re.b;we?(f[0]=Ye,f[1]=Xe,f[2]=ke,f[3]=ge,N.clearBufferuiv(N.COLOR,0,f)):(g[0]=Ye,g[1]=Xe,g[2]=ke,g[3]=ge,N.clearBufferiv(N.COLOR,0,g))}else $|=N.COLOR_BUFFER_BIT}k&&($|=N.DEPTH_BUFFER_BIT),q&&($|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",re,!1),t.removeEventListener("webglcontextcreationerror",ue,!1),ye.dispose(),ve.dispose(),Qe.dispose(),D.dispose(),w.dispose(),le.dispose(),me.dispose(),Ft.dispose(),ae.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",Dn),Z.removeEventListener("sessionend",pi),Ii.stop()};function J(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function re(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;let E=Lt.autoReset,k=te.enabled,q=te.autoUpdate,$=te.needsUpdate,X=te.type;O(),Lt.autoReset=E,te.enabled=k,te.autoUpdate=q,te.needsUpdate=$,te.type=X}function ue(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function We(E){let k=E.target;k.removeEventListener("dispose",We),Ze(k)}function Ze(E){qt(E),Qe.remove(E)}function qt(E){let k=Qe.get(E).programs;k!==void 0&&(k.forEach(function(q){ae.releaseProgram(q)}),E.isShaderMaterial&&ae.releaseShaderCache(E))}this.renderBufferDirect=function(E,k,q,$,X,de){k===null&&(k=at);let we=X.isMesh&&X.matrixWorld.determinant()<0,Re=Sl(E,k,q,$,X);De.setMaterial($,we);let ge=q.index,Ye=1;if($.wireframe===!0){if(ge=oe.getWireframeAttribute(q),ge===void 0)return;Ye=2}let Xe=q.drawRange,ke=q.attributes.position,ut=Xe.start*Ye,Ut=(Xe.start+Xe.count)*Ye;de!==null&&(ut=Math.max(ut,de.start*Ye),Ut=Math.min(Ut,(de.start+de.count)*Ye)),ge!==null?(ut=Math.max(ut,0),Ut=Math.min(Ut,ge.count)):ke!=null&&(ut=Math.max(ut,0),Ut=Math.min(Ut,ke.count));let Nt=Ut-ut;if(Nt<0||Nt===1/0)return;me.setup(X,$,Re,q,ge);let pn,xt=Je;if(ge!==null&&(pn=K.get(ge),xt=Ae,xt.setIndex(pn)),X.isMesh)$.wireframe===!0?(De.setLineWidth($.wireframeLinewidth*It()),xt.setMode(N.LINES)):xt.setMode(N.TRIANGLES);else if(X.isLine){let Ue=$.linewidth;Ue===void 0&&(Ue=1),De.setLineWidth(Ue*It()),X.isLineSegments?xt.setMode(N.LINES):X.isLineLoop?xt.setMode(N.LINE_LOOP):xt.setMode(N.LINE_STRIP)}else X.isPoints?xt.setMode(N.POINTS):X.isSprite&&xt.setMode(N.TRIANGLES);if(X.isBatchedMesh)if(X._multiDrawInstances!==null)xt.renderMultiDrawInstances(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount,X._multiDrawInstances);else if(St.get("WEBGL_multi_draw"))xt.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{let Ue=X._multiDrawStarts,nn=X._multiDrawCounts,vt=X._multiDrawCount,mn=ge?K.get(ge).bytesPerElement:1,mi=Qe.get($).currentProgram.getUniforms();for(let gn=0;gn<vt;gn++)mi.setValue(N,"_gl_DrawID",gn),xt.render(Ue[gn]/mn,nn[gn])}else if(X.isInstancedMesh)xt.renderInstances(ut,Nt,X.count);else if(q.isInstancedBufferGeometry){let Ue=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,nn=Math.min(q.instanceCount,Ue);xt.renderInstances(ut,Nt,nn)}else xt.render(ut,Nt)};function Dt(E,k,q){E.transparent===!0&&E.side===$t&&E.forceSinglePass===!1?(E.side=Cn,E.needsUpdate=!0,is(E,k,q),E.side=Gn,E.needsUpdate=!0,is(E,k,q),E.side=$t):is(E,k,q)}this.compile=function(E,k,q=null){q===null&&(q=E),m=ve.get(q),m.init(k),M.push(m),q.traverseVisible(function(X){X.isLight&&X.layers.test(k.layers)&&(m.pushLight(X),X.castShadow&&m.pushShadow(X))}),E!==q&&E.traverseVisible(function(X){X.isLight&&X.layers.test(k.layers)&&(m.pushLight(X),X.castShadow&&m.pushShadow(X))}),m.setupLights();let $=new Set;return E.traverse(function(X){let de=X.material;if(de)if(Array.isArray(de))for(let we=0;we<de.length;we++){let Re=de[we];Dt(Re,q,X),$.add(Re)}else Dt(de,q,X),$.add(de)}),M.pop(),m=null,$},this.compileAsync=function(E,k,q=null){let $=this.compile(E,k,q);return new Promise(X=>{function de(){if($.forEach(function(we){Qe.get(we).currentProgram.isReady()&&$.delete(we)}),$.size===0){X(E);return}setTimeout(de,10)}St.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let yt=null;function Ln(E){yt&&yt(E)}function Dn(){Ii.stop()}function pi(){Ii.start()}let Ii=new Ff;Ii.setAnimationLoop(Ln),typeof self<"u"&&Ii.setContext(self),this.setAnimationLoop=function(E){yt=E,Z.setAnimationLoop(E),E===null?Ii.stop():Ii.start()},Z.addEventListener("sessionstart",Dn),Z.addEventListener("sessionend",pi),this.render=function(E,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(k),k=Z.getCamera()),E.isScene===!0&&E.onBeforeRender(y,E,k,P),m=ve.get(E,M.length),m.init(k),M.push(m),Pe.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),$e.setFromProjectionMatrix(Pe),he=this.localClippingEnabled,ne=qe.init(this.clippingPlanes,he),_=ye.get(E,p.length),_.init(),p.push(_),Z.enabled===!0&&Z.isPresenting===!0){let de=y.xr.getDepthSensingMesh();de!==null&&rt(de,k,-1/0,y.sortObjects)}rt(E,k,0,y.sortObjects),_.finish(),y.sortObjects===!0&&_.sort(j,be),ht=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,ht&&Ee.addToRenderList(_,E),this.info.render.frame++,ne===!0&&qe.beginShadows();let q=m.state.shadowsArray;te.render(q,E,k),ne===!0&&qe.endShadows(),this.info.autoReset===!0&&this.info.reset();let $=_.opaque,X=_.transmissive;if(m.setupLights(),k.isArrayCamera){let de=k.cameras;if(X.length>0)for(let we=0,Re=de.length;we<Re;we++){let ge=de[we];Ma($,X,E,ge)}ht&&Ee.render(E);for(let we=0,Re=de.length;we<Re;we++){let ge=de[we];oi(_,E,ge,ge.viewport)}}else X.length>0&&Ma($,X,E,k),ht&&Ee.render(E),oi(_,E,k);P!==null&&(et.updateMultisampleRenderTarget(P),et.updateRenderTargetMipmap(P)),E.isScene===!0&&E.onAfterRender(y,E,k),me.resetDefaultState(),L=-1,b=null,M.pop(),M.length>0?(m=M[M.length-1],ne===!0&&qe.setGlobalState(y.clippingPlanes,m.state.camera)):m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function rt(E,k,q,$){if(E.visible===!1)return;if(E.layers.test(k.layers)){if(E.isGroup)q=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(k);else if(E.isLight)m.pushLight(E),E.castShadow&&m.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||$e.intersectsSprite(E)){$&&it.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Pe);let we=le.update(E),Re=E.material;Re.visible&&_.push(E,we,Re,q,it.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||$e.intersectsObject(E))){let we=le.update(E),Re=E.material;if($&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),it.copy(E.boundingSphere.center)):(we.boundingSphere===null&&we.computeBoundingSphere(),it.copy(we.boundingSphere.center)),it.applyMatrix4(E.matrixWorld).applyMatrix4(Pe)),Array.isArray(Re)){let ge=we.groups;for(let Ye=0,Xe=ge.length;Ye<Xe;Ye++){let ke=ge[Ye],ut=Re[ke.materialIndex];ut&&ut.visible&&_.push(E,we,ut,q,it.z,ke)}}else Re.visible&&_.push(E,we,Re,q,it.z,null)}}let de=E.children;for(let we=0,Re=de.length;we<Re;we++)rt(de[we],k,q,$)}function oi(E,k,q,$){let X=E.opaque,de=E.transmissive,we=E.transparent;m.setupLightsView(q),ne===!0&&qe.setGlobalState(y.clippingPlanes,q),$&&De.viewport(v.copy($)),X.length>0&&ns(X,k,q),de.length>0&&ns(de,k,q),we.length>0&&ns(we,k,q),De.buffers.depth.setTest(!0),De.buffers.depth.setMask(!0),De.buffers.color.setMask(!0),De.setPolygonOffset(!1)}function Ma(E,k,q,$){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[$.id]===void 0&&(m.state.transmissionRenderTarget[$.id]=new An(1,1,{generateMipmaps:!0,type:St.has("EXT_color_buffer_half_float")||St.has("EXT_color_buffer_float")?Mn:Ti,minFilter:ri,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:_t.workingColorSpace}));let de=m.state.transmissionRenderTarget[$.id],we=$.viewport||v;de.setSize(we.z,we.w);let Re=y.getRenderTarget();y.setRenderTarget(de),y.getClearColor(z),B=y.getClearAlpha(),B<1&&y.setClearColor(16777215,.5),ht?Ee.render(q):y.clear();let ge=y.toneMapping;y.toneMapping=Vi;let Ye=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),m.setupLightsView($),ne===!0&&qe.setGlobalState(y.clippingPlanes,$),ns(E,q,$),et.updateMultisampleRenderTarget(de),et.updateRenderTargetMipmap(de),St.has("WEBGL_multisampled_render_to_texture")===!1){let Xe=!1;for(let ke=0,ut=k.length;ke<ut;ke++){let Ut=k[ke],Nt=Ut.object,pn=Ut.geometry,xt=Ut.material,Ue=Ut.group;if(xt.side===$t&&Nt.layers.test($.layers)){let nn=xt.side;xt.side=Cn,xt.needsUpdate=!0,Rr(Nt,q,$,pn,xt,Ue),xt.side=nn,xt.needsUpdate=!0,Xe=!0}}Xe===!0&&(et.updateMultisampleRenderTarget(de),et.updateRenderTargetMipmap(de))}y.setRenderTarget(Re),y.setClearColor(z,B),Ye!==void 0&&($.viewport=Ye),y.toneMapping=ge}function ns(E,k,q){let $=k.isScene===!0?k.overrideMaterial:null;for(let X=0,de=E.length;X<de;X++){let we=E[X],Re=we.object,ge=we.geometry,Ye=$===null?we.material:$,Xe=we.group;Re.layers.test(q.layers)&&Rr(Re,k,q,ge,Ye,Xe)}}function Rr(E,k,q,$,X,de){E.onBeforeRender(y,k,q,$,X,de),E.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),X.transparent===!0&&X.side===$t&&X.forceSinglePass===!1?(X.side=Cn,X.needsUpdate=!0,y.renderBufferDirect(q,k,$,X,E,de),X.side=Gn,X.needsUpdate=!0,y.renderBufferDirect(q,k,$,X,E,de),X.side=$t):y.renderBufferDirect(q,k,$,X,E,de),E.onAfterRender(y,k,q,$,X,de)}function is(E,k,q){k.isScene!==!0&&(k=at);let $=Qe.get(E),X=m.state.lights,de=m.state.shadowsArray,we=X.state.version,Re=ae.getParameters(E,X.state,de,k,q),ge=ae.getProgramCacheKey(Re),Ye=$.programs;$.environment=E.isMeshStandardMaterial?k.environment:null,$.fog=k.fog,$.envMap=(E.isMeshStandardMaterial?w:D).get(E.envMap||$.environment),$.envMapRotation=$.environment!==null&&E.envMap===null?k.environmentRotation:E.envMapRotation,Ye===void 0&&(E.addEventListener("dispose",We),Ye=new Map,$.programs=Ye);let Xe=Ye.get(ge);if(Xe!==void 0){if($.currentProgram===Xe&&$.lightsStateVersion===we)return ba(E,Re),Xe}else Re.uniforms=ae.getUniforms(E),E.onBeforeCompile(Re,y),Xe=ae.acquireProgram(Re,ge),Ye.set(ge,Xe),$.uniforms=Re.uniforms;let ke=$.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(ke.clippingPlanes=qe.uniform),ba(E,Re),$.needsLights=wl(E),$.lightsStateVersion=we,$.needsLights&&(ke.ambientLightColor.value=X.state.ambient,ke.lightProbe.value=X.state.probe,ke.directionalLights.value=X.state.directional,ke.directionalLightShadows.value=X.state.directionalShadow,ke.spotLights.value=X.state.spot,ke.spotLightShadows.value=X.state.spotShadow,ke.rectAreaLights.value=X.state.rectArea,ke.ltc_1.value=X.state.rectAreaLTC1,ke.ltc_2.value=X.state.rectAreaLTC2,ke.pointLights.value=X.state.point,ke.pointLightShadows.value=X.state.pointShadow,ke.hemisphereLights.value=X.state.hemi,ke.directionalShadowMap.value=X.state.directionalShadowMap,ke.directionalShadowMatrix.value=X.state.directionalShadowMatrix,ke.spotShadowMap.value=X.state.spotShadowMap,ke.spotLightMatrix.value=X.state.spotLightMatrix,ke.spotLightMap.value=X.state.spotLightMap,ke.pointShadowMap.value=X.state.pointShadowMap,ke.pointShadowMatrix.value=X.state.pointShadowMatrix),$.currentProgram=Xe,$.uniformsList=null,Xe}function Sa(E){if(E.uniformsList===null){let k=E.currentProgram.getUniforms();E.uniformsList=cr.seqWithValue(k.seq,E.uniforms)}return E.uniformsList}function ba(E,k){let q=Qe.get(E);q.outputColorSpace=k.outputColorSpace,q.batching=k.batching,q.batchingColor=k.batchingColor,q.instancing=k.instancing,q.instancingColor=k.instancingColor,q.instancingMorph=k.instancingMorph,q.skinning=k.skinning,q.morphTargets=k.morphTargets,q.morphNormals=k.morphNormals,q.morphColors=k.morphColors,q.morphTargetsCount=k.morphTargetsCount,q.numClippingPlanes=k.numClippingPlanes,q.numIntersection=k.numClipIntersection,q.vertexAlphas=k.vertexAlphas,q.vertexTangents=k.vertexTangents,q.toneMapping=k.toneMapping}function Sl(E,k,q,$,X){k.isScene!==!0&&(k=at),et.resetTextureUnits();let de=k.fog,we=$.isMeshStandardMaterial?k.environment:null,Re=P===null?y.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:en,ge=($.isMeshStandardMaterial?w:D).get($.envMap||we),Ye=$.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Xe=!!q.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),ke=!!q.morphAttributes.position,ut=!!q.morphAttributes.normal,Ut=!!q.morphAttributes.color,Nt=Vi;$.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(Nt=y.toneMapping);let pn=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,xt=pn!==void 0?pn.length:0,Ue=Qe.get($),nn=m.state.lights;if(ne===!0&&(he===!0||E!==b)){let Sn=E===b&&$.id===L;qe.setState($,E,Sn)}let vt=!1;$.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==nn.state.version||Ue.outputColorSpace!==Re||X.isBatchedMesh&&Ue.batching===!1||!X.isBatchedMesh&&Ue.batching===!0||X.isBatchedMesh&&Ue.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&Ue.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&Ue.instancing===!1||!X.isInstancedMesh&&Ue.instancing===!0||X.isSkinnedMesh&&Ue.skinning===!1||!X.isSkinnedMesh&&Ue.skinning===!0||X.isInstancedMesh&&Ue.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Ue.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Ue.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Ue.instancingMorph===!1&&X.morphTexture!==null||Ue.envMap!==ge||$.fog===!0&&Ue.fog!==de||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==qe.numPlanes||Ue.numIntersection!==qe.numIntersection)||Ue.vertexAlphas!==Ye||Ue.vertexTangents!==Xe||Ue.morphTargets!==ke||Ue.morphNormals!==ut||Ue.morphColors!==Ut||Ue.toneMapping!==Nt||Ue.morphTargetsCount!==xt)&&(vt=!0):(vt=!0,Ue.__version=$.version);let mn=Ue.currentProgram;vt===!0&&(mn=is($,k,X));let mi=!1,gn=!1,Rs=!1,zt=mn.getUniforms(),Qn=Ue.uniforms;if(De.useProgram(mn.program)&&(mi=!0,gn=!0,Rs=!0),$.id!==L&&(L=$.id,gn=!0),mi||b!==E){zt.setValue(N,"projectionMatrix",E.projectionMatrix),zt.setValue(N,"viewMatrix",E.matrixWorldInverse);let Sn=zt.map.cameraPosition;Sn!==void 0&&Sn.setValue(N,Me.setFromMatrixPosition(E.matrixWorld)),mt.logarithmicDepthBuffer&&zt.setValue(N,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&zt.setValue(N,"isOrthographic",E.isOrthographicCamera===!0),b!==E&&(b=E,gn=!0,Rs=!0)}if(X.isSkinnedMesh){zt.setOptional(N,X,"bindMatrix"),zt.setOptional(N,X,"bindMatrixInverse");let Sn=X.skeleton;Sn&&(Sn.boneTexture===null&&Sn.computeBoneTexture(),zt.setValue(N,"boneTexture",Sn.boneTexture,et))}X.isBatchedMesh&&(zt.setOptional(N,X,"batchingTexture"),zt.setValue(N,"batchingTexture",X._matricesTexture,et),zt.setOptional(N,X,"batchingIdTexture"),zt.setValue(N,"batchingIdTexture",X._indirectTexture,et),zt.setOptional(N,X,"batchingColorTexture"),X._colorsTexture!==null&&zt.setValue(N,"batchingColorTexture",X._colorsTexture,et));let Cs=q.morphAttributes;if((Cs.position!==void 0||Cs.normal!==void 0||Cs.color!==void 0)&&ot.update(X,q,mn),(gn||Ue.receiveShadow!==X.receiveShadow)&&(Ue.receiveShadow=X.receiveShadow,zt.setValue(N,"receiveShadow",X.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(Qn.envMap.value=ge,Qn.flipEnvMap.value=ge.isCubeTexture&&ge.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&k.environment!==null&&(Qn.envMapIntensity.value=k.environmentIntensity),gn&&(zt.setValue(N,"toneMappingExposure",y.toneMappingExposure),Ue.needsLights&&bl(Qn,Rs),de&&$.fog===!0&&Be.refreshFogUniforms(Qn,de),Be.refreshMaterialUniforms(Qn,$,ie,W,m.state.transmissionRenderTarget[E.id]),cr.upload(N,Sa(Ue),Qn,et)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(cr.upload(N,Sa(Ue),Qn,et),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&zt.setValue(N,"center",X.center),zt.setValue(N,"modelViewMatrix",X.modelViewMatrix),zt.setValue(N,"normalMatrix",X.normalMatrix),zt.setValue(N,"modelMatrix",X.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){let Sn=$.uniformsGroups;for(let Ps=0,ss=Sn.length;Ps<ss;Ps++){let Cr=Sn[Ps];Ft.update(Cr,mn),Ft.bind(Cr,mn)}}return mn}function bl(E,k){E.ambientLightColor.needsUpdate=k,E.lightProbe.needsUpdate=k,E.directionalLights.needsUpdate=k,E.directionalLightShadows.needsUpdate=k,E.pointLights.needsUpdate=k,E.pointLightShadows.needsUpdate=k,E.spotLights.needsUpdate=k,E.spotLightShadows.needsUpdate=k,E.rectAreaLights.needsUpdate=k,E.hemisphereLights.needsUpdate=k}function wl(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(E,k,q){Qe.get(E.texture).__webglTexture=k,Qe.get(E.depthTexture).__webglTexture=q;let $=Qe.get(E);$.__hasExternalTextures=!0,$.__autoAllocateDepthBuffer=q===void 0,$.__autoAllocateDepthBuffer||St.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,k){let q=Qe.get(E);q.__webglFramebuffer=k,q.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(E,k=0,q=0){P=E,F=k,R=q;let $=!0,X=null,de=!1,we=!1;if(E){let ge=Qe.get(E);ge.__useDefaultFramebuffer!==void 0?(De.bindFramebuffer(N.FRAMEBUFFER,null),$=!1):ge.__webglFramebuffer===void 0?et.setupRenderTarget(E):ge.__hasExternalTextures&&et.rebindTextures(E,Qe.get(E.texture).__webglTexture,Qe.get(E.depthTexture).__webglTexture);let Ye=E.texture;(Ye.isData3DTexture||Ye.isDataArrayTexture||Ye.isCompressedArrayTexture)&&(we=!0);let Xe=Qe.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Xe[k])?X=Xe[k][q]:X=Xe[k],de=!0):E.samples>0&&et.useMultisampledRTT(E)===!1?X=Qe.get(E).__webglMultisampledFramebuffer:Array.isArray(Xe)?X=Xe[q]:X=Xe,v.copy(E.viewport),U.copy(E.scissor),G=E.scissorTest}else v.copy(xe).multiplyScalar(ie).floor(),U.copy(Ce).multiplyScalar(ie).floor(),G=Ge;if(De.bindFramebuffer(N.FRAMEBUFFER,X)&&$&&De.drawBuffers(E,X),De.viewport(v),De.scissor(U),De.setScissorTest(G),de){let ge=Qe.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+k,ge.__webglTexture,q)}else if(we){let ge=Qe.get(E.texture),Ye=k||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,ge.__webglTexture,q||0,Ye)}L=-1},this.readRenderTargetPixels=function(E,k,q,$,X,de,we){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=Qe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&we!==void 0&&(Re=Re[we]),Re){De.bindFramebuffer(N.FRAMEBUFFER,Re);try{let ge=E.texture,Ye=ge.format,Xe=ge.type;if(!mt.textureFormatReadable(Ye)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!mt.textureTypeReadable(Xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=E.width-$&&q>=0&&q<=E.height-X&&N.readPixels(k,q,$,X,Ke.convert(Ye),Ke.convert(Xe),de)}finally{let ge=P!==null?Qe.get(P).__webglFramebuffer:null;De.bindFramebuffer(N.FRAMEBUFFER,ge)}}},this.readRenderTargetPixelsAsync=async function(E,k,q,$,X,de,we){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=Qe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&we!==void 0&&(Re=Re[we]),Re){De.bindFramebuffer(N.FRAMEBUFFER,Re);try{let ge=E.texture,Ye=ge.format,Xe=ge.type;if(!mt.textureFormatReadable(Ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!mt.textureTypeReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=E.width-$&&q>=0&&q<=E.height-X){let ke=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,ke),N.bufferData(N.PIXEL_PACK_BUFFER,de.byteLength,N.STREAM_READ),N.readPixels(k,q,$,X,Ke.convert(Ye),Ke.convert(Xe),0),N.flush();let ut=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);await Um(N,ut,4);try{N.bindBuffer(N.PIXEL_PACK_BUFFER,ke),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,de)}finally{N.deleteBuffer(ke),N.deleteSync(ut)}return de}}finally{let ge=P!==null?Qe.get(P).__webglFramebuffer:null;De.bindFramebuffer(N.FRAMEBUFFER,ge)}}},this.copyFramebufferToTexture=function(E,k=null,q=0){E.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,E=arguments[1]);let $=Math.pow(2,-q),X=Math.floor(E.image.width*$),de=Math.floor(E.image.height*$),we=k!==null?k.x:0,Re=k!==null?k.y:0;et.setTexture2D(E,0),N.copyTexSubImage2D(N.TEXTURE_2D,q,0,0,we,Re,X,de),De.unbindTexture()},this.copyTextureToTexture=function(E,k,q=null,$=null,X=0){E.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),$=arguments[0]||null,E=arguments[1],k=arguments[2],X=arguments[3]||0,q=null);let de,we,Re,ge,Ye,Xe;q!==null?(de=q.max.x-q.min.x,we=q.max.y-q.min.y,Re=q.min.x,ge=q.min.y):(de=E.image.width,we=E.image.height,Re=0,ge=0),$!==null?(Ye=$.x,Xe=$.y):(Ye=0,Xe=0);let ke=Ke.convert(k.format),ut=Ke.convert(k.type);et.setTexture2D(k,0),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,k.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,k.unpackAlignment);let Ut=N.getParameter(N.UNPACK_ROW_LENGTH),Nt=N.getParameter(N.UNPACK_IMAGE_HEIGHT),pn=N.getParameter(N.UNPACK_SKIP_PIXELS),xt=N.getParameter(N.UNPACK_SKIP_ROWS),Ue=N.getParameter(N.UNPACK_SKIP_IMAGES),nn=E.isCompressedTexture?E.mipmaps[X]:E.image;N.pixelStorei(N.UNPACK_ROW_LENGTH,nn.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,nn.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Re),N.pixelStorei(N.UNPACK_SKIP_ROWS,ge),E.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,X,Ye,Xe,de,we,ke,ut,nn.data):E.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,X,Ye,Xe,nn.width,nn.height,ke,nn.data):N.texSubImage2D(N.TEXTURE_2D,X,Ye,Xe,de,we,ke,ut,nn),N.pixelStorei(N.UNPACK_ROW_LENGTH,Ut),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Nt),N.pixelStorei(N.UNPACK_SKIP_PIXELS,pn),N.pixelStorei(N.UNPACK_SKIP_ROWS,xt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ue),X===0&&k.generateMipmaps&&N.generateMipmap(N.TEXTURE_2D),De.unbindTexture()},this.copyTextureToTexture3D=function(E,k,q=null,$=null,X=0){E.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),q=arguments[0]||null,$=arguments[1]||null,E=arguments[2],k=arguments[3],X=arguments[4]||0);let de,we,Re,ge,Ye,Xe,ke,ut,Ut,Nt=E.isCompressedTexture?E.mipmaps[X]:E.image;q!==null?(de=q.max.x-q.min.x,we=q.max.y-q.min.y,Re=q.max.z-q.min.z,ge=q.min.x,Ye=q.min.y,Xe=q.min.z):(de=Nt.width,we=Nt.height,Re=Nt.depth,ge=0,Ye=0,Xe=0),$!==null?(ke=$.x,ut=$.y,Ut=$.z):(ke=0,ut=0,Ut=0);let pn=Ke.convert(k.format),xt=Ke.convert(k.type),Ue;if(k.isData3DTexture)et.setTexture3D(k,0),Ue=N.TEXTURE_3D;else if(k.isDataArrayTexture||k.isCompressedArrayTexture)et.setTexture2DArray(k,0),Ue=N.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,k.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,k.unpackAlignment);let nn=N.getParameter(N.UNPACK_ROW_LENGTH),vt=N.getParameter(N.UNPACK_IMAGE_HEIGHT),mn=N.getParameter(N.UNPACK_SKIP_PIXELS),mi=N.getParameter(N.UNPACK_SKIP_ROWS),gn=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,Nt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Nt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,ge),N.pixelStorei(N.UNPACK_SKIP_ROWS,Ye),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Xe),E.isDataTexture||E.isData3DTexture?N.texSubImage3D(Ue,X,ke,ut,Ut,de,we,Re,pn,xt,Nt.data):k.isCompressedArrayTexture?N.compressedTexSubImage3D(Ue,X,ke,ut,Ut,de,we,Re,pn,Nt.data):N.texSubImage3D(Ue,X,ke,ut,Ut,de,we,Re,pn,xt,Nt),N.pixelStorei(N.UNPACK_ROW_LENGTH,nn),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,vt),N.pixelStorei(N.UNPACK_SKIP_PIXELS,mn),N.pixelStorei(N.UNPACK_SKIP_ROWS,mi),N.pixelStorei(N.UNPACK_SKIP_IMAGES,gn),X===0&&k.generateMipmaps&&N.generateMipmap(Ue),De.unbindTexture()},this.initRenderTarget=function(E){Qe.get(E).__webglFramebuffer===void 0&&et.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?et.setTextureCube(E,0):E.isData3DTexture?et.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?et.setTexture2DArray(E,0):et.setTexture2D(E,0),De.unbindTexture()},this.resetState=function(){F=0,R=0,P=null,De.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ei}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===Bh?"display-p3":"srgb",t.unpackColorSpace=_t.workingColorSpace===ol?"display-p3":"srgb"}},Lo=class s{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ne(e),this.density=t}clone(){return new s(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Do=class extends kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qn,this.environmentIntensity=1,this.environmentRotation=new qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},xr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Hc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Vn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return zh("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},wn=new A,ys=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.applyMatrix4(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.applyNormalMatrix(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.transformDirection(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=si(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=bt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=si(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=si(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=si(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=si(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),i=bt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),i=bt(i,this.array),r=bt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new rn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},vr=class extends In{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Js,Nr=new A,Qs=new A,js=new A,er=new ce,Or=new ce,Vf=new je,Za=new A,Fr=new A,Ja=new A,Gd=new ce,nc=new ce,Wd=new ce,ta=class extends kt{constructor(e=new vr){if(super(),this.isSprite=!0,this.type="Sprite",Js===void 0){Js=new Ot;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new xr(t,5);Js.setIndex([0,1,2,0,2,3]),Js.setAttribute("position",new ys(n,3,0,!1)),Js.setAttribute("uv",new ys(n,2,3,!1))}this.geometry=Js,this.material=e,this.center=new ce(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Qs.setFromMatrixScale(this.matrixWorld),Vf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),js.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Qs.multiplyScalar(-js.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let a=this.center;Qa(Za.set(-.5,-.5,0),js,a,Qs,i,r),Qa(Fr.set(.5,-.5,0),js,a,Qs,i,r),Qa(Ja.set(.5,.5,0),js,a,Qs,i,r),Gd.set(0,0),nc.set(1,0),Wd.set(1,1);let o=e.ray.intersectTriangle(Za,Fr,Ja,!1,Nr);if(o===null&&(Qa(Fr.set(-.5,.5,0),js,a,Qs,i,r),nc.set(0,1),o=e.ray.intersectTriangle(Za,Ja,Fr,!1,Nr),o===null))return;let l=e.ray.origin.distanceTo(Nr);l<e.near||l>e.far||t.push({distance:l,point:Nr.clone(),uv:zi.getInterpolation(Nr,Za,Fr,Ja,Gd,nc,Wd,new ce),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Qa(s,e,t,n,i,r){er.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(Or.x=r*er.x-i*er.y,Or.y=i*er.x+r*er.y):Or.copy(er),s.copy(e),s.x+=Or.x,s.y+=Or.y,s.applyMatrix4(Vf)}var Xd=new A,qd=new Et,Yd=new Et,Cx=new A,$d=new je,ja=new A,ic=new Fn,Kd=new je,sc=new _s,Uo=class extends Xt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=$u,this.bindMatrix=new je,this.bindMatrixInverse=new je,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Xn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ja),this.boundingBox.expandByPoint(ja)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Fn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ja),this.boundingSphere.expandByPoint(ja)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ic.copy(this.boundingSphere),ic.applyMatrix4(i),e.ray.intersectsSphere(ic)!==!1&&(Kd.copy(i).invert(),sc.copy(e.ray).applyMatrix4(Kd),!(this.boundingBox!==null&&sc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,sc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Et,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===$u?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===rm?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;qd.fromBufferAttribute(i.attributes.skinIndex,e),Yd.fromBufferAttribute(i.attributes.skinWeight,e),Xd.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let a=Yd.getComponent(r);if(a!==0){let o=qd.getComponent(r);$d.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Cx.copy(Xd).applyMatrix4($d),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},na=class extends kt{constructor(){super(),this.isBone=!0,this.type="Bone"}},ia=class extends un{constructor(e=null,t=1,n=1,i,r,a,o,l,c=vn,h=vn,u,d){super(null,a,o,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Zd=new je,Px=new je,No=class s{constructor(e=[],t=[]){this.uuid=Vn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new je)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new je;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:Px;Zd.multiplyMatrices(o,t[r]),Zd.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new ia(t,e,e,Hn,Tn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new na),this.bones.push(a),this.boneInverses.push(new je().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},xs=class extends rn{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},tr=new je,Jd=new je,eo=[],Qd=new Xn,Ix=new je,Br=new Xt,kr=new Fn,vs=class extends Xt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new xs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Ix)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Xn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,tr),Qd.copy(e.boundingBox).applyMatrix4(tr),this.boundingBox.union(Qd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Fn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,tr),kr.copy(e.boundingSphere).applyMatrix4(tr),this.boundingSphere.union(kr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Br.geometry=this.geometry,Br.material=this.material,Br.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),kr.copy(this.boundingSphere),kr.applyMatrix4(n),e.ray.intersectsSphere(kr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,tr),Jd.multiplyMatrices(n,tr),Br.matrixWorld=Jd,Br.raycast(e,eo);for(let a=0,o=eo.length;a<o;a++){let l=eo[a];l.instanceId=r,l.object=this,t.push(l)}eo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new xs(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new ia(new Float32Array(i*this.count),i,this.count,Uh,Tn));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var Xi=class extends In{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ne(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Oo=new A,Fo=new A,jd=new je,zr=new _s,to=new Fn,rc=new A,ef=new A,qi=class extends kt{constructor(e=new Ot,t=new Xi){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Oo.fromBufferAttribute(t,i-1),Fo.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Oo.distanceTo(Fo);e.setAttribute("lineDistance",new ft(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),to.copy(n.boundingSphere),to.applyMatrix4(i),to.radius+=r,e.ray.intersectsSphere(to)===!1)return;jd.copy(i).invert(),zr.copy(e.ray).applyMatrix4(jd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=c){let p=h.getX(_),M=h.getX(_+1),y=no(this,e,zr,l,p,M);y&&t.push(y)}if(this.isLineLoop){let _=h.getX(g-1),m=h.getX(f),p=no(this,e,zr,l,_,m);p&&t.push(p)}}else{let f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=c){let p=no(this,e,zr,l,_,_+1);p&&t.push(p)}if(this.isLineLoop){let _=no(this,e,zr,l,g-1,f);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function no(s,e,t,n,i,r){let a=s.geometry.attributes.position;if(Oo.fromBufferAttribute(a,i),Fo.fromBufferAttribute(a,r),t.distanceSqToSegment(Oo,Fo,rc,ef)>n)return;rc.applyMatrix4(s.matrixWorld);let l=e.ray.origin.distanceTo(rc);if(!(l<e.near||l>e.far))return{distance:l,point:ef.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,object:s}}var tf=new A,nf=new A,Mr=class extends qi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)tf.fromBufferAttribute(t,i),nf.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+tf.distanceTo(nf);e.setAttribute("lineDistance",new ft(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Bo=class extends qi{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},sa=class extends In{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},sf=new je,sh=new _s,io=new Fn,so=new A,ko=class extends kt{constructor(e=new Ot,t=new sa){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),io.copy(n.boundingSphere),io.applyMatrix4(i),io.radius+=r,e.ray.intersectsSphere(io)===!1)return;sf.copy(i).invert(),sh.copy(e.ray).applyMatrix4(sf);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=d,_=f;g<_;g++){let m=c.getX(g);so.fromBufferAttribute(u,m),rf(so,m,l,i,e,t,this)}}else{let d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,_=f;g<_;g++)so.fromBufferAttribute(u,g),rf(so,g,l,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function rf(s,e,t,n,i,r,a){let o=sh.distanceSqToPoint(s);if(o<t){let l=new A;sh.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}var ra=class extends un{constructor(e,t,n,i,r,a,o,l,c){super(e,t,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Yn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),i=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);let h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let a=this.getPoint(i),o=this.getPoint(r),l=t||(a.isVector2?new ce:new A);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new A,i=[],r=[],a=[],o=new A,l=new je;for(let f=0;f<=e;f++){let g=f/e;i[f]=this.getTangentAt(g,new A)}r[0]=new A,a[0]=new A;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Jt(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(Jt(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},aa=class extends Yn{constructor(e=0,t=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ce){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},rh=class extends aa{constructor(e,t,n,i,r,a){super(e,t,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Vh(){let s=0,e=0,t=0,n=0;function i(r,a,o,l){s=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(r){let a=r*r,o=a*r;return s+e*r+t*a+n*o}}}var ro=new A,ac=new Vh,oc=new Vh,lc=new Vh,oa=class extends Yn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new A){let n=t,i=this.points,r=i.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(ro.subVectors(i[0],i[1]).add(i[0]),c=ro);let u=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(ro.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=ro),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),ac.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,_,m),oc.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,_,m),lc.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(ac.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),oc.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),lc.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(ac.calc(l),oc.calc(l),lc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new A().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function af(s,e,t,n,i){let r=(n-e)*.5,a=(i-t)*.5,o=s*s,l=s*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*s+t}function Lx(s,e){let t=1-s;return t*t*e}function Dx(s,e){return 2*(1-s)*s*e}function Ux(s,e){return s*s*e}function qr(s,e,t,n){return Lx(s,e)+Dx(s,t)+Ux(s,n)}function Nx(s,e){let t=1-s;return t*t*t*e}function Ox(s,e){let t=1-s;return 3*t*t*s*e}function Fx(s,e){return 3*(1-s)*s*s*e}function Bx(s,e){return s*s*s*e}function Yr(s,e,t,n,i){return Nx(s,e)+Ox(s,t)+Fx(s,n)+Bx(s,i)}var zo=class extends Yn{constructor(e=new ce,t=new ce,n=new ce,i=new ce){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ce){let n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Yr(e,i.x,r.x,a.x,o.x),Yr(e,i.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ah=class extends Yn{constructor(e=new A,t=new A,n=new A,i=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new A){let n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Yr(e,i.x,r.x,a.x,o.x),Yr(e,i.y,r.y,a.y,o.y),Yr(e,i.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ho=class extends Yn{constructor(e=new ce,t=new ce){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ce){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ce){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},oh=class extends Yn{constructor(e=new A,t=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new A){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new A){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Vo=class extends Yn{constructor(e=new ce,t=new ce,n=new ce){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ce){let n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(qr(e,i.x,r.x,a.x),qr(e,i.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},lh=class extends Yn{constructor(e=new A,t=new A,n=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new A){let n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(qr(e,i.x,r.x,a.x),qr(e,i.y,r.y,a.y),qr(e,i.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Go=class extends Yn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ce){let n=t,i=this.points,r=(i.length-1)*e,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(af(o,l.x,c.x,h.x,u.x),af(o,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new ce().fromArray(i))}return this}},of=Object.freeze({__proto__:null,ArcCurve:rh,CatmullRomCurve3:oa,CubicBezierCurve:zo,CubicBezierCurve3:ah,EllipseCurve:aa,LineCurve:Ho,LineCurve3:oh,QuadraticBezierCurve:Vo,QuadraticBezierCurve3:lh,SplineCurve:Go}),ch=class extends Yn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new of[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let a=r[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new of[i.type]().fromJSON(i))}return this}},Wo=class extends ch{constructor(e){super(),this.type="Path",this.currentPoint=new ce,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Ho(this.currentPoint.clone(),new ce(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let r=new Vo(this.currentPoint.clone(),new ce(e,t),new ce(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,a){let o=new zo(this.currentPoint.clone(),new ce(e,t),new ce(n,i),new ce(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Go(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,r,a),this}absarc(e,t,n,i,r,a){return this.absellipse(e,t,n,n,i,r,a),this}ellipse(e,t,n,i,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,a,o,l),this}absellipse(e,t,n,i,r,a,o,l){let c=new aa(e,t,n,i,r,a,o,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}};var Ms=class s extends Ot{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],a=[],o=[],l=[],c=new A,h=new ce;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=n+u/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ft(a,3)),this.setAttribute("normal",new ft(o,3)),this.setAttribute("uv",new ft(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},At=class s extends Ot{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],d=[],f=[],g=0,_=[],m=n/2,p=0;M(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new ft(u,3)),this.setAttribute("normal",new ft(d,3)),this.setAttribute("uv",new ft(f,2));function M(){let S=new A,F=new A,R=0,P=(t-e)/n;for(let L=0;L<=r;L++){let b=[],v=L/r,U=v*(t-e)+e;for(let G=0;G<=i;G++){let z=G/i,B=z*l+o,ee=Math.sin(B),W=Math.cos(B);F.x=U*ee,F.y=-v*n+m,F.z=U*W,u.push(F.x,F.y,F.z),S.set(ee,P,W).normalize(),d.push(S.x,S.y,S.z),f.push(z,1-v),b.push(g++)}_.push(b)}for(let L=0;L<i;L++)for(let b=0;b<r;b++){let v=_[b][L],U=_[b+1][L],G=_[b+1][L+1],z=_[b][L+1];h.push(v,U,z),h.push(U,G,z),R+=6}c.addGroup(p,R,0),p+=R}function y(S){let F=g,R=new ce,P=new A,L=0,b=S===!0?e:t,v=S===!0?1:-1;for(let G=1;G<=i;G++)u.push(0,m*v,0),d.push(0,v,0),f.push(.5,.5),g++;let U=g;for(let G=0;G<=i;G++){let B=G/i*l+o,ee=Math.cos(B),W=Math.sin(B);P.x=b*W,P.y=m*v,P.z=b*ee,u.push(P.x,P.y,P.z),d.push(0,v,0),R.x=ee*.5+.5,R.y=W*.5*v+.5,f.push(R.x,R.y),g++}for(let G=0;G<i;G++){let z=F+G,B=U+G;S===!0?h.push(B,B+1,z):h.push(B+1,B,z),L+=3}c.addGroup(p,L,S===!0?1:2),p+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var hh=class s extends Ot{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let r=[],a=[];o(i),c(n),h(),this.setAttribute("position",new ft(r,3)),this.setAttribute("normal",new ft(r.slice(),3)),this.setAttribute("uv",new ft(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(M){let y=new A,S=new A,F=new A;for(let R=0;R<t.length;R+=3)f(t[R+0],y),f(t[R+1],S),f(t[R+2],F),l(y,S,F,M)}function l(M,y,S,F){let R=F+1,P=[];for(let L=0;L<=R;L++){P[L]=[];let b=M.clone().lerp(S,L/R),v=y.clone().lerp(S,L/R),U=R-L;for(let G=0;G<=U;G++)G===0&&L===R?P[L][G]=b:P[L][G]=b.clone().lerp(v,G/U)}for(let L=0;L<R;L++)for(let b=0;b<2*(R-L)-1;b++){let v=Math.floor(b/2);b%2===0?(d(P[L][v+1]),d(P[L+1][v]),d(P[L][v])):(d(P[L][v+1]),d(P[L+1][v+1]),d(P[L+1][v]))}}function c(M){let y=new A;for(let S=0;S<r.length;S+=3)y.x=r[S+0],y.y=r[S+1],y.z=r[S+2],y.normalize().multiplyScalar(M),r[S+0]=y.x,r[S+1]=y.y,r[S+2]=y.z}function h(){let M=new A;for(let y=0;y<r.length;y+=3){M.x=r[y+0],M.y=r[y+1],M.z=r[y+2];let S=m(M)/2/Math.PI+.5,F=p(M)/Math.PI+.5;a.push(S,1-F)}g(),u()}function u(){for(let M=0;M<a.length;M+=6){let y=a[M+0],S=a[M+2],F=a[M+4],R=Math.max(y,S,F),P=Math.min(y,S,F);R>.9&&P<.1&&(y<.2&&(a[M+0]+=1),S<.2&&(a[M+2]+=1),F<.2&&(a[M+4]+=1))}}function d(M){r.push(M.x,M.y,M.z)}function f(M,y){let S=M*3;y.x=e[S+0],y.y=e[S+1],y.z=e[S+2]}function g(){let M=new A,y=new A,S=new A,F=new A,R=new ce,P=new ce,L=new ce;for(let b=0,v=0;b<r.length;b+=9,v+=6){M.set(r[b+0],r[b+1],r[b+2]),y.set(r[b+3],r[b+4],r[b+5]),S.set(r[b+6],r[b+7],r[b+8]),R.set(a[v+0],a[v+1]),P.set(a[v+2],a[v+3]),L.set(a[v+4],a[v+5]),F.copy(M).add(y).add(S).divideScalar(3);let U=m(F);_(R,v+0,M,U),_(P,v+2,y,U),_(L,v+4,S,U)}}function _(M,y,S,F){F<0&&M.x===1&&(a[y]=M.x-1),S.x===0&&S.z===0&&(a[y]=F/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.vertices,e.indices,e.radius,e.details)}};var ao=new A,oo=new A,cc=new A,lo=new zi,Xo=class extends Ot{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),r=Math.cos(or*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let g=0;g<l;g+=3){a?(c[0]=a.getX(g),c[1]=a.getX(g+1),c[2]=a.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:_,b:m,c:p}=lo;if(_.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),lo.getNormal(cc),u[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,u[1]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,u[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let M=0;M<3;M++){let y=(M+1)%3,S=u[M],F=u[y],R=lo[h[M]],P=lo[h[y]],L=`${S}_${F}`,b=`${F}_${S}`;b in d&&d[b]?(cc.dot(d[b].normal)<=r&&(f.push(R.x,R.y,R.z),f.push(P.x,P.y,P.z)),d[b]=null):L in d||(d[L]={index0:c[M],index1:c[y],normal:cc.clone()})}}for(let g in d)if(d[g]){let{index0:_,index1:m}=d[g];ao.fromBufferAttribute(o,_),oo.fromBufferAttribute(o,m),f.push(ao.x,ao.y,ao.z),f.push(oo.x,oo.y,oo.z)}this.setAttribute("position",new ft(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},la=class extends Wo{constructor(e){super(e),this.uuid=Vn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new Wo().fromJSON(i))}return this}},kx={triangulate:function(s,e,t=2){let n=e&&e.length,i=n?e[0]*t:s.length,r=Gf(s,0,i,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c,h,u,d,f;if(n&&(r=Wx(s,e,r,t)),s.length>80*t){o=c=s[0],l=h=s[1];for(let g=t;g<i;g+=t)u=s[g],d=s[g+1],u<o&&(o=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-o,h-l),f=f!==0?32767/f:0}return ca(r,a,t,o,l,f,0),a}};function Gf(s,e,t,n,i){let r,a;if(i===tv(s,e,t,n)>0)for(r=e;r<t;r+=n)a=lf(r,s[r],s[r+1],a);else for(r=t-n;r>=e;r-=n)a=lf(r,s[r],s[r+1],a);return a&&cl(a,a.next)&&(ua(a),a=a.next),a}function Ss(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(cl(t,t.next)||Vt(t.prev,t,t.next)===0)){if(ua(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function ca(s,e,t,n,i,r,a){if(!s)return;!a&&r&&Kx(s,n,i,r);let o=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?Hx(s,n,i,r):zx(s)){e.push(l.i/t|0),e.push(s.i/t|0),e.push(c.i/t|0),ua(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=Vx(Ss(s),e,t),ca(s,e,t,n,i,r,2)):a===2&&Gx(s,e,t,n,i,r):ca(Ss(s),e,t,n,i,r,1);break}}}function zx(s){let e=s.prev,t=s,n=s.next;if(Vt(e,t,n)>=0)return!1;let i=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=i<r?i<a?i:a:r<a?r:a,u=o<l?o<c?o:c:l<c?l:c,d=i>r?i>a?i:a:r>a?r:a,f=o>l?o>c?o:c:l>c?l:c,g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&sr(i,o,r,l,a,c,g.x,g.y)&&Vt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Hx(s,e,t,n){let i=s.prev,r=s,a=s.next;if(Vt(i,r,a)>=0)return!1;let o=i.x,l=r.x,c=a.x,h=i.y,u=r.y,d=a.y,f=o<l?o<c?o:c:l<c?l:c,g=h<u?h<d?h:d:u<d?u:d,_=o>l?o>c?o:c:l>c?l:c,m=h>u?h>d?h:d:u>d?u:d,p=uh(f,g,e,t,n),M=uh(_,m,e,t,n),y=s.prevZ,S=s.nextZ;for(;y&&y.z>=p&&S&&S.z<=M;){if(y.x>=f&&y.x<=_&&y.y>=g&&y.y<=m&&y!==i&&y!==a&&sr(o,h,l,u,c,d,y.x,y.y)&&Vt(y.prev,y,y.next)>=0||(y=y.prevZ,S.x>=f&&S.x<=_&&S.y>=g&&S.y<=m&&S!==i&&S!==a&&sr(o,h,l,u,c,d,S.x,S.y)&&Vt(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;y&&y.z>=p;){if(y.x>=f&&y.x<=_&&y.y>=g&&y.y<=m&&y!==i&&y!==a&&sr(o,h,l,u,c,d,y.x,y.y)&&Vt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;S&&S.z<=M;){if(S.x>=f&&S.x<=_&&S.y>=g&&S.y<=m&&S!==i&&S!==a&&sr(o,h,l,u,c,d,S.x,S.y)&&Vt(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function Vx(s,e,t){let n=s;do{let i=n.prev,r=n.next.next;!cl(i,r)&&Wf(i,n,n.next,r)&&ha(i,r)&&ha(r,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),ua(n),ua(n.next),n=s=r),n=n.next}while(n!==s);return Ss(n)}function Gx(s,e,t,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Qx(a,o)){let l=Xf(a,o);a=Ss(a,a.next),l=Ss(l,l.next),ca(a,e,t,n,i,r,0),ca(l,e,t,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function Wx(s,e,t,n){let i=[],r,a,o,l,c;for(r=0,a=e.length;r<a;r++)o=e[r]*n,l=r<a-1?e[r+1]*n:s.length,c=Gf(s,o,l,n,!1),c===c.next&&(c.steiner=!0),i.push(Jx(c));for(i.sort(Xx),r=0;r<i.length;r++)t=qx(i[r],t);return t}function Xx(s,e){return s.x-e.x}function qx(s,e){let t=Yx(s,e);if(!t)return e;let n=Xf(t,s);return Ss(n,n.next),Ss(t,t.next)}function Yx(s,e){let t=e,n=-1/0,i,r=s.x,a=s.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){let d=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=r&&d>n&&(n=d,i=t.x<t.next.x?t:t.next,d===r))return i}t=t.next}while(t!==e);if(!i)return null;let o=i,l=i.x,c=i.y,h=1/0,u;t=i;do r>=t.x&&t.x>=l&&r!==t.x&&sr(a<c?r:n,a,l,c,a<c?n:r,a,t.x,t.y)&&(u=Math.abs(a-t.y)/(r-t.x),ha(t,s)&&(u<h||u===h&&(t.x>i.x||t.x===i.x&&$x(i,t)))&&(i=t,h=u)),t=t.next;while(t!==o);return i}function $x(s,e){return Vt(s.prev,s,e.prev)<0&&Vt(e.next,s,s.next)<0}function Kx(s,e,t,n){let i=s;do i.z===0&&(i.z=uh(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Zx(i)}function Zx(s){let e,t,n,i,r,a,o,l,c=1;do{for(t=s,s=null,r=null,a=0;t;){for(a++,n=t,o=0,e=0;e<c&&(o++,n=n.nextZ,!!n);e++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,o--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;t=n}r.nextZ=null,c*=2}while(a>1);return s}function uh(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function Jx(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function sr(s,e,t,n,i,r,a,o){return(i-a)*(e-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(i-a)*(n-o)}function Qx(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!jx(s,e)&&(ha(s,e)&&ha(e,s)&&ev(s,e)&&(Vt(s.prev,s,e.prev)||Vt(s,e.prev,e))||cl(s,e)&&Vt(s.prev,s,s.next)>0&&Vt(e.prev,e,e.next)>0)}function Vt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function cl(s,e){return s.x===e.x&&s.y===e.y}function Wf(s,e,t,n){let i=ho(Vt(s,e,t)),r=ho(Vt(s,e,n)),a=ho(Vt(t,n,s)),o=ho(Vt(t,n,e));return!!(i!==r&&a!==o||i===0&&co(s,t,e)||r===0&&co(s,n,e)||a===0&&co(t,s,n)||o===0&&co(t,e,n))}function co(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function ho(s){return s>0?1:s<0?-1:0}function jx(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&Wf(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function ha(s,e){return Vt(s.prev,s,s.next)<0?Vt(s,e,s.next)>=0&&Vt(s,s.prev,e)>=0:Vt(s,e,s.prev)<0||Vt(s,s.next,e)<0}function ev(s,e){let t=s,n=!1,i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function Xf(s,e){let t=new dh(s.i,s.x,s.y),n=new dh(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function lf(s,e,t,n){let i=new dh(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ua(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function dh(s,e,t){this.i=s,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function tv(s,e,t,n){let i=0;for(let r=e,a=t-n;r<t;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}var $r=class s{static area(e){let t=e.length,n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let n=[],i=[],r=[];cf(e),hf(n,e);let a=e.length;t.forEach(cf);for(let l=0;l<t.length;l++)i.push(a),a+=t[l].length,hf(n,t[l]);let o=kx.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function cf(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function hf(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}var qo=class s extends hh{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}};var Yo=class s extends Ot{constructor(e=.5,t=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);let o=[],l=[],c=[],h=[],u=e,d=(t-e)/i,f=new A,g=new ce;for(let _=0;_<=i;_++){for(let m=0;m<=n;m++){let p=r+m/n*a;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let _=0;_<i;_++){let m=_*(n+1);for(let p=0;p<n;p++){let M=p+m,y=M,S=M+n+1,F=M+n+2,R=M+1;o.push(y,S,R),o.push(S,F,R)}}this.setIndex(o),this.setAttribute("position",new ft(l,3)),this.setAttribute("normal",new ft(c,3)),this.setAttribute("uv",new ft(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},$o=class s extends Ot{constructor(e=new la([new ce(0,.5),new ce(-.5,-.5),new ce(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],r=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new ft(i,3)),this.setAttribute("normal",new ft(r,3)),this.setAttribute("uv",new ft(a,2));function c(h){let u=i.length/3,d=h.extractPoints(t),f=d.shape,g=d.holes;$r.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=g.length;m<p;m++){let M=g[m];$r.isClockWise(M)===!0&&(g[m]=M.reverse())}let _=$r.triangulateShape(f,g);for(let m=0,p=g.length;m<p;m++){let M=g[m];f=f.concat(M)}for(let m=0,p=f.length;m<p;m++){let M=f[m];i.push(M.x,M.y,0),r.push(0,0,1),a.push(M.x,M.y)}for(let m=0,p=_.length;m<p;m++){let M=_[m],y=M[0]+u,S=M[1]+u,F=M[2]+u;n.push(y,S,F),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return nv(t,e)}static fromJSON(e,t){let n=[];for(let i=0,r=e.shapes.length;i<r;i++){let a=t[e.shapes[i]];n.push(a)}return new s(n,e.curveSegments)}};function nv(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){let i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}var bs=class s extends Ot{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new A,d=new A,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){let M=[],y=p/n,S=0;p===0&&a===0?S=.5/t:p===n&&l===Math.PI&&(S=-.5/t);for(let F=0;F<=t;F++){let R=F/t;u.x=-e*Math.cos(i+R*r)*Math.sin(a+y*o),u.y=e*Math.cos(a+y*o),u.z=e*Math.sin(i+R*r)*Math.sin(a+y*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(R+S,1-y),M.push(c++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<t;M++){let y=h[p][M+1],S=h[p][M],F=h[p+1][M],R=h[p+1][M+1];(p!==0||a>0)&&f.push(y,S,R),(p!==n-1||l<Math.PI)&&f.push(S,F,R)}this.setIndex(f),this.setAttribute("position",new ft(g,3)),this.setAttribute("normal",new ft(_,3)),this.setAttribute("uv",new ft(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Gt=class s extends Ot{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],l=[],c=[],h=new A,u=new A,d=new A;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){let _=g/i*r,m=f/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(_),u.y=(e+t*Math.cos(m))*Math.sin(_),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){let _=(i+1)*f+g-1,m=(i+1)*(f-1)+g-1,p=(i+1)*(f-1)+g,M=(i+1)*f+g;a.push(_,m,M),a.push(m,p,M)}this.setIndex(a),this.setAttribute("position",new ft(o,3)),this.setAttribute("normal",new ft(l,3)),this.setAttribute("uv",new ft(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Ko=class extends an{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},ai=class extends In{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ne(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=If,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},jt=class extends ai{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ce(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Jt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ne(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ne(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ne(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};function uo(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function iv(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function sv(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function uf(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let l=0;l!==e;++l)i[a++]=s[o+l]}return i}function qf(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}var Yi=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},fh=class extends Yi{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ku,endingEnd:Ku}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,a=e+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Zu:r=e,o=2*t-n;break;case Ju:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Zu:a=e,l=2*n-t;break;case Ju:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,M=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,y=(-1-f)*m+(1.5+f)*_+.5*g,S=f*m-f*_;for(let F=0;F!==o;++F)r[F]=p*a[h+F]+M*a[c+F]+y*a[l+F]+S*a[u+F];return r}},ph=class extends Yi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}},mh=class extends Yi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},$n=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=uo(t,this.TimeBufferType),this.values=uo(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:uo(e.times,Array),values:uo(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new mh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ph(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new fh(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case pr:t=this.InterpolantFactoryMethodDiscrete;break;case mr:t=this.InterpolantFactoryMethodLinear;break;case Il:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return pr;case this.InterpolantFactoryMethodLinear:return mr;case this.InterpolantFactoryMethodSmooth:return Il}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&iv(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Il,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(i)l=!0;else{let u=o*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){let _=t[u+g];if(_!==t[d+g]||_!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};$n.prototype.TimeBufferType=Float32Array;$n.prototype.ValueBufferType=Float32Array;$n.prototype.DefaultInterpolation=mr;var $i=class extends $n{constructor(e,t,n){super(e,t,n)}};$i.prototype.ValueTypeName="bool";$i.prototype.ValueBufferType=Array;$i.prototype.DefaultInterpolation=pr;$i.prototype.InterpolantFactoryMethodLinear=void 0;$i.prototype.InterpolantFactoryMethodSmooth=void 0;var Zo=class extends $n{};Zo.prototype.ValueTypeName="color";var Ai=class extends $n{};Ai.prototype.ValueTypeName="number";var gh=class extends Yi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t),c=e*o;for(let h=c+o;c!==h;c+=4)Pn.slerpFlat(r,0,a,c-o,a,c,l);return r}},Ri=class extends $n{InterpolantFactoryMethodLinear(e){return new gh(this.times,this.values,this.getValueSize(),e)}};Ri.prototype.ValueTypeName="quaternion";Ri.prototype.InterpolantFactoryMethodSmooth=void 0;var Ki=class extends $n{constructor(e,t,n){super(e,t,n)}};Ki.prototype.ValueTypeName="string";Ki.prototype.ValueBufferType=Array;Ki.prototype.DefaultInterpolation=pr;Ki.prototype.InterpolantFactoryMethodLinear=void 0;Ki.prototype.InterpolantFactoryMethodSmooth=void 0;var Ci=class extends $n{};Ci.prototype.ValueTypeName="vector";var Jo=class{constructor(e="",t=-1,n=[],i=am){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Vn(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(av(n[a]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push($n.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let h=sv(l);l=uf(l,1,h),c=uf(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new Ai(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],h=c.name.match(r);if(h&&h.length>1){let u=h[1],d=i[u];d||(i[u]=d=[]),d.push(c)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,d,f,g,_){if(f.length!==0){let m=[],p=[];qf(f,m,p,g),m.length!==0&&_.push(new u(d,m,p))}},i=[],r=e.name||"default",a=e.fps||30,o=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let u=0;u<c.length;u++){let d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let f={},g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(let _ in f){let m=[],p=[];for(let M=0;M!==d[g].morphTargets.length;++M){let y=d[g];m.push(y.time),p.push(y.morphTarget===_?1:0)}i.push(new Ai(".morphTargetInfluence["+_+"]",m,p))}l=f.length*a}else{let f=".bones["+t[u].name+"]";n(Ci,f+".position",d,"pos",i),n(Ri,f+".quaternion",d,"rot",i),n(Ci,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,l,i,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function rv(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ai;case"vector":case"vector2":case"vector3":case"vector4":return Ci;case"color":return Zo;case"quaternion":return Ri;case"bool":case"boolean":return $i;case"string":return Ki}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function av(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=rv(s.type);if(s.times===void 0){let t=[],n=[];qf(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}var Hi={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}},da=class{constructor(e,t,n){let i=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}},ov=new da,ui=class{constructor(e){this.manager=e!==void 0?e:ov,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};ui.DEFAULT_MATERIAL_NAME="__DEFAULT";var Mi={},_h=class extends Error{constructor(e,t){super(e),this.response=t}},Sr=class extends ui{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Hi.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Mi[e]!==void 0){Mi[e].push({onLoad:t,onProgress:n,onError:i});return}Mi[e]=[],Mi[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=Mi[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0,_=0,m=new ReadableStream({start(p){M();function M(){u.read().then(({done:y,value:S})=>{if(y)p.close();else{_+=S.byteLength;let F=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let R=0,P=h.length;R<P;R++){let L=h[R];L.onProgress&&L.onProgress(F)}p.enqueue(S),M()}},y=>{p.error(y)})}}});return new Response(m)}else throw new _h(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o===void 0)return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{Hi.add(e,c);let h=Mi[e];delete Mi[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{let h=Mi[e];if(h===void 0)throw this.manager.itemError(e),c;delete Mi[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var yh=class extends ui{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Hi.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;let o=Qr("img");function l(){h(),Hi.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){h(),i&&i(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}};var Qo=class extends ui{constructor(e){super(e)}load(e,t,n,i){let r=this,a=new ia,o=new Sr(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(r.withCredentials),o.load(e,function(l){let c;try{c=r.parse(l)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}c.image!==void 0?a.image=c.image:c.data!==void 0&&(a.image.width=c.width,a.image.height=c.height,a.image.data=c.data),a.wrapS=c.wrapS!==void 0?c.wrapS:Ct,a.wrapT=c.wrapT!==void 0?c.wrapT:Ct,a.magFilter=c.magFilter!==void 0?c.magFilter:Ht,a.minFilter=c.minFilter!==void 0?c.minFilter:Ht,a.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(a.colorSpace=c.colorSpace),c.flipY!==void 0&&(a.flipY=c.flipY),c.format!==void 0&&(a.format=c.format),c.type!==void 0&&(a.type=c.type),c.mipmaps!==void 0&&(a.mipmaps=c.mipmaps,a.minFilter=ri),c.mipmapCount===1&&(a.minFilter=Ht),c.generateMipmaps!==void 0&&(a.generateMipmaps=c.generateMipmaps),a.needsUpdate=!0,t&&t(a,c)},n,i),a}},br=class extends ui{constructor(e){super(e)}load(e,t,n,i){let r=new un,a=new yh(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},wr=class extends kt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ne(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},jo=class extends wr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ne(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},hc=new je,df=new A,ff=new A,fa=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ce(512,512),this.map=null,this.mapPass=null,this.matrix=new je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ea,this._frameExtents=new ce(1,1),this._viewportCount=1,this._viewports=[new Et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;df.setFromMatrixPosition(e.matrixWorld),t.position.copy(df),ff.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ff),t.updateMatrixWorld(),hc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(hc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(hc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},xh=class extends fa{constructor(){super(new sn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=gr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},el=class extends wr{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new xh}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},pf=new je,Hr=new A,uc=new A,vh=class extends fa{constructor(){super(new sn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ce(4,2),this._viewportCount=6,this._viewports=[new Et(2,1,1,1),new Et(0,1,1,1),new Et(3,1,1,1),new Et(1,1,1,1),new Et(3,0,1,1),new Et(1,0,1,1)],this._cubeDirections=[new A(1,0,0),new A(-1,0,0),new A(0,0,1),new A(0,0,-1),new A(0,1,0),new A(0,-1,0)],this._cubeUps=[new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,0,1),new A(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Hr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Hr),uc.copy(n.position),uc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(uc),n.updateMatrixWorld(),i.makeTranslation(-Hr.x,-Hr.y,-Hr.z),pf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(pf)}},Zi=class extends wr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new vh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Mh=class extends fa{constructor(){super(new Wi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ji=class extends wr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.shadow=new Mh}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Qi=class{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var tl=class extends ui{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Hi.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return Hi.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Hi.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Hi.add(e,l),r.manager.itemStart(e)}};var nl=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=mf(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=mf();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function mf(){return(typeof performance>"u"?Date:performance).now()}var Gh="\\[\\]\\.:\\/",lv=new RegExp("["+Gh+"]","g"),Wh="[^"+Gh+"]",cv="[^"+Gh.replace("\\.","")+"]",hv=/((?:WC+[\/:])*)/.source.replace("WC",Wh),uv=/(WCOD+)?/.source.replace("WCOD",cv),dv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Wh),fv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Wh),pv=new RegExp("^"+hv+uv+dv+fv+"$"),mv=["material","materials","bones","map"],Sh=class{constructor(e,t,n){let i=n||Rt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Rt=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(lv,"")}static parseTrackName(e){let t=pv.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);mv.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[i];if(a===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Rt.Composite=Sh;Rt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Rt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Rt.prototype.GetterByBindingType=[Rt.prototype._getValue_direct,Rt.prototype._getValue_array,Rt.prototype._getValue_arrayElement,Rt.prototype._getValue_toArray];Rt.prototype.SetterByBindingTypeAndVersioning=[[Rt.prototype._setValue_direct,Rt.prototype._setValue_direct_setNeedsUpdate,Rt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_array,Rt.prototype._setValue_array_setNeedsUpdate,Rt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_arrayElement,Rt.prototype._setValue_arrayElement_setNeedsUpdate,Rt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_fromArray,Rt.prototype._setValue_fromArray_setNeedsUpdate,Rt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Jv=new Float32Array(1);var gf=new je,il=class{constructor(e,t,n=0,i=1/0){this.ray=new _s(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new jr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return gf.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(gf),this}intersectObject(e,t=!0,n=[]){return bh(e,this,n,t),n.sort(_f),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)bh(e[i],this,n,t);return n.sort(_f),n}};function _f(s,e){return s.distance-e.distance}function bh(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let a=0,o=r.length;a<o;a++)bh(r[a],e,t,!0)}}var sl=class{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Jt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"166"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="166");var _a=new A;function Kn(s,e,t,n,i,r){let a=2*Math.PI*i/4,o=Math.max(r-2*i,0),l=Math.PI/4;_a.copy(e),_a[n]=0,_a.normalize();let c=.5*a/(a+o),h=1-_a.angleTo(s)/l;return Math.sign(_a[t])===1?h*c:o/(a+o)+c+c*(1-h)}var ya=class extends hi{constructor(e=1,t=1,n=1,i=2,r=.1){if(i=i*2+1,r=Math.min(e/2,t/2,n/2,r),super(1,1,1,i,i,i),i===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let o=new A,l=new A,c=new A(e,t,n).divideScalar(2).subScalar(r),h=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,f=h.length/6,g=new A,_=.5/i;for(let m=0,p=0;m<h.length;m+=3,p+=2)switch(o.fromArray(h,m),l.copy(o),l.x-=Math.sign(l.x)*_,l.y-=Math.sign(l.y)*_,l.z-=Math.sign(l.z)*_,l.normalize(),h[m+0]=c.x*Math.sign(o.x)+l.x*r,h[m+1]=c.y*Math.sign(o.y)+l.y*r,h[m+2]=c.z*Math.sign(o.z)+l.z*r,u[m+0]=l.x,u[m+1]=l.y,u[m+2]=l.z,Math.floor(m/f)){case 0:g.set(1,0,0),d[p+0]=Kn(g,l,"z","y",r,n),d[p+1]=1-Kn(g,l,"y","z",r,t);break;case 1:g.set(-1,0,0),d[p+0]=1-Kn(g,l,"z","y",r,n),d[p+1]=1-Kn(g,l,"y","z",r,t);break;case 2:g.set(0,1,0),d[p+0]=1-Kn(g,l,"x","z",r,e),d[p+1]=Kn(g,l,"z","x",r,n);break;case 3:g.set(0,-1,0),d[p+0]=1-Kn(g,l,"x","z",r,e),d[p+1]=1-Kn(g,l,"z","x",r,n);break;case 4:g.set(0,0,1),d[p+0]=1-Kn(g,l,"x","y",r,e),d[p+1]=1-Kn(g,l,"y","x",r,t);break;case 5:g.set(0,0,-1),d[p+0]=Kn(g,l,"x","y",r,e),d[p+1]=1-Kn(g,l,"y","x",r,t);break}}};function Xh(s,e){if(e===Pf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===ma||e===al){let t=s.getIndex();if(t===null){let a=[],o=s.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===ma)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}var hl=class extends ui{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Qh(t)}),this.register(function(t){return new jh(t)}),this.register(function(t){return new lu(t)}),this.register(function(t){return new cu(t)}),this.register(function(t){return new hu(t)}),this.register(function(t){return new tu(t)}),this.register(function(t){return new nu(t)}),this.register(function(t){return new iu(t)}),this.register(function(t){return new su(t)}),this.register(function(t){return new Jh(t)}),this.register(function(t){return new ru(t)}),this.register(function(t){return new eu(t)}),this.register(function(t){return new ou(t)}),this.register(function(t){return new au(t)}),this.register(function(t){return new Kh(t)}),this.register(function(t){return new uu(t)}),this.register(function(t){return new du(t)})}load(e,t,n,i){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=Qi.extractUrlBase(e);a=Qi.resolveURL(c,this.path)}else a=Qi.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Sr(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Jf){try{a[pt.KHR_BINARY_GLTF]=new fu(e)}catch(u){i&&i(u);return}r=JSON.parse(a[pt.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new vu(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case pt.KHR_MATERIALS_UNLIT:a[u]=new Zh;break;case pt.KHR_DRACO_MESH_COMPRESSION:a[u]=new pu(r,this.dracoLoader);break;case pt.KHR_TEXTURE_TRANSFORM:a[u]=new mu;break;case pt.KHR_MESH_QUANTIZATION:a[u]=new gu;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};function _v(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}var pt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Kh=class{constructor(e){this.parser=e,this.name=pt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,h=new Ne(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],en);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Ji(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Zi(h),c.distance=u;break;case"spot":c=new el(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Pi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}},Zh=class{constructor(){this.name=pt.KHR_MATERIALS_UNLIT}getMaterialType(){return Pt}extendParams(e,t,n){let i=[];e.color=new Ne(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],en),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Mt))}return Promise.all(i)}},Jh=class{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},Qh=class{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ce(o,o)}return Promise.all(r)}},jh=class{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jt}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},eu=class{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}},tu=class{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new Ne(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],en)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,Mt)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}},nu=class{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}},iu=class{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Ne().setRGB(o[0],o[1],o[2],en),Promise.all(r)}},su=class{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jt}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},ru=class{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new Ne().setRGB(o[0],o[1],o[2],en),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,Mt)),Promise.all(r)}},au=class{constructor(e){this.parser=e,this.name=pt.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}},ou=class{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}},lu=class{constructor(e){this.parser=e,this.name=pt.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},cu=class{constructor(e){this.parser=e,this.name=pt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},hu=class{constructor(e){this.parser=e,this.name=pt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},uu=class{constructor(e){this.name=pt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){let f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}},du=class{constructor(e){this.name=pt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let c of i.primitives)if(c.mode!==Zn.TRIANGLES&&c.mode!==Zn.TRIANGLE_STRIP&&c.mode!==Zn.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(let g of u){let _=new je,m=new A,p=new Pn,M=new A(1,1,1),y=new vs(g.geometry,g.material,d);for(let S=0;S<d;S++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,S),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,S),l.SCALE&&M.fromBufferAttribute(l.SCALE,S),y.setMatrixAt(S,_.compose(m,p,M));for(let S in l)if(S==="_COLOR_0"){let F=l[S];y.instanceColor=new xs(F.array,F.itemSize,F.normalized)}else S!=="TRANSLATION"&&S!=="ROTATION"&&S!=="SCALE"&&g.geometry.setAttribute(S,l[S]);kt.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),f.push(y)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}},Jf="glTF",xa=12,Yf={JSON:1313821514,BIN:5130562},fu=class{constructor(e){this.name=pt.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,xa),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Jf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-xa,r=new DataView(e,xa),a=0;for(;a<i;){let o=r.getUint32(a,!0);a+=4;let l=r.getUint32(a,!0);if(a+=4,l===Yf.JSON){let c=new Uint8Array(e,xa+a,o);this.content=n.decode(c)}else if(l===Yf.BIN){let c=xa+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},pu=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=pt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let h in a){let u=yu[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=yu[h]||h.toLowerCase();if(a[h]!==void 0){let d=n.accessors[e.attributes[h]],f=Tr[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(let g in f.attributes){let _=f.attributes[g],m=l[g];m!==void 0&&(_.normalized=m)}u(f)},o,c,en,d)})})}},mu=class{constructor(){this.name=pt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},gu=class{constructor(){this.name=pt.KHR_MESH_QUANTIZATION}},ul=class extends Yi{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,g=e*c,_=g-c,m=-2*f+3*d,p=f-d,M=1-m,y=p-d+u;for(let S=0;S!==o;S++){let F=a[_+S+o],R=a[_+S+l]*h,P=a[g+S+o],L=a[g+S]*h;r[S]=M*F+y*R+m*P+p*L}return r}},yv=new Pn,_u=class extends ul{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return yv.fromArray(r).normalize().toArray(r),r}},Zn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Tr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},$f={9728:vn,9729:Ht,9984:Ph,9985:Gr,9986:nr,9987:ri},Kf={33071:Ct,33648:Zr,10497:ms},qh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},yu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},es={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},xv={CUBICSPLINE:void 0,LINEAR:mr,STEP:pr},Yh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function vv(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new ai({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Gn})),s.DefaultMaterial}function ws(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Pi(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Mv(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,h=e.length;c<h;c++){let u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){let u=e[c];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;a.push(d)}if(i){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;o.push(d)}if(r){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],d=c[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function Sv(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function bv(s){let e,t=s.extensions&&s.extensions[pt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+$h(t.attributes):e=s.indices+":"+$h(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+$h(s.targets[n]);return e}function $h(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function xu(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function wv(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}var Ev=new je,vu=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new _v,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?this.textureLoader=new br(this.options.manager):this.textureLoader=new tl(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Sr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return ws(r,o,i),Pi(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let a=t[i].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,h]of a.children.entries())r(h,o.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[pt.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,a){n.load(Qi.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let a=qh[i.type],o=Tr[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new rn(c,a,l))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],l=qh[i.type],c=Tr[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0,_,m;if(f&&f!==u){let p=Math.floor(d/f),M="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count,y=t.cache.get(M);y||(_=new c(o,p*f,i.count*f/h),y=new xr(_,f/h),t.cache.add(M,y)),m=new ys(y,l,d%f/h,g)}else o===null?_=new c(i.count*l):_=new c(o,d,i.count*l),m=new rn(_,l,g);if(i.sparse!==void 0){let p=qh.SCALAR,M=Tr[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,S=i.sparse.values.byteOffset||0,F=new M(a[1],y,i.sparse.count*p),R=new c(a[2],S,i.sparse.count*l);o!==null&&(m=new rn(m.array.slice(),m.itemSize,m.normalized));for(let P=0,L=F.length;P<L;P++){let b=F[P];if(m.setX(b,R[P*l]),l>=2&&m.setY(b,R[P*l+1]),l>=3&&m.setZ(b,R[P*l+2]),l>=4&&m.setW(b,R[P*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let i=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let d=(r.samplers||{})[a.sampler]||{};return h.magFilter=$f[d.magFilter]||Ht,h.minFilter=$f[d.minFilter]||ri,h.wrapS=Kf[d.wrapS]||ms,h.wrapT=Kf[d.wrapT]||ms,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=i.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;let d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){let m=new un(_);m.needsUpdate=!0,d(m)}),t.load(Qi.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),Pi(u,a),u.userData.mimeType=a.mimeType||wv(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[pt.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[pt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=r.associations.get(a);a=r.extensions[pt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new sa,In.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new Xi,In.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return ai}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],a,o={},l=r.extensions||{},c=[];if(l[pt.KHR_MATERIALS_UNLIT]){let u=i[pt.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,r,t))}else{let u=r.pbrMetallicRoughness||{};if(o.color=new Ne(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],en),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,Mt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=$t);let h=r.alphaMode||Yh.OPAQUE;if(h===Yh.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Yh.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Pt&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new ce(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==Pt&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Pt){let u=r.emissiveFactor;o.emissive=new Ne().setRGB(u[0],u[1],u[2],en)}return r.emissiveTexture!==void 0&&a!==Pt&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Mt)),Promise.all(c).then(function(){let u=new a(o);return r.name&&(u.name=r.name),Pi(u,r),t.associations.set(u,{materials:e}),r.extensions&&ws(i,u,r),u})}createUniqueName(e){let t=Rt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[pt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Zf(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],h=bv(c),u=i[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[pt.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=Zf(new Ot,c,t),i[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let h=a[l].material===void 0?vv(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){let c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){let _=h[f],m=a[f],p,M=c[f];if(m.mode===Zn.TRIANGLES||m.mode===Zn.TRIANGLE_STRIP||m.mode===Zn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new Uo(_,M):new Xt(_,M),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Zn.TRIANGLE_STRIP?p.geometry=Xh(p.geometry,al):m.mode===Zn.TRIANGLE_FAN&&(p.geometry=Xh(p.geometry,ma));else if(m.mode===Zn.LINES)p=new Mr(_,M);else if(m.mode===Zn.LINE_STRIP)p=new qi(_,M);else if(m.mode===Zn.LINE_LOOP)p=new Bo(_,M);else if(m.mode===Zn.POINTS)p=new ko(_,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&Sv(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Pi(p,r),m.extensions&&ws(i,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&ws(i,u[0],r),u[0];let d=new Qt;r.extensions&&ws(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new sn(dn.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Wi(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Pi(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),a=i,o=[],l=[];for(let c=0,h=a.length;c<h;c++){let u=a[c];if(u){o.push(u);let d=new je;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new No(o,l)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){let f=i.channels[u],g=i.samplers[f.sampler],_=f.target,m=_.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,M=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",M)),c.push(g),h.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){let d=u[0],f=u[1],g=u[2],_=u[3],m=u[4],p=[];for(let M=0,y=d.length;M<y;M++){let S=d[M],F=f[M],R=g[M],P=_[M],L=m[M];if(S===void 0)continue;S.updateMatrix&&S.updateMatrix();let b=n._createAnimationTracks(S,F,R,P,L);if(b)for(let v=0;v<b.length;v++)p.push(b[v])}return new Jo(r,void 0,p)})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));let l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){let h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Ev)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(r.isBone===!0?h=new na:c.length>1?h=new Qt:c.length===1?h=c[0]:h=new kt,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=a),Pi(h,r),r.extensions&&ws(n,h,r),r.matrix!==void 0){let u=new je;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new Qt;n.name&&(r.name=i.createUniqueName(n.name)),Pi(r,n),n.extensions&&ws(t,r,n);let a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);let c=h=>{let u=new Map;for(let[d,f]of i.associations)(d instanceof In||d instanceof un)&&u.set(d,f);return h.traverse(d=>{let f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){let a=[],o=e.name?e.name:e.uuid,l=[];es[r.path]===es.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(es[r.path]){case es.weights:c=Ai;break;case es.rotation:c=Ri;break;case es.position:case es.scale:c=Ci;break;default:n.itemSize===1?c=Ai:c=Ci;break}let h=i.interpolation!==void 0?xv[i.interpolation]:mr,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){let g=new c(l[d]+"."+es[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=xu(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof Ri?_u:ul;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Tv(s,e,t){let n=e.attributes,i=new Xn;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new A(l[0],l[1],l[2]),new A(c[0],c[1],c[2])),o.normalized){let h=xu(Tr[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new A,l=new A;for(let c=0,h=r.length;c<h;c++){let u=r[c];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){let _=xu(Tr[d.componentType]);l.multiplyScalar(_)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;let a=new Fn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function Zf(s,e,t){let n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){s.setAttribute(o,l)})}for(let a in n){let o=yu[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){let a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return _t.workingColorSpace!==en&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${_t.workingColorSpace}" not supported.`),Pi(s,e),Tv(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Mv(s,e.targets,t):s})}var dl=class extends Qo{constructor(e){super(e),this.type=Mn}parse(e){let a=function(L,b){switch(L){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(b||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(b||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(b||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(b||""))}},u=function(L,b,v){b=b||1024;let G=L.pos,z=-1,B=0,ee="",W=String.fromCharCode.apply(null,new Uint16Array(L.subarray(G,G+128)));for(;0>(z=W.indexOf(`
`))&&B<b&&G<L.byteLength;)ee+=W,B+=W.length,G+=128,W+=String.fromCharCode.apply(null,new Uint16Array(L.subarray(G,G+128)));return-1<z?(v!==!1&&(L.pos+=B+z+1),ee+W.slice(0,z)):!1},d=function(L){let b=/^#\?(\S+)/,v=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,U=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,G=/^\s*FORMAT=(\S+)\s*$/,z=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,B={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0},ee,W;for((L.pos>=L.byteLength||!(ee=u(L)))&&a(1,"no header found"),(W=ee.match(b))||a(3,"bad initial token"),B.valid|=1,B.programtype=W[1],B.string+=ee+`
`;ee=u(L),ee!==!1;){if(B.string+=ee+`
`,ee.charAt(0)==="#"){B.comments+=ee+`
`;continue}if((W=ee.match(v))&&(B.gamma=parseFloat(W[1])),(W=ee.match(U))&&(B.exposure=parseFloat(W[1])),(W=ee.match(G))&&(B.valid|=2,B.format=W[1]),(W=ee.match(z))&&(B.valid|=4,B.height=parseInt(W[1],10),B.width=parseInt(W[2],10)),B.valid&2&&B.valid&4)break}return B.valid&2||a(3,"missing format specifier"),B.valid&4||a(3,"missing image size specifier"),B},f=function(L,b,v){let U=b;if(U<8||U>32767||L[0]!==2||L[1]!==2||L[2]&128)return new Uint8Array(L);U!==(L[2]<<8|L[3])&&a(3,"wrong scanline width");let G=new Uint8Array(4*b*v);G.length||a(4,"unable to allocate buffer space");let z=0,B=0,ee=4*U,W=new Uint8Array(4),ie=new Uint8Array(ee),j=v;for(;j>0&&B<L.byteLength;){B+4>L.byteLength&&a(1),W[0]=L[B++],W[1]=L[B++],W[2]=L[B++],W[3]=L[B++],(W[0]!=2||W[1]!=2||(W[2]<<8|W[3])!=U)&&a(3,"bad rgbe scanline format");let be=0,xe;for(;be<ee&&B<L.byteLength;){xe=L[B++];let Ge=xe>128;if(Ge&&(xe-=128),(xe===0||be+xe>ee)&&a(3,"bad scanline data"),Ge){let $e=L[B++];for(let ne=0;ne<xe;ne++)ie[be++]=$e}else ie.set(L.subarray(B,B+xe),be),be+=xe,B+=xe}let Ce=U;for(let Ge=0;Ge<Ce;Ge++){let $e=0;G[z]=ie[Ge+$e],$e+=U,G[z+1]=ie[Ge+$e],$e+=U,G[z+2]=ie[Ge+$e],$e+=U,G[z+3]=ie[Ge+$e],z+=4}j--}return G},g=function(L,b,v,U){let G=L[b+3],z=Math.pow(2,G-128)/255;v[U+0]=L[b+0]*z,v[U+1]=L[b+1]*z,v[U+2]=L[b+2]*z,v[U+3]=1},_=function(L,b,v,U){let G=L[b+3],z=Math.pow(2,G-128)/255;v[U+0]=ga.toHalfFloat(Math.min(L[b+0]*z,65504)),v[U+1]=ga.toHalfFloat(Math.min(L[b+1]*z,65504)),v[U+2]=ga.toHalfFloat(Math.min(L[b+2]*z,65504)),v[U+3]=ga.toHalfFloat(1)},m=new Uint8Array(e);m.pos=0;let p=d(m),M=p.width,y=p.height,S=f(m.subarray(m.pos),M,y),F,R,P;switch(this.type){case Tn:P=S.length/4;let L=new Float32Array(P*4);for(let v=0;v<P;v++)g(S,v*4,L,v*4);F=L,R=Tn;break;case Mn:P=S.length/4;let b=new Uint16Array(P*4);for(let v=0;v<P;v++)_(S,v*4,b,v*4);F=b,R=Mn;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:M,height:y,data:F,header:p.string,gamma:p.gamma,exposure:p.exposure,type:R}}setDataType(e){return this.type=e,this}load(e,t,n,i){function r(a,o){switch(a.type){case Tn:case Mn:a.colorSpace=en,a.minFilter=Ht,a.magFilter=Ht,a.generateMipmaps=!1,a.flipY=!0;break}t&&t(a,o)}return super.load(e,r,n,i)}};var fl={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var Bn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Av=new Wi(-1,1,1,-1,0,1),Mu=class extends Ot{constructor(){super(),this.setAttribute("position",new ft([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ft([0,2,0,0,2,0],2))}},Rv=new Mu,ts=class{constructor(e){this._mesh=new Xt(Rv,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Av)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var pl=class extends Bn{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof an?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ji.clone(e.uniforms),this.material=new an({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new ts(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var va=class extends Bn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}},ml=class extends Bn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var gl=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new ce);this._width=n.width,this._height=n.height,t=new An(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Mn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new pl(fl),this.copyPass.material.blending=ci,this.clock=new nl}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let i=0,r=this.passes.length;i<r;i++){let a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}va!==void 0&&(a instanceof va?n=!0:a instanceof ml&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new ce);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var _l=class extends Bn{constructor(e,t,n=null,i=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ne}render(e,t,n){let i=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=i}};var Qf={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ne(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};var Ar=class s extends Bn{constructor(e,t,n,i){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new ce(e.x,e.y):new ce(256,256),this.clearColor=new Ne(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new An(r,a,{type:Mn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){let d=new An(r,a,{type:Mn});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let f=new An(r,a,{type:Mn});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),a=Math.round(a/2)}let o=Qf;this.highPassUniforms=ji.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new an({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new ce(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new A(1,1,1),new A(1,1,1),new A(1,1,1),new A(1,1,1),new A(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;let h=fl;this.copyUniforms=ji.clone(h.uniforms),this.blendMaterial=new an({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:Wn,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Ne,this.oldClearAlpha=1,this.basic=new Pt,this.fsQuad=new ts(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new ce(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();let a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=s.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=s.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeperableBlurMaterial(e){let t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new an({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ce(.5,.5)},direction:{value:new ce(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}};Ar.BlurDirectionX=new ce(1,0);Ar.BlurDirectionY=new ce(0,1);var jf={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};var yl=class extends Bn{constructor(){super();let e=jf;this.uniforms=ji.clone(e.uniforms),this.material=new Ko({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new ts(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},_t.getTransfer(this._outputColorSpace)===Tt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Eh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Th?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Ah?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===pa?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Rh?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ch&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};function ep(){let s=0,e=null,t=!0;return{invalidate(){t=!0},tick(n,{hidden:i=!1,enabled:r=!0,fps:a=60}={}){if(i)return e=null,t=!0,null;if(!r&&!t)return null;let o=1e3/a;if(!t&&e!==null&&n-e<o-1)return null;let l=e===null?o:Math.max(0,n-e);e=n,t=!1;let c=r?Math.min(l/1e3,.12):0;return s+=c,{delta:c,elapsed:s,frameMs:l}},reset(){e=null,t=!0}}}function tp(s=[]){let e=i=>Math.max(0,Number.isFinite(Number(i))?Number(i):0),t=s.slice(-12).map((i,r)=>{let a=e(i.requests),o=e(i.ordersReceived??i.workCreated);return{key:i.day||i.date||i.label||String(r),label:i.label||`Day ${r+1}`,requests:a,orders:o,total:a+o}}),n=Math.max(1,...t.flatMap(i=>[i.requests,i.orders]));return t.map(i=>({...i,requestScale:i.requests/n,orderScale:i.orders/n}))}var Fe={blue:7907839,teal:7524806,mint:9034154,cyan:7265535,violet:10845183,magenta:16741331,amber:16765580,steel:2765880,steelDark:1844520,steelLight:3753547},di={overview:{id:"overview",label:"Overview",pos:[0,8,29.6],look:[0,1.75,-.45]},buckets:{id:"buckets",label:"Platform Systems",pos:[.6,6.2,14.8],look:[.8,2.05,-7.7]},timeline:{id:"timeline",label:"Activity Runway",pos:[5.6,5.4,12.4],look:[4.5,1.25,1.1]},files:{id:"files",label:"Notable Signals",pos:[0,4,15.6],look:[0,1.65,6.05]},vault:{id:"vault",label:"App Health",pos:[-15,6.8,5.8],look:[-8.25,3.95,-7]}},Cv=2.7;function np(s){return s<.5?4*s*s*s:1-Math.pow(-2*s+2,3)/2}function ip(s){let{canvas:e,touchTargets:t,tooltip:n,buckets:i,months:r,files:a,formatBytes:o,core:l={},activity:c=[],onZoneChange:h=()=>{},onBucketSelected:u=()=>{},onMonthSelected:d=()=>{},onFileSelected:f=()=>{},onVaultSelected:g=()=>{},qualityPreference:_="auto",onPerformanceSample:m=()=>{},onQualityChange:p=()=>{},onFirstRender:M=()=>{},onInspection:y=()=>{},onMotionChange:S=()=>{},motionPaused:F=!1}=s,R=Array.isArray(l.rows)?l.rows:[],P=R.find(([x])=>x==="Health score"),L=Object.freeze({performance:{pixelRatioMin:1,pixelRatioMax:1,samples:0,bloom:.55,shadowSize:1024,targetFps:45},balanced:{pixelRatioMin:1,pixelRatioMax:1.4,samples:2,bloom:.85,shadowSize:1024,targetFps:60},cinematic:{pixelRatioMin:1.35,pixelRatioMax:2,samples:4,bloom:1,shadowSize:2048,targetFps:60}});function b(){let x=navigator.connection||navigator.mozConnection||navigator.webkitConnection,I=window.matchMedia("(pointer: coarse), (hover: none)").matches,C=!!x?.saveData||/(^|-)2g|3g/.test(String(x?.effectiveType||"")),V=Number(navigator.deviceMemory)>0&&Number(navigator.deviceMemory)<=4||Number(navigator.hardwareConcurrency)>0&&Number(navigator.hardwareConcurrency)<=4;return I||C||V?"performance":"balanced"}function v(x){return x==="performance"||x==="cinematic"?x:b()}let U={preference:["auto","performance","cinematic"].includes(_)?_:"auto",effective:v(_)},G=L[U.effective],z=null,B=new Io({canvas:e,antialias:!1,powerPreference:"high-performance"}),ee=()=>Math.min(Math.max(window.devicePixelRatio||1,G.pixelRatioMin),G.pixelRatioMax);B.setPixelRatio(ee()),B.setSize(window.innerWidth,window.innerHeight),B.outputColorSpace=Mt,B.toneMapping=pa,B.toneMappingExposure=1.24,B.shadowMap.enabled=!0,B.shadowMap.type=wh,B.info.autoReset=!1;let W=new Do;W.background=new Ne(860722),W.backgroundIntensity=1.28,W.fog=new Lo(860722,.00285),W.environmentIntensity=.84;let ie=new sn(38,window.innerWidth/window.innerHeight,.1,300),j=!1,be=new da;be.onLoad=()=>{j=!0,oe()},new dl(be).load("assets/performance-spatial/hdri/studio_small_01_1k.hdr",x=>{x.mapping=Kr,W.environment=x});let xe=new br(be),Ce=xe.load("assets/performance-spatial/textures/file-cube-skins.png",x=>{x.colorSpace=Mt,x.anisotropy=B.capabilities.getMaxAnisotropy(),x.needsUpdate=!0});Ce.colorSpace=Mt,Ce.wrapS=Ct,Ce.wrapT=Ct;let Ge=xe.load("assets/performance-spatial/textures/silo-open-panels.png",x=>{x.colorSpace=Mt,x.anisotropy=B.capabilities.getMaxAnisotropy(),x.needsUpdate=!0});Ge.colorSpace=Mt,Ge.wrapS=Ct,Ge.wrapT=Ct;let $e=xe.load("assets/performance-spatial/textures/silo-closed-panels.png",x=>{x.colorSpace=Mt,x.anisotropy=B.capabilities.getMaxAnisotropy(),x.needsUpdate=!0});$e.colorSpace=Mt,$e.wrapS=Ct,$e.wrapT=Ct;let ne=xe.load("assets/performance-spatial/textures/capacity-core-kit.png",x=>{x.colorSpace=Mt,x.anisotropy=B.capabilities.getMaxAnisotropy(),x.needsUpdate=!0});ne.colorSpace=Mt,ne.wrapS=Ct,ne.wrapT=Ct;let he=xe.load("assets/performance-spatial/textures/floor-deck.png",x=>{x.colorSpace=Mt,x.anisotropy=B.capabilities.getMaxAnisotropy(),x.needsUpdate=!0});he.colorSpace=Mt,he.wrapS=Ct,he.wrapT=Ct;let Pe=xe.load("assets/performance-spatial/textures/outer-walls.png",x=>{x.colorSpace=Mt,x.anisotropy=B.capabilities.getMaxAnisotropy(),x.needsUpdate=!0,W.background=x,W.backgroundIntensity=1.34});Pe.colorSpace=Mt,Pe.wrapS=Ct,Pe.wrapT=Ct;let Me=new gl(B),it=B.getPixelRatio();B.capabilities.isWebGL2&&(Me.renderTarget1.samples=G.samples,Me.renderTarget2.samples=G.samples),Me.addPass(new _l(W,ie));let at=new Ar(new ce(window.innerWidth,window.innerHeight),.28,.24,.95);Me.addPass(at),Me.addPass(new yl);function ht(){let x=ie.aspect<.75;B.toneMappingExposure=x?1.28:1.24,at.strength=(x?.26:.22)*G.bloom,at.radius=x?.24:.2,W.background?.isColor&&W.background.setHex(x?1059648:860722),W.backgroundIntensity=x?1.42:1.34,W.fog.color.setHex(x?1059648:860722),W.fog.density=x?.00235:.00285,W.environmentIntensity=x?.92:.84}function It(x="auto"){U={preference:["auto","performance","cinematic"].includes(x)?x:"auto",effective:v(x)},G=L[U.effective],B.capabilities.isWebGL2&&(Me.renderTarget1.samples=G.samples,Me.renderTarget2.samples=G.samples);let I=ee();return B.getPixelRatio()!==I&&B.setPixelRatio(I),it!==I&&(Me.setPixelRatio(I),it=I),z&&(z.shadow.mapSize.set(G.shadowSize,G.shadowSize),z.shadow.map?.dispose(),z.shadow.map=null,z.shadow.needsUpdate=!0),ht(),oe(),p({...U}),{...U}}let N=[],st=[],St=[],mt={elapsedTime:0},De=ep(),Lt=window.matchMedia("(prefers-reduced-motion: reduce)"),Qe=F,et=()=>!Qe&&!Lt.matches,D=0,w=0,K=-100,oe=()=>De.invalidate(),le=new il,ae=new ce(10,10),Be={x:0,y:0,overCanvas:!1},ye=null,ve=null,qe="overview",te={basePos:new A(...di.overview.pos),baseLook:new A(...di.overview.look),fromPos:new A,toPos:new A(...di.overview.pos),fromLook:new A,toLook:new A(...di.overview.look),t:1,duration:1.7,yaw:0,pitch:0,yawStart:0,pitchStart:0},Ee=new A,ot=new sl;function Je(){return ie.aspect<.58?1.78:ie.aspect<.9?1.52:1}function Ae(x,I,C=1.7){oe(),te.fromPos.copy(te.basePos),te.fromLook.copy(te.baseLook),te.toLook.copy(I),te.toPos.copy(I).add(Ee.copy(x).sub(I).multiplyScalar(Je())),te.yawStart=te.yaw,te.pitchStart=te.pitch,te.t=0,te.duration=C}function Ke(x,I=1.7){let C=di[x];qe=x,Ae(new A(...C.pos),new A(...C.look),I),h(C)}function me(x,{roughness:I=.36,metalness:C=.55,emissive:V=0,emissiveIntensity:Y=.3}={}){return new ai({color:x,roughness:I,metalness:C,emissive:V,emissiveIntensity:Y})}function Ft(x,{roughness:I=.72,metalness:C=.1,emissive:V=0,emissiveIntensity:Y=.3}={}){return new ai({color:x,roughness:I,metalness:C,emissive:V,emissiveIntensity:Y})}function O(x,I=1.6){return new ai({color:791574,emissive:x,emissiveIntensity:I*.82,roughness:.4,metalness:.1})}function Z(x,I,C,V,{shadow:Y=!0}={}){let H=new Xt(I,C);return H.position.set(...V),H.castShadow=Y,H.receiveShadow=Y,x.add(H),H}function J(x,I,C,V,Y){let H=Math.min(.14,Math.min(...I)*.24);return Z(x,new ya(...I,4,H),V,C,Y)}function re({x,y:I,w:C,h:V},Y=Ce){let H=Y.clone();return H.colorSpace=Mt,H.anisotropy=B.capabilities.getMaxAnisotropy(),H.wrapS=Ct,H.wrapT=Ct,H.repeat.set(C,V),H.offset.set(x,1-I-V),H.needsUpdate=!0,H}function ue(x,{emissiveIntensity:I=.36,opacity:C=1,atlas:V=Ce,emissive:Y=7724287,metalness:H=.72,roughness:Q=.34,side:se=Gn}={}){let _e=re(x,V);return new ai({color:16777215,map:_e,emissive:Y,emissiveMap:_e,emissiveIntensity:I,roughness:Q,metalness:H,side:se,transparent:C<1,opacity:C,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})}function We(x,{atlas:I=Ce,color:C=16777215,opacity:V=.65}={}){return new Pt({map:re(x,I),color:C,transparent:!0,opacity:V,blending:Wn,depthWrite:!1,side:$t})}function Ze(x,I,C,V,Y=[0,0,0]){let H=Z(x,new yr(...I),V,C,{shadow:!1});return H.rotation.set(...Y),H.renderOrder=4,H}function qt(x,I,{angle:C=0,radius:V=.78,y:Y=1,width:H=.42,height:Q=2,atlas:se,emissive:_e=7265535,emissiveIntensity:ze=.22}={}){return Ze(x,[H,Q],[Math.sin(C)*V,Y,Math.cos(C)*V],ue(I,{atlas:se,emissive:_e,emissiveIntensity:ze,metalness:.82,roughness:.36,side:$t}),[0,C,0])}function Dt(x,I,{angle:C=0,radius:V=.78,y:Y=1,width:H=.42,height:Q=2,atlas:se,emissive:_e=7265535,emissiveIntensity:ze=.22,trim:Ie=!0}={}){let gt=new Qt;gt.position.set(Math.sin(C)*V,Y,Math.cos(C)*V),gt.rotation.y=C,x.add(gt);let Le=Ze(gt,[H,Q],[0,0,.006],ue(I,{atlas:se,emissive:_e,emissiveIntensity:ze,metalness:.82,roughness:.36,side:$t}));if(Le.userData.kind="closedSiloSkin",Ie){let T=me(132618,{roughness:.44,metalness:.92,emissive:66566,emissiveIntensity:.08}),Ve=me(462872,{roughness:.42,metalness:.9,emissive:135190,emissiveIntensity:.14});[[-H/2-.035,0,.024,.07,Q+.04,.06],[H/2+.035,0,.024,.07,Q+.04,.06]].forEach(([fe,Oe,He,Te,dt,wt])=>{let Bt=J(gt,[Te,dt,wt],[fe,Oe,He],T,{shadow:!1});Bt.userData.kind="closedSiloSkin"}),[[0,Q/2+.035,.028,H+.15,.07,.065],[0,-Q/2-.035,.028,H+.15,.07,.065]].forEach(([fe,Oe,He,Te,dt,wt])=>{let Bt=J(gt,[Te,dt,wt],[fe,Oe,He],Ve,{shadow:!1});Bt.userData.kind="closedSiloSkin"})}return gt.userData.kind="closedSiloSkin",gt}function yt(x,I,C,V,{phase:Y=0,speed:H=.12,size:Q=.12}={}){let se=Z(x,new bs(Q,12,8),new Pt({color:V,transparent:!0,opacity:.72,blending:Wn,depthWrite:!1}),I,{shadow:!1});return se.userData.kind="dataPacket",se.userData.from=new A(...I),se.userData.to=new A(...C),se.userData.phase=Y,se.userData.speed=H,st.push(se),se}function Ln(x,I){return I.platformTooltip&&(I.tooltip=I.platformTooltip),x.userData.payload=I,x.userData.baseScale=x.scale.clone(),x.userData.baseY=x.position.y,x.userData.baseEmissive=x.material.emissiveIntensity??0,N.push(x),st.push(x),x}function Dn(x,{accent:I="#eef7f4",scale:C=1,chip:V=!0}={}){let Y=Math.min(Math.max(window.devicePixelRatio*2,3),4),H=24,Q=['540 31px Inter, "Segoe UI", Arial, sans-serif','450 22px Inter, "Segoe UI", Arial, sans-serif'],se=[40,31],_e=document.createElement("canvas").getContext("2d"),ze=0;x.forEach((He,Te)=>{_e.font=Q[Math.min(Te,1)],ze=Math.max(ze,_e.measureText(He).width)});let Ie=Math.ceil(ze+H*2),gt=H*2+x.reduce((He,Te,dt)=>He+se[Math.min(dt,1)],0)-12,Le=document.createElement("canvas");Le.width=Ie*Y,Le.height=gt*Y;let T=Le.getContext("2d");T.scale(Y,Y),V?(T.fillStyle="rgba(6, 12, 13, 0.84)",T.beginPath(),T.roundRect(1,1,Ie-2,gt-2,14),T.fill(),T.strokeStyle="rgba(190, 235, 228, 0.32)",T.lineWidth=2,T.stroke()):(T.shadowColor="rgba(0, 0, 0, 0.85)",T.shadowBlur=3),T.textAlign="center";let Ve=H+28;x.forEach((He,Te)=>{T.font=Q[Math.min(Te,1)],T.fillStyle=Te===0?I:"#a7b3b3",T.fillText(He,Ie/2,Ve),Ve+=se[Math.min(Te,1)]});let fe=new ra(Le);fe.colorSpace=Mt,fe.anisotropy=4;let Oe=new ta(new vr({map:fe,transparent:!0,depthWrite:!1}));return Oe.scale.set(Ie/110*C,gt/110*C,1),Oe}function pi({eyebrow:x="App performance",title:I,subtitle:C="",badge:V="",rows:Y=[],footer:H="",status:Q="Online",accent:se="#6edcff",width:_e=520,height:ze=300,scale:Ie=1}){let Le=document.createElement("canvas");Le.width=_e*2,Le.height=ze*2;let T=Le.getContext("2d");T.scale(2,2);let Ve=16,fe=()=>{T.beginPath(),T.moveTo(Ve,1),T.lineTo(_e-Ve,1),T.lineTo(_e-1,Ve),T.lineTo(_e-1,ze-Ve),T.lineTo(_e-Ve,ze-1),T.lineTo(Ve,ze-1),T.lineTo(1,ze-Ve),T.lineTo(1,Ve),T.closePath()};fe(),T.fillStyle="rgba(2, 8, 13, 0.985)",T.fill();let Oe=T.createLinearGradient(0,0,_e,ze);Oe.addColorStop(0,"rgba(110, 220, 255, 0.075)"),Oe.addColorStop(.32,"rgba(8, 19, 28, 0.02)"),Oe.addColorStop(1,"rgba(232, 173, 98, 0.035)"),fe(),T.fillStyle=Oe,T.fill(),fe(),T.strokeStyle="rgba(110, 220, 255, 0.42)",T.lineWidth=2,T.stroke(),T.strokeStyle=se,T.lineWidth=2,T.beginPath(),T.moveTo(38,1),T.lineTo(Math.min(_e*.42,210),1),T.stroke(),T.strokeStyle="rgba(110, 220, 255, 0.18)",T.lineWidth=1,T.beginPath(),T.moveTo(26,92),T.lineTo(_e-26,92),T.moveTo(26,ze-35),T.lineTo(_e-26,ze-35),T.stroke();let He=(Un,cn,_n,bn,Kt=600)=>{let Yt=_n;do{if(T.font=`${Kt} ${Yt}px Inter, "Segoe UI", Arial, sans-serif`,T.measureText(String(Un)).width<=cn)break;Yt-=1}while(Yt>bn);return Yt};if(T.fillStyle=se,T.font='560 12px Inter, "Segoe UI", Arial, sans-serif',T.fillText(x.toUpperCase(),28,27),V){T.font='620 12px Inter, "Segoe UI", Arial, sans-serif';let Un=Math.max(74,T.measureText(V.toUpperCase()).width+24),cn=_e-28-Un;T.fillStyle="rgba(110, 220, 255, 0.07)",T.strokeStyle="rgba(110, 220, 255, 0.28)",T.beginPath(),T.roundRect(cn,13,Un,27,4),T.fill(),T.stroke(),T.fillStyle="#dff4ff",T.textAlign="center",T.fillText(V.toUpperCase(),cn+Un/2,32),T.textAlign="left"}let Te=_e-56;He(I,Te,30,18,610),T.fillStyle="#eef7f8",T.fillText(I,28,59),C&&(He(C,Te,14,11,480),T.fillStyle="rgba(169, 187, 194, 0.82)",T.fillText(C,28,80));let dt=105,wt=ze-42,Bt=Math.max(32,(wt-dt)/Math.max(Y.length,1));Y.forEach(([Un,cn],_n)=>{let bn=dt+Bt*_n;_n>0&&(T.strokeStyle="rgba(171, 212, 222, 0.10)",T.beginPath(),T.moveTo(28,bn),T.lineTo(_e-28,bn),T.stroke()),T.fillStyle=_n===0?se:"rgba(110, 220, 255, 0.48)",T.fillRect(28,bn+Bt/2-3,6,6),T.fillStyle="#8fa3ad",T.font='540 13px Inter, "Segoe UI", Arial, sans-serif',T.fillText(Un.toUpperCase(),46,bn+Bt/2+4),T.fillStyle=_n===0?se:"#eff8ff",He(cn,_e*.52,_n===0?24:20,13,_n===0?640:580),T.textAlign="right",T.fillText(cn,_e-28,bn+Bt/2+(_n===0?7:6)),T.textAlign="left"}),H&&(T.fillStyle="rgba(164, 183, 189, 0.72)",T.font='520 11px Inter, "Segoe UI", Arial, sans-serif',He(H.toUpperCase(),_e-148,11,9,520),T.fillText(H.toUpperCase(),28,ze-15)),Q&&(T.fillStyle="#72d9a4",T.beginPath(),T.arc(_e-94,ze-18,3,0,Math.PI*2),T.fill(),T.font='600 11px Inter, "Segoe UI", Arial, sans-serif',T.textAlign="right",T.fillText(Q.toUpperCase(),_e-28,ze-15),T.textAlign="left");let Wt=new ra(Le);Wt.colorSpace=Mt,Wt.anisotropy=B.capabilities.getMaxAnisotropy(),Wt.generateMipmaps=!1,Wt.minFilter=Ht,Wt.magFilter=Ht,Wt.needsUpdate=!0;let ei=new ta(new vr({map:Wt,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}));return ei.scale.set(_e/78*Ie,ze/78*Ie,1),ei}function Ii(x,I){return St.push({sprite:x,zone:I}),x}let rt=new Qt;W.add(rt);let oi=new Qt;oi.visible=!1,rt.add(oi),new hl(be).load("assets/performance-spatial/models/maintain_ops_concept_kit.glb",x=>{let I=x.scene;I.name="Blender concept architecture kit",I.position.set(0,-.04,0),I.traverse(C=>{if(!C.isMesh)return;let V=C.name.includes("kit_stage_")||C.name.includes("kit_floor_armor_plate"),Y=C.name.includes("kit_file_emitter_")||C.name.includes("kit_file_glass_shard_"),H=C.name.includes("kit_back_");if(C.name.includes("kit_perimeter_heat_fin")||C.name.includes("kit_side_reactor_tower")||V||Y||H){C.visible=!1;return}C.castShadow=!0,C.receiveShadow=!0,C.material&&(C.material.envMapIntensity=C.material.name.toLowerCase().includes("emissive")?.5:.9,C.material.emissiveIntensity&&(C.material.emissiveIntensity*=.72))}),rt.add(I)},void 0,x=>{console.warn("Blender concept kit failed to load",x)});let Ma=Z(rt,new At(18.6,19.6,.55,96),me(462873,{roughness:.36,metalness:.84,emissive:133389,emissiveIntensity:.12}),[0,-.28,.5]);Ma.receiveShadow=!0;let ns=Z(rt,new Ms(18.35,160),new jt({map:he,color:16777215,roughness:.46,metalness:.86,emissive:1454656,emissiveMap:he,emissiveIntensity:.18,clearcoat:.22,clearcoatRoughness:.5,side:$t}),[0,.015,.5],{shadow:!1});ns.rotation.x=-Math.PI/2,ns.receiveShadow=!0;let Rr=Z(rt,new Ms(18.28,160),new Pt({map:he,color:9431807,transparent:!0,opacity:.07,blending:Wn,depthWrite:!1,side:$t}),[0,.028,.5],{shadow:!1});Rr.rotation.x=-Math.PI/2,Rr.renderOrder=1,Z(rt,new At(19.6,16.8,1.6,96),me(396564,{roughness:.54,metalness:.72,emissive:66567,emissiveIntensity:.08}),[0,-1.35,.5]);function is(x,I,C,V,Y,H=.045){let Q=new la;Q.absarc(0,0,I,C,V,!1),Q.lineTo(Math.cos(V)*x,Math.sin(V)*x),Q.absarc(0,0,x,V,C,!0),Q.closePath();let se=Z(rt,new $o(Q,10),Y,[0,H,.5],{shadow:!1});return se.rotation.x=-Math.PI/2,se.renderOrder=2,se}let Sa=me(462872,{roughness:.5,metalness:.9,emissive:132874,emissiveIntensity:.06}),ba=me(727073,{roughness:.43,metalness:.88,emissive:200728,emissiveIntensity:.07});Z(rt,new At(2.12,2.12,.055,96),me(198926,{roughness:.55,metalness:.94,emissive:66565,emissiveIntensity:.04}),[0,.018,.5],{shadow:!1});for(let x=0;x<12;x+=1){let C=x/12*Math.PI*2+.022,V=(x+1)/12*Math.PI*2-.022;is(.72,2.02,C,V,x%2===0?Sa:ba,.052);let Y=C+(V-C)*.5,H=1.37,Q=J(rt,[.018,.018,1.14],[Math.cos(Y)*H,.058,Math.sin(Y)*H+.5],me(66567,{roughness:.58,metalness:.94,emissive:258,emissiveIntensity:.02}),{shadow:!1});Q.rotation.y=-Y;let se=Y,_e=1.78,ze=Z(rt,new At(.042,.042,.026,10),me(x%3===0?9201730:1714481,{roughness:.36,metalness:.94,emissive:x%3===0?Fe.amber:332827,emissiveIntensity:x%3===0?.08:.03}),[Math.cos(se)*_e,.077,Math.sin(se)*_e+.5],{shadow:!1});ze.renderOrder=4}let Sl=Z(rt,new At(.67,.7,.065,48),me(660507,{roughness:.38,metalness:.92,emissive:200728,emissiveIntensity:.07}),[0,.052,.5],{shadow:!1});Sl.receiveShadow=!0,[.69,1.12,1.98].forEach((x,I)=>{let C=Z(rt,new Gt(x,I===2?.025:.014,8,96),me(397336,{roughness:.48,metalness:.92,emissive:I===1?2381156:464928,emissiveIntensity:I===1?.1:.04}),[0,.072+I*.001,.5],{shadow:!1});C.rotation.x=Math.PI/2});for(let x=0;x<4;x+=1){let I=x*(Math.PI/2)+Math.PI/4,C=1.5,V=J(rt,[.055,.018,.34],[Math.cos(I)*C,.067,Math.sin(I)*C+.5],me(397336,{roughness:.48,metalness:.92,emissive:Fe.cyan,emissiveIntensity:.16}),{shadow:!1});V.rotation.y=-I}let bl=[new Pt({color:1782852,transparent:!0,opacity:.2,depthWrite:!1}),new Pt({color:793382,transparent:!0,opacity:.28,depthWrite:!1})];[{inner:2.15,outer:5.1,count:8,offset:.05},{inner:5.55,outer:9.9,count:12,offset:.18},{inner:10.35,outer:14.65,count:16,offset:.08},{inner:15.1,outer:17.95,count:20,offset:0}].forEach((x,I)=>{for(let C=0;C<x.count;C+=1){let Y=x.offset+C/x.count*Math.PI*2+.012,H=x.offset+(C+1)/x.count*Math.PI*2-.012;is(x.inner,x.outer,Y,H,bl[(C+I)%2],.035+I*.002);let Q=x.offset+C/x.count*Math.PI*2,se=(x.inner+x.outer)*.5,_e=x.outer-x.inner-.18,ze=J(rt,[.026,.032,_e],[Math.cos(Q)*se,.052+I*.002,Math.sin(Q)*se+.5],me(132875,{roughness:.46,metalness:.92,emissive:133132,emissiveIntensity:.06}),{shadow:!1});if(ze.rotation.y=-Q,ze.renderOrder=4,C%Math.max(2,Math.floor(x.count/6))===0){let Ie=J(rt,[.018,.04,_e*.5],[Math.cos(Q+.012)*se,.018+I*.001,Math.sin(Q+.012)*se+.5],me(463642,{roughness:.48,metalness:.92,emissive:Fe.cyan,emissiveIntensity:.045}),{shadow:!1});Ie.rotation.y=-Q}}});let wl=Z(rt,new At(18.72,18.58,.18,160,1,!0),me(198669,{roughness:.42,metalness:.9,emissive:200726,emissiveIntensity:.12}),[0,.06,.5],{shadow:!1});wl.renderOrder=1;let E=Z(rt,new At(14.9,14.75,.08,144,1,!0),me(462872,{roughness:.5,metalness:.82,emissive:200726,emissiveIntensity:.08}),[0,.075,.5],{shadow:!1});E.renderOrder=1;let k=Z(rt,new Gt(18.45,.01,10,160),me(463642,{roughness:.48,metalness:.9,emissive:Fe.cyan,emissiveIntensity:.06}),[0,.02,.5],{shadow:!1});k.rotation.x=Math.PI/2;let q=Z(rt,new Gt(19.3,.045,10,128),O(2845298,.28),[0,-.9,.5],{shadow:!1});q.rotation.x=Math.PI/2,[2.15,5.1,5.55,9.9,10.35,14.65,15.1,17.95].forEach((x,I)=>{let C=Z(rt,new Gt(x,.012,8,160),me(66824,{roughness:.52,metalness:.9,emissive:515,emissiveIntensity:.025}),[0,.028+I*8e-4,.5],{shadow:!1});C.rotation.x=Math.PI/2,C.renderOrder=2;let V=Z(rt,new Gt(x+.03,.0035,8,128),me(397336,{roughness:.52,metalness:.88,emissive:2845298,emissiveIntensity:I%3===0?.05:.03}),[0,.018+I*6e-4,.5],{shadow:!1});V.rotation.x=Math.PI/2});for(let x=0;x<16;x+=1){let I=x/16*Math.PI*2,C=9.4,V=16.2,Y=Math.sin(I)*C,H=Math.cos(I)*C+.5,Q=J(rt,[.028,.024,V],[Y,.038,H],me(528922,{roughness:.48,metalness:.92,emissive:133132,emissiveIntensity:.035}),{shadow:!1});Q.rotation.y=I,Q.renderOrder=3}for(let x=0;x<32;x+=1){let I=x/32*Math.PI*2,C=x%2?17:15.35,V=Math.cos(I)*C,Y=Math.sin(I)*C+.5,H=J(rt,[x%4===0?.08:.055,.035,x%4===0?.82:.48],[V,.038,Y],me(463642,{roughness:.46,metalness:.9,emissive:x%5===0?Fe.amber:Fe.cyan,emissiveIntensity:x%5===0?.12:.08}),{shadow:!1});H.rotation.y=-I}[2,3,5.5,8.2,12.2].forEach((x,I)=>{let C=Z(rt,new Gt(x,.009,8,96,Math.PI*(I%2?.42:.58)),me(397336,{roughness:.52,metalness:.9,emissive:I%2?Fe.cyan:Fe.teal,emissiveIntensity:.035}),[0,.018+I*8e-4,.5],{shadow:!1});C.rotation.x=Math.PI/2,C.rotation.z=I*1.17}),[5.8,10.8,15.6].forEach((x,I)=>{let C=Z(rt,new Gt(x,.012,12,160),me(397336,{roughness:.52,metalness:.9,emissive:I===1?Fe.teal:Fe.cyan,emissiveIntensity:I===1?.06:.045}),[0,.016+I*.001,.5],{shadow:!1});C.rotation.x=Math.PI/2});for(let x=0;x<12;x+=1){let I=x/12*Math.PI*2,C=16.2+x%2*.75,V=Math.cos(I)*C,Y=Math.sin(I)*C+.5,H=J(rt,[1.45,.045,.28],[V,.12,Y],me(x%2===0?725787:462872,{roughness:.52,metalness:.72,emissive:266264,emissiveIntensity:.08}),{shadow:!1});H.rotation.y=-I}for(let x=0;x<26;x+=1){let I=x/26*Math.PI*2,C=18.1+x%2*.5,V=Math.cos(I)*C,Y=Math.sin(I)*C+.5,H=.5+x%5*.18,Q=J(rt,[.12,H,.48],[V,.42+H/2,Y],me(463130,{roughness:.32,metalness:.7,emissive:533295,emissiveIntensity:.32}),{shadow:!1});if(Q.rotation.y=-I,x%3===0){let se=J(rt,[.045,H*.72,.06],[V,.52+H/2,Y],O(x%2?Fe.blue:Fe.cyan,.52),{shadow:!1});se.rotation.y=-I,se.userData.kind="rail",se.userData.phase=x*.27,st.push(se)}}let $=pi({title:"System Status",rows:[["Platform core","Current"],["Process stream","Sampled"]],footer:"Company-scoped view",accent:"#89d9aa",width:250,height:150,scale:.62});$.position.set(-15.3,8.1,-13.8),oi.add($);let X=pi({title:"Platform Health",rows:[["Data scope","Company"],["Sample window","Current"],["Access","Member"]],accent:"#72d1c6",width:300,height:190,scale:.72});X.position.set(15.4,7.6,-13.2),oi.add(X);let de=new Qt;de.position.set(0,3.5,-12.2),oi.add(de);let we=Z(de,new Gt(1.18,.08,12,96),O(Fe.cyan,1.05),[0,0,0],{shadow:!1});we.userData.kind="rail",we.userData.phase=2.4,st.push(we),Z(de,new Ms(.84,48),new Pt({color:529956,transparent:!0,opacity:.88}),[0,0,0],{shadow:!1});let Re=Dn([P?.[1]||"APP","HEALTH"],{accent:"#dff4ff",scale:.52});Re.position.set(0,0,.02),de.add(Re);let ge=new Qt;ge.position.set(-8.3,0,-7.1),rt.add(ge);{Z(ge,new At(3.1,3.3,.28,48),me(Fe.steelDark,{roughness:.4}),[0,.14,0]);let x=Z(ge,new Gt(2.95,.05,10,96),O(Fe.cyan,1),[0,.3,0],{shadow:!1});x.rotation.x=Math.PI/2;let I=me(198669,{roughness:.34,metalness:.96,emissive:202784,emissiveIntensity:.24}),C=me(463386,{roughness:.3,metalness:.9,emissive:670020,emissiveIntensity:.42}),V={assembled:{x:.61,y:.02,w:.37,h:.37},final:{x:.365,y:.64,w:.245,h:.31},glassLeft:{x:0,y:0,w:.15,h:.19},glassRight:{x:.15,y:0,w:.15,h:.19},topCap:{x:.738,y:0,w:.145,h:.09},coreRing:{x:.47,y:.02,w:.13,h:.13}};[{y:.82,r1:1.42,r2:1.78,h:.18},{y:5.98,r1:1.78,r2:1.42,h:.18},{y:.62,r1:1.9,r2:2.18,h:.12},{y:6.18,r1:2.18,r2:1.9,h:.12}].forEach(({y:Le,r1:T,r2:Ve,h:fe})=>{if(Le<3){let Te=Z(ge,new At(T,Ve,fe,72),I.clone(),[0,Le,0],{shadow:!1});Te.userData.kind="pulse",Te.userData.phase=Le,st.push(Te)}let Oe=Le>3,He=Z(ge,new Gt((T+Ve)*.5,Oe?.012:.018,8,96),Oe?me(463128,{roughness:.36,metalness:.94,emissive:Fe.cyan,emissiveIntensity:.08}):O(Fe.cyan,.42),[0,Le+fe*.52,0],{shadow:!1});He.rotation.x=Math.PI/2,He.userData.kind="gyro",He.userData.speed=Le>3?-.06:.08,st.push(He)});let Y=Ze(ge,[5.45,5.45],[0,3.45,.18],We(V.assembled,{atlas:ne,color:12118256,opacity:.2}));Y.renderOrder=5;let H=Ze(ge,[3.2,4.05],[0,3.28,.28],We(V.final,{atlas:ne,color:8378600,opacity:.14}));H.renderOrder=4,[.58,.98,1.32].forEach((Le,T)=>{let Ve=Z(ge,new Gt(Le,T===1?.014:.01,8,96),me(330512,{roughness:.32,metalness:.96,emissive:T===1?Fe.amber:Fe.cyan,emissiveIntensity:T===1?.08:.12}),[0,6.36+T*.04,0],{shadow:!1});Ve.rotation.x=Math.PI/2,Ve.userData.kind="gyro",Ve.userData.speed=T===1?-.04:.05,st.push(Ve)});let Q=Ze(ge,[2.4,2.4],[0,.58,.02],We(V.coreRing,{atlas:ne,color:12449791,opacity:.18}),[-Math.PI/2,0,0]);Q.renderOrder=6,[-1,1].forEach(Le=>{let T=Ze(ge,[2.2,2.75],[Le*1.08,3.7,.34],We(Le<0?V.glassLeft:V.glassRight,{atlas:ne,color:10282736,opacity:.12}));T.rotation.z=Le*.04,T.renderOrder=3}),[0,Math.PI/2,Math.PI,Math.PI*1.5].forEach((Le,T)=>{let Ve=Math.cos(Le)*1.62,fe=Math.sin(Le)*1.62,Oe=Z(ge,new At(.055,.055,5.18,14),C.clone(),[Ve,3.4,fe],{shadow:!1});Oe.userData.kind="pulse",Oe.userData.phase=T*.6,st.push(Oe);let He=Z(ge,new At(.02,.02,4.76,10),O(Fe.cyan,.55),[Ve*1.02,3.4,fe*1.02],{shadow:!1});He.userData.kind="pulse",He.userData.phase=T*.6+.3,st.push(He)});let se=Z(ge,new bs(2.55,48,32),new jt({color:10474728,transparent:!0,opacity:.055,roughness:.22,metalness:0,emissive:862259,emissiveIntensity:.16,depthWrite:!1}),[0,3.4,0],{shadow:!1});[0,Math.PI/2,Math.PI,Math.PI*1.5].forEach(Le=>{let T=Math.cos(Le)*1.08,Ve=Math.sin(Le)*1.08,fe=Z(ge,new At(.024,.024,.62,8),I.clone(),[T,6.07,Ve],{shadow:!1});fe.userData.kind="pulse",fe.userData.phase=Le,st.push(fe)}),Ln(se,{type:"vault",focusRadius:3.6,ringY:.34,tooltip:["App Health","Measured browser experience and app reliability"],platformTooltip:[l.title||"App Health",l.tooltip||l.badge||"Measured company app health"]});let _e=new Xt(new qo(2.62,1),new Pt({color:3107446,wireframe:!0,transparent:!0,opacity:.18}));_e.position.set(0,3.4,0),_e.userData.kind="coreCage",_e.userData.phase=.4,ge.add(_e),st.push(_e);let ze=Z(ge,new bs(.42,24,16),O(Fe.cyan,1.9),[0,3.4,0],{shadow:!1});ze.userData.kind="corePulse",ze.userData.phase=0,st.push(ze);let Ie=Z(ge,new At(.05,.09,3,12),new Pt({color:7265535,transparent:!0,opacity:.35,blending:Wn,depthWrite:!1}),[0,1.85,0],{shadow:!1});Ie.renderOrder=1,Ie.userData.kind="coreBeam",Ie.userData.baseOpacity=.22,st.push(Ie),[{radius:2.72,tube:.07,rotation:[Math.PI/2,0,0],speed:.35,color:Fe.cyan,intensity:.78},{radius:2.96,tube:.045,rotation:[Math.PI/2.25,0,Math.PI/9],speed:-.22,color:Fe.amber,intensity:.42},{radius:3.16,tube:.045,rotation:[Math.PI/3,0,Math.PI/7],speed:-.18,color:Fe.cyan,intensity:.62},{radius:3.36,tube:.035,rotation:[-Math.PI/4,Math.PI/6,0],speed:.16,color:Fe.blue,intensity:.5}].forEach(({radius:Le,tube:T,rotation:Ve,speed:fe,color:Oe,intensity:He},Te)=>{let dt=new Qt,wt=Math.max(.024,T*.52),Bt=wt*1.7;dt.position.set(0,3.4,0),ge.add(dt),Z(dt,new Gt(Le,wt,14,160),new jt({color:1121314,metalness:.96,roughness:.2,clearcoat:.72,clearcoatRoughness:.16,emissive:Oe,emissiveIntensity:.07}),[0,0,0],{shadow:!1}),Z(dt,new Gt(Le-Bt,.007,8,160),O(Oe,He*.58),[0,0,0],{shadow:!1}),Z(dt,new Gt(Le+Bt,.006,8,160),O(Oe,He*.42),[0,0,0],{shadow:!1});let Wt=8,ei=new ya(.2,.07,Math.max(.055,wt*2.2),3,.014),Un=me(5464682,{roughness:.24,metalness:.98,emissive:Oe,emissiveIntensity:.18}),cn=new vs(ei,Un,Wt),_n=new je,bn=new A,Kt=new Pn,Yt=new A(1,1,1);for(let Rn=0;Rn<Wt;Rn+=1){let kn=Rn/Wt*Math.PI*2;bn.set(Math.cos(kn)*Le,Math.sin(kn)*Le,0),Kt.setFromEuler(new qn(0,0,kn+Math.PI/2)),_n.compose(bn,Kt,Yt),cn.setMatrixAt(Rn,_n)}cn.instanceMatrix.needsUpdate=!0,cn.castShadow=!1,cn.receiveShadow=!1,dt.add(cn),dt.rotation.set(...Ve),dt.userData.kind="coreGyro",dt.userData.speed=fe,dt.userData.phase=Te,[0,Math.PI*.92].forEach((Rn,kn)=>{let rs=Z(dt,new Gt(Le,wt*1.25,6,28,kn?.18:.48),O(kn?Fe.amber:Oe,1.3),[0,0,0],{shadow:!1});rs.rotation.z=Rn}),st.push(dt)}),[{radius:2.76,speed:.16,phase:0,lift:.24,color:Fe.cyan},{radius:3.02,speed:-.11,phase:2.1,lift:-.18,color:Fe.amber},{radius:3.24,speed:.08,phase:4.2,lift:.06,color:Fe.blue}].forEach(Le=>{let T=Z(ge,new bs(.075,12,8),O(Le.color,1.05),[Le.radius,3.4+Le.lift,0],{shadow:!1});T.userData.kind="coreSatellite",Object.assign(T.userData,Le),st.push(T)});let gt=new Zi(7265535,18,13,2);gt.position.set(0,3.4,0),gt.userData.kind="coreLight",gt.userData.baseIntensity=18,ge.add(gt),st.push(gt)}let Ye=[Fe.cyan,Fe.teal,Fe.blue,Fe.mint,Fe.cyan],Xe=[];{let x={shellA:{x:.018,y:.055,w:.105,h:.58},shellB:{x:.135,y:.055,w:.098,h:.58},shellC:{x:.246,y:.055,w:.102,h:.58},shellD:{x:.424,y:.014,w:.062,h:.414},shellE:{x:.505,y:.014,w:.062,h:.414},lightRail:{x:.424,y:.014,w:.062,h:.414},capTop:{x:.68,y:.018,w:.29,h:.29},capRing:{x:.68,y:.35,w:.29,h:.29},baseStrip:{x:.02,y:.782,w:.31,h:.072},vent:{x:.509,y:.47,w:.056,h:.174}};i.forEach((I,C)=>{let V=-3.8+C*3.05,Y=Cv,H=Ye[C%Ye.length],Q=new Qt;Q.position.set(V,0,-8.15),rt.add(Q),Z(Q,new At(1.12,1.26,.2,36),me(Fe.steelDark,{roughness:.38}),[0,.1,0]);let se=Z(Q,new Gt(.98,.035,10,64),O(H,1),[0,.22,0],{shadow:!1});se.rotation.x=Math.PI/2;let _e=.32+Y/2,ze=Math.max(.8,Y*.9),Ie=Z(Q,new At(.755,.755,ze+.12,56,1,!0),me(132875,{roughness:.52,metalness:.94,emissive:67338,emissiveIntensity:.08}),[0,_e,0],{shadow:!1});Ie.userData.kind="closedSiloSkin",[{rect:x.shellA,angle:-.48,w:.44,lift:0},{rect:x.shellB,angle:0,w:.48,lift:.02},{rect:x.shellC,angle:.48,w:.44,lift:0},{rect:x.shellD,angle:-.88,w:.26,lift:.02},{rect:x.shellE,angle:.88,w:.26,lift:.02}].forEach((wt,Bt)=>{let Wt=Dt(Q,wt.rect,{angle:wt.angle,radius:.785,y:_e+wt.lift,width:wt.w,height:ze,atlas:$e,emissive:H,emissiveIntensity:Bt===1?.18:.14});Wt.userData.kind="closedSiloSkin"}),[{y:_e+ze/2+.02,h:.16,rTop:.86,rBottom:.82},{y:_e-ze/2-.02,h:.16,rTop:.82,rBottom:.9}].forEach(({y:wt,h:Bt,rTop:Wt,rBottom:ei})=>{let Un=Z(Q,new At(Wt,ei,Bt,56),me(198669,{roughness:.38,metalness:.94,emissive:135190,emissiveIntensity:.14}),[0,wt,0],{shadow:!1});Un.userData.kind="closedSiloSkin";let cn=Z(Q,new Gt((Wt+ei)*.5,.011,8,72),O(H,.36),[0,wt+Bt*.5+.006,0],{shadow:!1});cn.rotation.x=Math.PI/2,cn.userData.kind="closedSiloSkin"}),[-.72,-.24,.24,.72].forEach((wt,Bt)=>{let Wt=Dt(Q,Bt%2?x.vent:x.baseStrip,{angle:wt,radius:.835,y:_e,width:.08,height:ze+.06,atlas:$e,emissive:Bt%2?H:Fe.amber,emissiveIntensity:Bt%2?.26:.16,trim:!0});Wt.userData.kind="closedSiloSkin"}),[-1.12,1.12].forEach((wt,Bt)=>{let Wt=Dt(Q,x.lightRail,{angle:wt,radius:.81,y:_e,width:.16,height:ze*.88,atlas:$e,emissive:H,emissiveIntensity:.38});Wt.userData.kind="closedSiloSkin";let ei=Dt(Q,Bt?x.vent:x.baseStrip,{angle:wt,radius:.825,y:.44+Y*.16,width:.2,height:.38,atlas:$e,emissive:Fe.amber,emissiveIntensity:.18,trim:!1});ei.userData.kind="closedSiloSkin"});let gt=Z(Q,new At(.74,.74,Y,32),new jt({color:13625842,transparent:!0,opacity:.08,roughness:.08,metalness:0,emissive:1323580,emissiveIntensity:.24,depthWrite:!1}),[0,.32+Y/2,0],{shadow:!1});Ln(gt,{type:"bucket",bucket:I,index:C,color:H,revealHeight:Y,focusRadius:1.5,ringY:.28,tooltip:[I.title,`${I.valueLabel||o(I.size)} \xB7 ${I.files} ${I.itemLabel||(I.files===1?"signal":"signals")}`]});let Le=Z(Q,new At(.13,.16,Math.max(.2,Y-.52),24),new Pt({color:H,transparent:!0,opacity:.2,blending:Wn,depthWrite:!1}),[0,.32+Y/2,0],{shadow:!1});Le.userData.kind="pulse",Le.userData.phase=C*.7,st.push(Le);let Ve=_e+ze/2+.02+.08+.065,fe=Z(Q,new At(.86,.9,.13,40),me(462872,{roughness:.42,metalness:.82,emissive:400162,emissiveIntensity:.22}),[0,Ve,0],{shadow:!1});fe.userData.kind="closedSiloSkin";let Oe=Z(Q,new Ms(.76,56),ue(C%2?x.capRing:x.capTop,{atlas:$e,emissive:H,emissiveIntensity:.18,metalness:.82,roughness:.36,side:$t}),[0,Ve+.071,0],{shadow:!1});Oe.rotation.x=-Math.PI/2,Oe.userData.kind="closedSiloSkin";let He=Ze(Q,[1.36,.24],[0,.28,.78],ue(x.baseStrip,{atlas:$e,emissive:H,emissiveIntensity:.18,metalness:.82,roughness:.36,side:$t}));He.userData.kind="closedSiloSkin";let Te=Z(Q,new Gt(1,.02,8,64),O(H,.85),[0,.32+Y*.72,0],{shadow:!1});Te.rotation.x=Math.PI/2,Te.userData.kind="spin",Te.userData.speed=.5+C*.12,st.push(Te);let dt=Z(Q,new At(.82,.82,.09,24),new Pt({color:H,transparent:!0,opacity:.24,blending:Wn,depthWrite:!1}),[0,.58+Y*.46,0],{shadow:!1});dt.userData.kind="scanBand",dt.userData.phase=C*.65,dt.userData.baseY=dt.position.y,dt.userData.span=Y*.42,st.push(dt),Xe.push(gt)})}let ke=Xe.map((x,I)=>{let C=x.parent.position.x,V=-4+I*.19;return new oa([new A(-8.3,.055,-4.3),new A(-6,.055,V),new A(C-.45,.055,V),new A(C,.055,-6.9)])});ke.forEach((x,I)=>{let C=new qi(new Ot().setFromPoints(x.getPoints(64)),new Xi({color:Ye[I],transparent:!0,opacity:.24}));rt.add(C)});let ut=new vs(new hi(.32,.018,.055),new Pt({color:Fe.cyan,transparent:!0,opacity:.64,toneMapped:!1}),ke.length*3);ut.instanceMatrix.setUsage(Df),ut.frustumCulled=!1,rt.add(ut);let Ut=new je,Nt=new A,pn=new A,xt=new Pn,Ue=new A(1,1,1),nn=new A(1,0,0),vt=[],mn=[];{let x={"Equipment files":Fe.blue,"Order throughput":Fe.teal,"Request photos":Fe.mint,"Part files":Fe.blue,"Company logos":Fe.cyan},I={tops:[{x:.015,y:.016,w:.313,h:.307},{x:.344,y:.016,w:.312,h:.307},{x:.671,y:.016,w:.312,h:.307}],faces:[{x:.015,y:.016,w:.313,h:.307},{x:.344,y:.016,w:.312,h:.307},{x:.671,y:.016,w:.312,h:.307},{x:.015,y:.344,w:.313,h:.313},{x:.344,y:.344,w:.312,h:.313},{x:.671,y:.344,w:.312,h:.313}],sides:[{x:.018,y:.687,w:.382,h:.055},{x:.018,y:.748,w:.382,h:.055},{x:.418,y:.688,w:.032,h:.19},{x:.61,y:.688,w:.032,h:.19},{x:.75,y:.688,w:.045,h:.19}],rails:[{x:.018,y:.687,w:.382,h:.055},{x:.018,y:.748,w:.382,h:.055},{x:.017,y:.823,w:.382,h:.044}]};a.slice(0,10).forEach((C,V)=>{let Y=V,H=0,Q=Y-4.5,se=Q*2.24,_e=5.95+Math.abs(Q)*.06,ze=.82,Ie=.72+Math.min(C.size/(2.1*1024*1024),1)*.32,gt=x[C.bucket]??Fe.cyan;Z(rt,new At(.54,.62,.08,28),me(Fe.steelDark,{roughness:.46,emissive:266520,emissiveIntensity:.1}),[se,.04,_e]);let Le=Z(rt,new Gt(.48,.014,8,56),me(397336,{roughness:.46,metalness:.9,emissive:gt,emissiveIntensity:.24}),[se,.09,_e],{shadow:!1});Le.rotation.x=Math.PI/2;let T=J(rt,[Ie+.46,1.16,.68],[se,ze,_e],new jt({color:329997,roughness:.23,metalness:.92,emissive:133389,emissiveIntensity:.22,clearcoat:.55,clearcoatRoughness:.26}));T.rotation.y=-Q*.035,T.userData.bob=.012,Ln(T,{type:"file",file:C,index:V,focusRadius:.95,ringY:.16,tooltip:[C.equipment,`${C.name} \xB7 ${C.valueLabel||o(C.size)}`]});let Ve=new Mr(new Xo(new hi(Ie+.49,1.19,.72)),new Xi({color:Fe.mint,transparent:!0,opacity:0,toneMapped:!1}));T.add(Ve),T.userData.selectionOutline=Ve;let fe=.38,Oe=-.38,He=me(659220,{roughness:.3,metalness:.92,emissive:133131,emissiveIntensity:.22}),Te=me(198411,{roughness:.42,metalness:.94,emissive:66308,emissiveIntensity:.1}),dt=me(462872,{roughness:.36,metalness:.88,emissive:133390,emissiveIntensity:.18}),wt=new jt({color:200729,transparent:!0,opacity:.8,roughness:.05,metalness:.35,emissive:339006,emissiveIntensity:1.05,clearcoat:.8,clearcoatRoughness:.08,depthWrite:!1});[[0,.53,fe+.015,Ie*.96,.12],[0,-.53,fe+.015,Ie*.96,.12],[-Ie*.58,0,fe+.016,.12,.86],[Ie*.58,0,fe+.016,.12,.86]].forEach(([Kt,Yt,Rn,kn,rs])=>{J(T,[kn,rs,.09],[Kt,Yt,Rn],He,{shadow:!1})});let Bt=J(T,[Ie+.04,1,.045],[.05,0,fe+.044],wt,{shadow:!1});Bt.renderOrder=2;let Wt=I.faces[V%I.faces.length],ei=I.sides[V%I.sides.length],Un=I.tops[(V+H)%I.tops.length],cn=I.rails[V%I.rails.length],_n=(Ie+.46)/2+.014,bn=1.16/2+.01;[[-1,1],[1,1],[-1,-1],[1,-1]].forEach(([Kt,Yt])=>{J(T,[.18,1.12,.16],[Kt*_n,0,Yt*.31],Te,{shadow:!1})}),[[0,bn,.31,Ie+.2,.09,.12],[0,-bn,.31,Ie+.2,.09,.12],[0,bn,-.31,Ie+.14,.09,.12],[0,-bn,-.31,Ie+.14,.09,.12]].forEach(([Kt,Yt,Rn,kn,rs,Rp])=>{J(T,[kn,rs,Rp],[Kt,Yt,Rn],Te,{shadow:!1})}),Ze(T,[Ie+.02,.96],[0,0,fe+.126],ue(Wt,{emissiveIntensity:.42})),Ze(T,[Ie+.04,.98],[0,0,Oe-.011],ue(I.faces[(V+3)%I.faces.length],{emissiveIntensity:.22}),[0,Math.PI,0]),Ze(T,[.58,.94],[_n,0,0],ue(ei,{emissiveIntensity:.18}),[0,Math.PI/2,0]),Ze(T,[.58,.94],[-_n,0,0],ue(I.sides[(V+1)%I.sides.length],{emissiveIntensity:.16}),[0,-Math.PI/2,0]),Ze(T,[Ie+.08,.66],[0,.592,0],ue(Un,{emissiveIntensity:.32}),[-Math.PI/2,0,0]),Ze(T,[Ie+.02,.62],[0,-.592,0],ue(cn,{emissiveIntensity:.25}),[Math.PI/2,0,0]),[[0,.46,fe+.15,Ie*.7,.036],[0,-.46,fe+.15,Ie*.7,.036],[-Ie*.49,0,fe+.152,.036,.66],[Ie*.49,0,fe+.152,.036,.66]].forEach(([Kt,Yt,Rn,kn,rs])=>{J(T,[kn,rs,.028],[Kt,Yt,Rn],O(gt,1.35),{shadow:!1})}),[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([Kt,Yt],Rn)=>{J(T,[.2,.2,.105],[Kt*(Ie*.54),Yt*.44,fe+.145],dt,{shadow:!1}),J(T,[.052,.052,.034],[Kt*(Ie*.54),Yt*.44,fe+.205],O(Rn%2?Fe.blue:Fe.cyan,.9),{shadow:!1})}),[-.39,.39].forEach((Kt,Yt)=>{J(T,[Ie*.9,.07,.09],[0,Kt,Oe-.02],me(329740,{roughness:.38,metalness:.9,emissive:133133,emissiveIntensity:.18}),{shadow:!1}),J(T,[Ie*.26,.034,.058],[Yt?Ie*.24:-Ie*.26,Kt,Oe-.075],O(gt,.9),{shadow:!1})}),[[-Ie*.53,-.08],[Ie*.54,.18],[Ie*.02,.49]].forEach(([Kt,Yt])=>{J(T,[.04,.13,.04],[Kt,Yt,fe+.12],O(Fe.amber,.78),{shadow:!1})}),mn.push(T)})}let mi=R.filter(([x])=>["Data stored","Records monitored"].includes(x)),gn=pi({title:"Data Footprint",rows:mi.length?mi:[["Data stored","Pending"],["Records monitored","Pending"]],accent:"#72d1c6",width:330,height:180,scale:.72});gn.position.set(-14.8,-.3,14.2),oi.add(gn);let Rs=pi({title:"Process Today",rows:c.map(x=>[x.label,x.value]),accent:"#6edcff",width:330,height:180,scale:.72});Rs.position.set(14.6,-.3,14.2),oi.add(Rs),W.add(new jo(10472672,463131,.56));let zt=new Ji(11850980,.34);zt.position.set(4,7,22),W.add(zt),z=new Ji(13756664,1.35),z.position.set(-10,18,12),z.castShadow=!0,z.shadow.mapSize.set(G.shadowSize,G.shadowSize),z.shadow.camera.left=-26,z.shadow.camera.right=26,z.shadow.camera.top=26,z.shadow.camera.bottom=-26,z.shadow.bias=-4e-4,W.add(z);let Qn=new Ji(8220927,.72);Qn.position.set(14,9,-14),W.add(Qn);let Cs=new Zi(9034154,7.5,13,2);Cs.position.set(0,3.1,6.6),W.add(Cs);let Sn=new Zi(6277592,11,18,2);Sn.position.set(1,5.4,-3.6),W.add(Sn);function Ps(x,I){let C=new Xt(new Yo(.86,1,56),new Pt({color:x,transparent:!0,opacity:I,side:$t,depthWrite:!1}));return C.rotation.x=-Math.PI/2,C.visible=!1,rt.add(C),C}let ss=Ps(7265535,.9),Cr=Ps(12576494,.4),fn=null;function Au(x,I){let C=I.userData.payload,V=new A;I.getWorldPosition(V),x.position.set(V.x,C.ringY??.05,V.z);let Y=C.focusRadius??1;x.scale.set(Y,Y,1),x.visible=!0}function hp(x){let I=st.indexOf(x);I>=0&&st.splice(I,1)}function El(){if(!fn)return;(fn.userData.restoreColumnState??[]).forEach(V=>{V.object.visible=V.visible,V.materials.forEach(Y=>{Y.material.transparent=Y.transparent,Y.material.opacity=Y.opacity,Y.material.depthWrite=Y.depthWrite})});let x=new Set,I=new Set,C=new Set;fn.traverse(V=>{hp(V),V.geometry&&!V.isSprite&&x.add(V.geometry),Pu(V).forEach(({material:Y})=>{I.add(Y),Y.map&&C.add(Y.map),Y.emissiveMap&&C.add(Y.emissiveMap)})}),x.forEach(V=>V.dispose()),I.forEach(V=>V.dispose()),C.forEach(V=>V.dispose()),rt.remove(fn),fn=null}function Ru(x,I,C,V,Y){let H=pi(I);H.position.set(0,C,Y),H.material.opacity=0,H.renderOrder=80,jn(H,"bucketRevealCard",{born:mt.elapsedTime,baseY:C,targetY:V,targetScale:H.scale.clone()}),x.add(H),x.userData.card=H,x.userData.cardData=I,y(I)}function up(x){let I=fn?.userData.card;if(!I)return;let C={...fn.userData.cardData,...x,title:x.title||x.name},V=pi(C);I.material.map.dispose(),I.material.map=V.material.map,V.material.dispose(),fn.userData.cardData=C,y(C)}function Cu(){let x=fn?.userData.card;if(!x)return null;let I=x.getWorldPosition(new A),C=-I.clone().applyMatrix4(ie.matrixWorldInverse).z;if(C<=0)return null;I.project(ie);let V=window.innerHeight/(2*Math.tan(dn.degToRad(ie.fov)/2)*C),Y=(I.x+1)*window.innerWidth/2,H=(1-I.y)*window.innerHeight/2,Q=x.scale.x*V,se=x.scale.y*V;return{x:Y,y:H,width:Q,height:se,left:Y-Q/2,right:Y+Q/2,top:H-se/2,bottom:H+se/2}}function Pu(x){return(Array.isArray(x.material)?x.material:x.material?[x.material]:[]).map(C=>({material:C,transparent:C.transparent,opacity:C.opacity,depthWrite:C.depthWrite}))}function dp(x,I){(Array.isArray(x.material)?x.material:x.material?[x.material]:[]).forEach(V=>{V.transparent=!0,V.opacity=I,V.depthWrite=!1})}function Iu(x,I){x.traverse(C=>{(Array.isArray(C.material)?C.material:C.material?[C.material]:[]).forEach(I)})}function wa(x,I){Iu(x,C=>{C.transparent=!0,C.opacity=I,C.depthWrite=!1})}function Lu(x,I){Iu(x,C=>{"emissiveIntensity"in C&&(C.emissiveIntensity=I)})}function fp(x,I){let C=[],V=x.parent;V&&(V.traverse(Y=>{let H=Y.userData.kind==="closedSiloSkin",Q=Y===x||Y.userData.kind==="scanBand"||Y.userData.kind==="pulse";if(!(!H&&!Q)){if(C.push({object:Y,visible:Y.visible,materials:Pu(Y)}),H){Y.visible=!1;return}dp(Y,Y===x?.025:.06)}}),I.userData.restoreColumnState=C)}function jn(x,I,C={}){return x.userData.kind=I,Object.assign(x.userData,C),"baseOpacity"in C&&wa(x,C.baseOpacity),I==="bucketRevealDoor"&&wa(x,C.baseOpacity??0),st.push(x),x}function pp(x,I){El();let C=new A;x.getWorldPosition(C);let V=I.bucket,Y=I.color??Fe.cyan,H=I.revealHeight??2.5,Q=mt.elapsedTime,se=new Qt;se.position.set(C.x,0,C.z),rt.add(se),fn=se,fp(x,se);let _e={chamber:{x:.337,y:.014,w:.314,h:.557},closed:{x:.012,y:.014,w:.31,h:.327},leftDoor:{x:.012,y:.348,w:.31,h:.226},rightDoor:{x:.671,y:.014,w:.314,h:.327},tallRail:{x:.012,y:.586,w:.094,h:.293},curvedWingA:{x:.313,y:.588,w:.104,h:.246},curvedWingB:{x:.424,y:.588,w:.104,h:.246},curvedWingC:{x:.535,y:.588,w:.104,h:.246},roundCap:{x:.716,y:.604,w:.228,h:.228}},ze=me(198411,{roughness:.4,metalness:.94,emissive:133389,emissiveIntensity:.14}),Ie=ue(_e.chamber,{atlas:Ge,emissive:Y,emissiveIntensity:.22,metalness:.64,roughness:.38,side:$t,opacity:.92}),gt=Ze(se,[1.7,H*.98],[0,.36+H/2,-.22],Ie,[0,0,0]);gt.renderOrder=2,jn(gt,"bucketRevealPanel",{born:Q,baseOpacity:0,targetOpacity:1,delay:.05});let Le=Z(se,new At(.9,.98,.12,40),ze,[0,.66+H,-.02],{shadow:!1});jn(Le,"bucketRevealPanel",{born:Q,baseOpacity:.2,targetOpacity:1,delay:.02});let T=Z(se,new At(.92,1.02,.14,40),ze.clone(),[0,.28,-.02],{shadow:!1});jn(T,"bucketRevealPanel",{born:Q,baseOpacity:.2,targetOpacity:1,delay:.02}),[{y:.57+H,w:1.58,h:.14,z:.31,delay:.04},{y:.38,w:1.66,h:.14,z:.33,delay:.07}].forEach(({y:fe,w:Oe,h:He,z:Te,delay:dt})=>{let wt=J(se,[Oe,He,.18],[0,fe,Te],me(198669,{roughness:.38,metalness:.94,emissive:135190,emissiveIntensity:.18}),{shadow:!1});wt.renderOrder=6,jn(wt,"bucketRevealPanel",{born:Q,baseOpacity:0,targetOpacity:1,delay:dt})}),[{x:-.86,y:.42+H/2},{x:.86,y:.42+H/2}].forEach(({x:fe,y:Oe})=>{let He=J(se,[.12,H*.82,.16],[fe,Oe,.34],me(132618,{roughness:.44,metalness:.94,emissive:135190,emissiveIntensity:.16}),{shadow:!1});He.renderOrder=6,jn(He,"bucketRevealPanel",{born:Q,baseOpacity:0,targetOpacity:1,delay:.08})}),[-1,1].forEach(fe=>{let Oe=fe<0?_e.leftDoor:_e.rightDoor,He=Dt(se,Oe,{angle:0,radius:0,y:0,width:.58,height:H*.88,atlas:Ge,emissive:Y,emissiveIntensity:.34});He.position.set(fe*.36,.34+H/2,.22),jn(He,"bucketRevealDoor",{born:Q,startX:fe*.36,targetX:fe*1.05,targetRotZ:fe*.045,baseOpacity:0,targetOpacity:1,startRotY:0,targetRotY:-fe*.35,phase:fe});let Te=Dt(se,_e.tallRail,{angle:0,radius:0,y:0,width:.14,height:H*.78,atlas:Ge,emissive:Y,emissiveIntensity:.42});Te.position.set(fe*.72,.4+H/2,.3),jn(Te,"bucketRevealDoor",{born:Q,startX:fe*.72,targetX:fe*.9,targetRotZ:fe*.035,baseOpacity:0,targetOpacity:1,startRotY:0,targetRotY:-fe*.1,phase:fe*1.8})}),[{rect:_e.curvedWingA,side:-1,y:.42+H*.33,z:.36,width:.28},{rect:_e.curvedWingB,side:1,y:.42+H*.33,z:.36,width:.28},{rect:_e.curvedWingC,side:-1,y:.44+H*.58,z:.33,width:.22},{rect:_e.curvedWingC,side:1,y:.44+H*.58,z:.33,width:.22}].forEach((fe,Oe)=>{let He=Dt(se,fe.rect,{angle:0,radius:0,y:0,width:Math.max(.12,fe.width-.08),height:H*.28,atlas:Ge,emissive:Y,emissiveIntensity:.22});He.position.set(fe.side*.48,fe.y,fe.z),He.rotation.y=fe.side*.03,jn(He,"bucketRevealDoor",{born:Q,startX:He.position.x,targetX:fe.side*(.66+(Oe>1?.08:0)),targetRotZ:fe.side*.025,baseOpacity:0,targetOpacity:.96,startRotY:0,targetRotY:-fe.side*.08,phase:Oe+.4})});let Ve=Z(se,new At(.035,.05,H*.82,18),new Pt({color:Y,transparent:!0,opacity:0,blending:Wn,depthWrite:!1}),[0,.4+H/2,.42],{shadow:!1});jn(Ve,"bucketRevealPanel",{born:Q,baseOpacity:0,targetOpacity:.48,delay:.12}),Ru(se,{eyebrow:V.eyebrow||`Major app systems / ${String(I.index+1).padStart(2,"0")} of ${String(i.length).padStart(2,"0")}`,title:V.title,subtitle:V.subtitle||"Platform operating system",badge:V.badge||`${V.files} signals`,rows:V.rows||[["Current volume",V.valueLabel||o(V.size)],["Tracked signals",String(V.files)],["Operating state","Current"],["Coverage","Company scoped"]],footer:V.footer||"Maintain Ops platform index",status:V.status||"Current",accent:"#6edcff",width:520,height:310,scale:.74},H+1.34,H+2.04,1.72);for(let fe=0;fe<12;fe+=1){let Oe=fe/12*Math.PI*2,He=yt(se,[0,.72+H*.42,.1],[Math.cos(Oe)*(1.15+fe%3*.34),H+.5+Math.sin(fe)*.5,.7+Math.sin(Oe)*.4],Y,{phase:fe*.08,speed:.58,size:.055});He.userData.born=Q,He.userData.lifespan=1.4}}function mp(x,I,C,V,Y=10){let H=mt.elapsedTime;for(let Q=0;Q<Y;Q+=1){let se=Q/Y*Math.PI*2,_e=yt(x,[0,C,.12],[Math.cos(se)*(.9+Q%3*.25),V+Math.sin(Q)*.34,.7+Math.sin(se)*.34],I,{phase:Q*.08,speed:.54,size:.05});_e.userData.born=H,_e.userData.lifespan=1.25}}function Tl(x,{eyebrow:I,title:C,subtitle:V,badge:Y,rows:H,footer:Q,status:se,color:_e=Fe.cyan,cardY:ze=2.4,cardZ:Ie=.9,cardWidth:gt=520,cardHeight:Le=310,cardScale:T=.74}){El();let Ve=new A;x.getWorldPosition(Ve);let fe=mt.elapsedTime,Oe=new Qt;Oe.position.set(Ve.x,0,Ve.z),rt.add(Oe),fn=Oe;let He=Z(Oe,new Gt(.78,.028,8,64),O(_e,1),[0,.28,0],{shadow:!1});He.rotation.x=Math.PI/2,jn(He,"revealAperture",{born:fe,baseScale:.35,targetScale:1.45}),Ru(Oe,{eyebrow:I,title:C,subtitle:V,badge:Y,rows:H,footer:Q,status:se,accent:_e===Fe.mint?"#89d9aa":"#6edcff",width:gt,height:Le,scale:T},ze-.65,ze,Ie),mp(Oe,_e,.42,ze-.35,10)}function gp(x,I){let C=I.month,V=C.valueLabel||(C.added?o(C.added):"0 B"),Y=r.slice(0,I.index+1).reduce((Q,se)=>Q+se.added,0),H=100*1024*1024*1024-Y;Tl(x,{eyebrow:C.eyebrow||`Activity runway / ${String(I.index+1).padStart(2,"0")} of ${String(r.length).padStart(2,"0")}`,title:C.label,subtitle:C.subtitle||"Platform activity window",badge:C.badge||(C.added?"Activity":"Quiet"),rows:C.rows||[["Recorded activity",V],["Cumulative activity",o(Y)],["Runway window","14 days"],["Pattern",C.added?"Above baseline":"No activity"]],footer:C.footer||"Company activity runway",status:C.status||"Tracked",color:C.added?Fe.blue:Fe.teal,cardY:3.05,cardZ:.95})}function _p(x,I){let C=I.file,Y=[...a].sort((Q,se)=>se.size-Q.size||a.indexOf(Q)-a.indexOf(se)).indexOf(C)+1,H=C.name.includes(".")?C.name.split(".").pop().toUpperCase():"FILE";Tl(x,{eyebrow:C.eyebrow||"Current notable signal",title:C.name,subtitle:C.subtitle||`${C.bucket} / ${C.category}`,badge:C.badge||`Rank ${String(Y).padStart(2,"0")} of ${a.length}`,rows:C.rows||[["Signal value",C.valueLabel||o(C.size)],["System",C.bucket],["Source",C.equipment],["Signal type",H]],footer:C.footer||"Platform signal index",status:C.status||"Current",color:Fe.mint,cardY:3.25,cardZ:.95,cardWidth:560,cardHeight:314,cardScale:.72})}function yp(x){Tl(x,{eyebrow:l.eyebrow||"Maintain Ops / App Health",title:l.title||"App Health",subtitle:l.subtitle||"Measured company app health",badge:l.badge||"Current",rows:l.rows||[["Health score","Collecting"],["Signals measured","0/0"],["Page load","Collecting"],["Responsiveness","Collecting"]],footer:l.footer||"Maintain Ops command core",status:l.status||"Current",color:Fe.cyan,cardY:6.55,cardZ:1.45,cardWidth:540,cardHeight:310,cardScale:.8})}function Is(x,{silent:I=!1}={}){let C=x.userData.payload;ve=x,Au(ss,x);let V=new A;if(x.getWorldPosition(V),C.type==="bucket"){qe="buckets";let Y=C.revealHeight??2.5,H=Math.max(1.9,Y*.65+.9);Ae(V.clone().add(new A(.7,H+2.8,12.4)),V.clone().add(new A(0,H,.35)),1.5),pp(x,C),h(di.buckets),I||u(C.bucket,C.index)}else C.type==="month"?(qe="timeline",Ae(V.clone().add(new A(0,3.4,5.6)),V.clone().add(new A(0,.3,0)),1.5),gp(x,C),h(di.timeline),I||d(C.month,C.index)):C.type==="file"?(qe="files",Ae(V.clone().add(new A(.35,3.65,9)),V.clone().add(new A(0,1.5,0)),1.5),_p(x,C),h(di.files),I||f(C.file,C.index)):C.type==="vault"&&(qe="vault",Ae(V.clone().add(new A(-6.8,3.2,12)),V.clone().add(new A(0,1.15,.1)),1.6),yp(x),h(di.vault),I||g())}function Al(){ve=null,y(null),ss.visible=!1,El()}function xp(x){Al(),di[x]||(x="overview"),Ke(x)}let Du=Object.freeze({mouse:6,pen:10,touch:44}),vp=Object.freeze({bucket:58,file:40,month:42,vault:72}),tt={active:!1,moved:!1,pointerId:null,pointerType:"mouse",lastGesture:"idle",x:0,y:0,startX:0,startY:0},Ls=new A,Ds="none",Mp=Object.freeze({bucket:[56,116],file:[52,88],month:[52,92],vault:[120,144]}),Sp=window.matchMedia("(pointer: coarse), (hover: none)");function Uu(x){let C=(Array.isArray(x.tooltip)?x.tooltip:[]).find(V=>typeof V=="string"&&V.trim());return C?`Open ${C}`:`Open ${x.type||"performance object"}`}let Pr=t?N.map(x=>{let I=x.userData.payload||{},[C,V]=Mp[I.type]||[80,80],Y=document.createElement("button");return Y.type="button",Y.className="spatial-touch-target",Y.dataset.spatialType=I.type||"object",I.index!==void 0&&(Y.dataset.spatialIndex=String(I.index)),Y.setAttribute("aria-label",Uu(I)),Y.style.setProperty("--spatial-touch-width",`${C}px`),Y.style.setProperty("--spatial-touch-height",`${V}px`),Y.addEventListener("click",H=>{H.preventDefault(),H.stopPropagation(),tt.lastGesture="tap",Ds="touch-dom",Is(x)}),t.append(Y),{button:Y,object:x,projection:new A}}):[],Nu=0;function Ou(x=!1){if(!Sp.matches)return;let I=performance.now();if(!x&&te.t>=1&&!tt.active&&I-Nu<250)return;Nu=I;let C=te.t>=1;Pr.forEach(({button:V,object:Y,projection:H})=>{Y.getWorldPosition(H),H.project(ie);let Q=H.z>=-1&&H.z<=1&&H.x>=-1.08&&H.x<=1.08&&H.y>=-1.08&&H.y<=1.08;V.hidden=!Q,Q&&(V.disabled=!C,V.style.left=`${(H.x+1)*50}%`,V.style.top=`${(1-H.y)*50}%`,V.style.zIndex=String(Math.round((1-H.z)*1e3)))})}function bp(x){return Du[x]||Du.mouse}function wp(x){if(Number.isInteger(x))try{e.hasPointerCapture(x)&&e.releasePointerCapture(x)}catch{}}function Fu(x){wp(tt.pointerId),tt.active=!1,tt.moved=!1,tt.pointerId=null,tt.lastGesture=x}function Ea(){Ds="miss",Al(),Ke("overview")}function Bu(x,I,C=!1){ae.x=x/window.innerWidth*2-1,ae.y=-(I/window.innerHeight)*2+1,le.setFromCamera(ae,ie);let V=le.intersectObjects(N,!1)[0]?.object??null;if(V)return Ds="raycast",V;if(!C)return Ds="miss",null;let Y=null,H=1/0;return N.forEach(Q=>{if(Q.getWorldPosition(Ls),Ls.project(ie),Ls.z<-1||Ls.z>1)return;let se=(Ls.x+1)*.5*window.innerWidth,_e=(1-Ls.y)*.5*window.innerHeight,ze=vp[Q.userData.payload?.type]??36,Ie=Math.hypot(x-se,I-_e);Ie>ze||Ie>=H||(Y=Q,H=Ie)}),Ds=Y?"touch-nearest":"miss",Y}function Ep(){n&&(n.hidden=!0)}window.addEventListener("pointermove",x=>{if(ae.x=x.clientX/window.innerWidth*2-1,ae.y=-(x.clientY/window.innerHeight)*2+1,Be.x=x.clientX,Be.y=x.clientY,Be.overCanvas=x.target===e,tt.active&&(tt.pointerId===null||x.pointerId===tt.pointerId)){let C=x.clientX-tt.x,V=x.clientY-tt.y;Math.hypot(x.clientX-tt.startX,x.clientY-tt.startY)>bp(tt.pointerType)&&(tt.moved=!0),tt.moved&&(te.yaw=dn.clamp(te.yaw-C*.0017,-.16,.16),te.pitch=dn.clamp(te.pitch+V*.0012,-.08,.1)),tt.x=x.clientX,tt.y=x.clientY}}),window.addEventListener("pointerdown",x=>{if(!(x.target!==e||x.isPrimary===!1)&&(tt.active=!0,tt.moved=!1,tt.pointerId=Number.isInteger(x.pointerId)?x.pointerId:null,tt.pointerType=x.pointerType||"mouse",tt.lastGesture="pending",tt.x=x.clientX,tt.y=x.clientY,tt.startX=x.clientX,tt.startY=x.clientY,tt.pointerId!==null))try{e.setPointerCapture(tt.pointerId)}catch{}}),window.addEventListener("pointerup",x=>{if(!tt.active||tt.pointerId!==null&&x.pointerId!==tt.pointerId)return;let I=tt.moved,C=tt.pointerType;if(Fu(I?"drag":"tap"),I)return;if(C==="touch"&&Pr.length){Ea();return}let V=Bu(x.clientX,x.clientY,C==="touch");V?Is(V):Ea()}),window.addEventListener("pointercancel",x=>{if(!tt.active||tt.pointerId!==null&&x.pointerId!==tt.pointerId)return;let I=tt.pointerType==="touch"&&!tt.moved,C=tt.x,V=tt.y;if(Fu(I?"tap":"cancel"),!I)return;if(Pr.length){Ea();return}let Y=Bu(C,V,!0);Y?Is(Y):Ea()}),window.addEventListener("resize",()=>{ie.aspect=window.innerWidth/window.innerHeight,ie.updateProjectionMatrix(),ht(),B.setPixelRatio(ee()),B.setSize(window.innerWidth,window.innerHeight),Me.setSize(window.innerWidth,window.innerHeight),Ou(!0),ve||Ke(qe,.8)});let Rl=0;e.addEventListener("webglcontextlost",x=>{x.preventDefault(),Rl+=1,m({contextLosses:Rl,qualityTier:U.effective})}),ie.aspect=window.innerWidth/window.innerHeight,ie.updateProjectionMatrix(),It(U.preference),Ke("overview",.01);let Ta={sampled:0,nonBlack:0,range:0},ku=!1,Tp=new URLSearchParams(window.location.search).has("qa_bust")||new URLSearchParams(window.location.search).has("lfes_canvas_probe");function Ap(){let x=B.getContext(),I=Math.min(32,x.drawingBufferWidth),C=Math.min(32,x.drawingBufferHeight),V=new Uint8Array(I*C*4);try{x.readPixels(Math.max(0,Math.floor((x.drawingBufferWidth-I)/2)),Math.max(0,Math.floor((x.drawingBufferHeight-C)/2)),I,C,x.RGBA,x.UNSIGNED_BYTE,V)}catch{return Ta}let Y=0,H=255,Q=0;for(let se=0;se<V.length;se+=4){let _e=Math.round((V[se]+V[se+1]+V[se+2])/3);_e>4&&(Y+=1),H=Math.min(H,_e),Q=Math.max(Q,_e)}return Ta={sampled:I*C,nonBlack:Y,range:Q-H},Ta}window.__STORAGE_WORLD_DEBUG=()=>({inspection:fn?.userData.card?{title:fn.userData.cardData.title,rows:fn.userData.cardData.rows,texture:fn.userData.card.material.map.uuid,opacity:fn.userData.card.material.opacity,bounds:Cu()}:null,motion:{enabled:et(),reduced:Lt.matches,elapsed:mt.elapsedTime,renderedFrames:D,snapshotUpdates:w},data:{buckets:i.map(x=>x.valueLabel),files:a.map(x=>x.valueLabel),core:l.badge},zone:qe,selected:ve?.userData?.payload?{type:ve.userData.payload.type,index:ve.userData.payload.index??null}:null,pointerActive:tt.active,pointerGesture:tt.lastGesture,lastPickMode:Ds,touchTargetCount:Pr.length,targets:N.map(x=>{let I=new A;return x.getWorldPosition(I),I.project(ie),{type:x.userData.payload?.type||"",index:x.userData.payload?.index??null,x:Math.round((I.x+1)*.5*window.innerWidth),y:Math.round((1-I.y)*.5*window.innerHeight)}}),cameraPos:ie.position.toArray().map(x=>Number(x.toFixed(2))),baseLook:te.baseLook.toArray().map(x=>Number(x.toFixed(2))),travelT:Number(te.t.toFixed(2)),quality:{...U},renderer:{drawCalls:B.info.render.calls,triangles:B.info.render.triangles,geometries:B.info.memory.geometries,textures:B.info.memory.textures,drawingWidth:B.domElement.width,drawingHeight:B.domElement.height,pixels:Ta}});let zu=0,Cl=performance.now(),Li=0,Aa=0,Ra=0,Hu=!1,Vu=!1;function Gu(x=performance.now()){zu=0,Cl=x,Li=0,Aa=0,Ra=0}document.addEventListener("visibilitychange",()=>{Gu(),De.reset()});function Pl(){De.reset(),Gu(),S({enabled:et(),reduced:Lt.matches})}Lt.addEventListener("change",Pl),["pointermove","pointerdown","pointerup","pointercancel","wheel","resize","keydown"].forEach(x=>window.addEventListener(x,oe,{passive:!0})),Pl();function Wu(x=performance.now()){requestAnimationFrame(Wu);let I=et();j||oe();let C=De.tick(x,{hidden:document.hidden,enabled:I,fps:G.targetFps});if(!C)return;let Y=1e3/G.targetFps,H=C.frameMs;zu=x;let Q=C.delta,se=mt.elapsedTime=C.elapsed,_e=(T,Ve,fe=0)=>I?np(dn.clamp((se-T.userData.born-fe)/Ve,0,1)):1,ze=null;Be.overCanvas&&!tt.active&&(le.setFromCamera(ae,ie),ze=le.intersectObjects(N,!1)[0]?.object??null),ye!==ze&&(ye=ze,e.style.cursor=ye?"pointer":"grab"),ye&&ye!==ve?Au(Cr,ye):Cr.visible=!1,Ep(),st.forEach(T=>{if(T.userData.kind==="rail"){let Te=T.userData.baseIntensity??=T.material.emissiveIntensity??.12;T.material.emissiveIntensity=Te+Math.sin(se*1.6+T.userData.phase)*Te*.18;return}if(T.userData.kind==="pulse"){if("emissiveIntensity"in T.material){let Te=T.userData.pulseBase??=T.material.emissiveIntensity;T.material.emissiveIntensity=Te*(1+.3*Math.sin(se*1.8+T.userData.phase))}else T.material.opacity=.12+(Math.sin(se*1.8+T.userData.phase)+1)*.05;return}if(T.userData.kind==="spin"){T.rotation.z+=Q*(T.userData.speed??.4);return}if(T.userData.kind==="scanBand"){T.position.y=T.userData.baseY+Math.sin(se*1.9+T.userData.phase)*T.userData.span,T.material.opacity=.18+(Math.sin(se*2.1+T.userData.phase)+1)*.14;return}if(T.userData.kind==="gyro"){T.rotateZ(Q*(T.userData.speed??.25));return}if(T.userData.kind==="coreGyro"){let Te=T.userData.speed??.12;T.rotateZ(Q*Te);return}if(T.userData.kind==="coreCage"){T.rotation.y+=Q*.045,T.rotation.x=Math.sin(se*.18+T.userData.phase)*.035,T.material.opacity=.14+(Math.sin(se*.7)+1)*.025;return}if(T.userData.kind==="corePulse"){let Te=1+Math.sin(se*1.15+T.userData.phase)*.075;T.scale.setScalar(Te),T.material.emissiveIntensity=1.45+(Math.sin(se*1.15)+1)*.34;return}if(T.userData.kind==="coreBeam"){T.material.opacity=T.userData.baseOpacity+(Math.sin(se*1.05)+1)*.09,T.scale.y=.96+Math.sin(se*.72)*.04;return}if(T.userData.kind==="coreSatellite"){let Te=se*T.userData.speed+T.userData.phase;T.position.x=Math.cos(Te)*T.userData.radius,T.position.z=Math.sin(Te)*T.userData.radius,T.position.y=3.4+T.userData.lift+Math.sin(Te*1.7)*.28,T.scale.setScalar(.82+(Math.sin(se*1.8+T.userData.phase)+1)*.16);return}if(T.userData.kind==="coreLight"){T.intensity=T.userData.baseIntensity*(.82+(Math.sin(se*1.15)+1)*.09);return}if(T.userData.kind==="dataPacket"){if(T.userData.lifespan&&(T.visible=I&&se-T.userData.born<T.userData.lifespan,!T.visible))return;let Te=(se*(T.userData.speed??.1)+T.userData.phase)%1;T.position.lerpVectors(T.userData.from,T.userData.to,Te),T.material.opacity=.18+Math.sin(Te*Math.PI)*.74;let dt=.75+Math.sin(Te*Math.PI)*.55;T.scale.setScalar(dt);return}if(T.userData.kind==="sweep"){T.rotation.z+=Q*(T.userData.speed??.08),T.material.emissiveIntensity=.26+(Math.sin(se*1.4)+1)*.14;return}if(T.userData.kind==="bucketRevealDoor"){let Te=_e(T,.9,.12);T.position.x=dn.lerp(T.userData.startX,T.userData.targetX,Te),T.rotation.z=dn.lerp(0,T.userData.targetRotZ,Te),T.rotation.y=dn.lerp(T.userData.startRotY??0,T.userData.targetRotY??0,Te),wa(T,dn.lerp(T.userData.baseOpacity??.1,T.userData.targetOpacity??.38,Te)),Lu(T,.2+Math.sin(se*3.2+T.userData.phase)*.04);return}if(T.userData.kind==="bucketRevealPanel"){let Te=_e(T,.52,T.userData.delay??0);wa(T,dn.lerp(T.userData.baseOpacity??0,T.userData.targetOpacity??1,Te)),Lu(T,.12+Te*.18),T.scale.setScalar(.96+Te*.04);return}if(T.userData.kind==="bucketRevealCard"){let Te=_e(T,.86,.12);T.position.y=dn.lerp(T.userData.baseY,T.userData.targetY,Te),T.material.opacity=Te,T.scale.copy(T.userData.targetScale).multiplyScalar(.86+Te*.14);return}if(T.userData.kind==="bucketRevealChip"){let Te=_e(T,.7,T.userData.delay);T.position.x=dn.lerp(0,T.userData.targetX,Te),T.position.y=dn.lerp(T.position.y,T.userData.targetY+Math.sin(se*1.4+T.id)*.035,.16),T.position.z=dn.lerp(T.position.z,T.userData.targetZ,.14),T.material.opacity=Te*.88;return}if(T.userData.kind==="revealAperture"){let Te=_e(T,.62),dt=dn.lerp(T.userData.baseScale,T.userData.targetScale,Te);T.scale.set(dt,dt,1),T.rotation.z+=Q*.9,T.material.emissiveIntensity=.62+Math.sin(se*3.4)*.12;return}if(!T.userData.payload)return;let Ve=T===ye||T===ve;T.userData.selectionOutline&&(T.userData.selectionOutline.material.opacity=Ve?.85:.05);let fe=T.userData.baseScale.clone().multiplyScalar(Ve?1.05:1);T.scale.lerp(fe,I?.14:1);let Oe=(T.userData.bob??0)*Math.sin(se*1.1+T.id*.7),He=Ve?.1:0;if(T.position.y+=(T.userData.baseY+Oe+He-T.position.y)*(I?.12:1),T.material.emissive){let Te=T.userData.baseEmissive;T.material.emissiveIntensity+=((Ve?Te+.7:Te)-T.material.emissiveIntensity)*.14}});let Ie=I?Math.max(0,1-(se-K)/2.5):0;ut.material.opacity=.48+Ie*.5,ke.forEach((T,Ve)=>{for(let fe=0;fe<3;fe+=1){let Oe=(se*.065+Ve*.14+fe*.023)%1;T.getPoint(Oe,Nt),T.getTangent(Oe,pn),xt.setFromUnitVectors(nn,pn),Ue.set(1+Ie,1,1),Ut.compose(Nt,xt,Ue),ut.setMatrixAt(Ve*3+fe,Ut)}}),ut.instanceMatrix.needsUpdate=!0,St.forEach(({sprite:T,zone:Ve})=>{let fe=ie.aspect<.75,He=qe==="overview"||qe===Ve?fe&&qe==="overview"?.58:.86:.035;T.material.opacity+=(He-T.material.opacity)*Math.min(1,Q*4)}),ss.rotation.z+=Q*.7;let gt=1+Math.sin(se*2.4)*.045;if(ss.visible){let T=ve?.userData.payload.focusRadius??1;ss.scale.set(T*gt,T*gt,1)}if(te.t<1){te.t=I?Math.min(1,te.t+Q/te.duration):1;let T=np(te.t);te.basePos.lerpVectors(te.fromPos,te.toPos,T),te.baseLook.lerpVectors(te.fromLook,te.toLook,T),te.yaw=te.yawStart*(1-T),te.pitch=te.pitchStart*(1-T)}Ee.subVectors(te.basePos,te.baseLook),ot.setFromVector3(Ee),ot.theta+=te.yaw,ot.phi=dn.clamp(ot.phi-te.pitch,.8,1.24),Ee.setFromSpherical(ot),ie.position.copy(te.baseLook).add(Ee),ie.lookAt(te.baseLook),ie.updateMatrixWorld();let Le=Cu();if(Le){let T=Math.max(1,2*Math.min(Le.x-16,window.innerWidth-16-Le.x));fn.userData.card.scale.multiplyScalar(Math.min(1,T/Le.width))}if(Ou(!I),B.info.reset(),Me.render(),D+=1,Tp&&j&&!ku&&(Ap(),ku=!0),j&&!Hu&&(Hu=!0,M({qualityTier:U.effective})),!document.hidden&&I){Li+=1,Aa+=H,H>Y*1.5&&(Ra+=1);let T=x-Cl;T>=(Vu?6e4:6e3)&&(m({fps:Li/(T/1e3),frameMs:Li?Aa/Li:0,slowFramePercent:Li?Ra/Li*100:0,drawCalls:B.info.render.calls,triangles:B.info.render.triangles,geometries:B.info.memory.geometries,textures:B.info.memory.textures,contextLosses:Rl,qualityTier:U.effective}),Cl=x,Li=0,Aa=0,Ra=0,Vu=!0)}}return Wu(),{setMotionPaused(x){Qe=!!x,Pl()},updateSnapshot(x){let I=JSON.stringify(i.map(H=>H.valueLabel))!==JSON.stringify(x.buckets.map(H=>H.valueLabel));i.splice(0,i.length,...x.buckets),a.splice(0,a.length,...x.files),r.splice(0,r.length,...x.months),Object.assign(l,x.core),Xe.forEach((H,Q)=>{H.parent.visible=!!i[Q],i[Q]&&Object.assign(H.userData.payload,{bucket:i[Q],tooltip:[i[Q].title,i[Q].valueLabel]})}),mn.forEach((H,Q)=>{H.visible=!!a[Q],a[Q]&&Object.assign(H.userData.payload,{file:a[Q],tooltip:[a[Q].name,a[Q].valueLabel]})});let C=N.find(H=>H.userData.payload.type==="vault");C&&(C.userData.payload.tooltip=[l.title,l.tooltip]),Pr.forEach(({button:H,object:Q})=>H.setAttribute("aria-label",Uu(Q.userData.payload)));let V=l.rows?.find(([H])=>H==="Health score")?.[1]||"APP",Y=Dn([V,"HEALTH"],{accent:"#dff4ff",scale:.52});if(Re.material.map.dispose(),Re.material.map=Y.material.map,Re.scale.copy(Y.scale),Y.material.dispose(),ve){let H=ve.userData.payload,Q=H.type==="bucket"?i[H.index]:H.type==="file"?a[H.index]:l;Q?up(Q):Al()}I&&x.sampling.status==="current"&&(K=mt.elapsedTime),w+=1,oe()},quality(){return{...U}},setQuality(x){return It(x)},setView:xp,focusBucket(x){Xe[x]&&Is(Xe[x],{silent:!0})},focusMonth(x){vt[x]&&Is(vt[x],{silent:!0})},focusFile(x){mn[x]&&Is(mn[x],{silent:!0})}}}var As=window.location.origin,Ml=1024*1024,fi=null,rp=!1,tn=null,sp=!1,Pv=performance.now(),Es={sampledAt:new Date().toISOString(),sampling:{status:"pending",message:"Waiting for the host application to provide company data.",notices:[]},telemetry:{message:"Platform instrumentation is not connected yet."},health:{score:null,status:"collecting",label:"Collecting",measuredCount:0,totalCount:4,metrics:[{metric:"lcp_ms",label:"Largest Contentful Paint",shortLabel:"Page paint (LCP)",valueText:"Collecting",status:"collecting",statusLabel:"Collecting",gaugePosition:0,direction:"lower",directionLabel:"Lower is better",statisticLabel:"Collecting",target:"2.5 s or less",basis:"Core Web Vitals page-paint threshold; separate from workspace readiness",sampleCount:0},{metric:"inp_ms",label:"Interaction to Next Paint",shortLabel:"Responsiveness",valueText:"Collecting",status:"collecting",statusLabel:"Collecting",gaugePosition:0,direction:"lower",directionLabel:"Lower is better",statisticLabel:"Collecting",target:"200 ms or less",basis:"Core Web Vitals threshold",sampleCount:0},{metric:"query_latency_ms",label:"Data Loader Response",shortLabel:"Data loader",valueText:"Collecting",status:"collecting",statusLabel:"Collecting",gaugePosition:0,direction:"lower",directionLabel:"Lower is better",statisticLabel:"Collecting",target:"500 ms or less",basis:"MaintainOps product target",sampleCount:0},{metric:"spatial_fps",label:"3D Frame Rate",shortLabel:"3D smoothness",valueText:"Collecting",status:"collecting",statusLabel:"Collecting",gaugePosition:0,direction:"higher",directionLabel:"Higher is better",statisticLabel:"Collecting",target:"40 FPS or more",basis:"Mixed-device MaintainOps target",sampleCount:0}]},summary:{teamSeats:0,requestsToday:0,ordersReceivedToday:0,processEventsToday:0,publicIntakeTotal:0,ordersReceivedTotal:0,totalRecords:0,assets:0,parts:0,locations:0,storage:{available:!1,totalBytesText:"Role limited",fileCount:0}},systems:[{id:"intake",label:"Public Intake",value:"0 received",detail:"Awaiting company telemetry"},{id:"orders",label:"Order Throughput",value:"0 total",detail:"Awaiting company telemetry"},{id:"flow",label:"Today's Process Flow",value:"0 events",detail:"Awaiting company telemetry"},{id:"vault",label:"Data Vault",value:"Role limited",detail:"Storage detail follows existing access"},{id:"footprint",label:"Platform Footprint",value:"0 records",detail:"Awaiting company telemetry"}],signals:[{title:"Platform snapshot loading",value:"Waiting",detail:"The host application is preparing live company data.",kind:"active"}],timeline:[],plants:[]};function nt(s){return String(s??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function Ts(s){return Number(s)||0}function Jn(s){if(s==null||s==="")return"Unavailable";let e=Number(s);return Number.isFinite(e)?new Intl.NumberFormat("en-US").format(e):"Unavailable"}function ap(s){return s?.status==="degraded"?"Partial data":s?.status==="pending"?"Pending":"Current"}function Su(s,e){return s==null?"Unavailable":`${Jn(s)} ${e}`}function Iv(s,e){let t=String(s||e||"").trim();return t.length>18?`${t.slice(0,17)}...`:t}function Lv(s,e){let t=String(s||"");return t?Iv(t.replace(/\s+\d{4}$/,""),`D${e+1}`):`D${e+1}`}function Dv(s){return s==="attention"?"high":s==="stable"?"low":"medium"}function Uv(s,e){let t=Number.parseFloat(String(s?.value||"").replace(/[^0-9.]/g,""));return Math.max(1,t||10-e)*Ml}function Nv(s,e){let t=Number.parseFloat(String(s?.value||"").replace(/[^0-9.]/g,""));return Math.max(1,t||8-e)*Ml}function Ov(s){let e=Array.isArray(s.signals)?s.signals:[],t=Array.isArray(s.systems)?s.systems:[],n=Array.isArray(s.timeline)?s.timeline:[],i=t.map(l=>({title:l.label,value:l.value,detail:l.detail,kind:l.tone==="amber"?"attention":"active",system:l.label})),r=n.at(-1);if(r){let l=Ts(r.ordersReceived??r.workCreated);i.push({title:"Today's process flow",value:`${Ts(r.requests)+l} events`,detail:`${Ts(r.requests)} intake and ${l} orders received`,kind:"active",system:"Process Data Flow"})}let a=[],o=new Set;for([...e,...i].forEach(l=>{let c=String(l.system||l.title||"").trim().toLowerCase();!c||o.has(c)||(o.add(c),a.push(l))});a.length<10;){let l=String(a.length+1).padStart(2,"0");a.push({title:`Telemetry channel ${l}`,value:"Pending",detail:"Telemetry will appear after it is connected to Maintain Ops.",kind:"stable",system:`Platform Instrumentation ${l}`})}return a.slice(0,10)}function Fv(s){let e=s.summary||Es.summary,t=s.health||Es.health,n=s.sampling||{status:"current",message:"Company data sampled.",notices:[]},i=ap(n),r=(s.systems||Es.systems).slice(0,5),a=Ov(s),o=(s.timeline||[]).slice(-12),l=r.map((u,d)=>({title:u.label,files:Math.max(1,Ts(String(u.value).replace(/[^0-9.]/g,""))||1),itemLabel:"signals",size:Nv(u,d),valueLabel:u.value,type:"systems",eyebrow:`Major app systems / ${String(d+1).padStart(2,"0")} of ${String(r.length).padStart(2,"0")}`,subtitle:"All-plant aggregated platform metric",badge:u.value,rows:[["Current measure",u.value],["System detail",u.detail],["Scope","Current company / all plants"],["Telemetry","Company sampled"]],footer:"Maintain Ops performance index",status:i})),c=a.map((u,d)=>({name:u.title,bucket:u.system||r[d%Math.max(r.length,1)]?.label||"Platform Signal",category:"App performance",equipment:u.detail,size:Uv(u,d),valueLabel:u.value,eyebrow:"Current notable signal",subtitle:`${u.system||"Platform"} / all-plant aggregate`,badge:`Rank ${String(d+1).padStart(2,"0")} of ${a.length}`,rows:[["Current value",u.value],["System",u.system||"Platform"],["Context",u.detail],["State",u.kind==="attention"?"Review":"Current"]],footer:"Live platform signal index",status:u.kind==="attention"?"Review":"Current"})),h=o.map((u,d)=>{let f=Ts(u.ordersReceived??u.workCreated),g=Ts(u.requests)+f;return{label:u.label||`Day ${d+1}`,added:Math.max(g,0)*Ml,valueLabel:`${g} events`,subtitle:"Daily platform activity",badge:g?"Active":"Quiet",rows:[["Public intake",String(Ts(u.requests))],["Orders received",String(f)],["Order throughput",String(f)],["Process data flow",`${g} events`]],footer:"Company activity runway",status:g?"Tracked":"Quiet"}});return{health:t,telemetry:s.telemetry||Es.telemetry,summary:e,systems:r,signals:a,buckets:l,files:c,months:h,days:tp(o),rules:r.map(u=>({title:u.label,summary:u.value,detail:u.detail})),operations:a.slice(0,5).map(u=>({severity:Dv(u.kind),title:u.title,detail:`${u.value} - ${u.detail}`})),recentActivity:[{label:"Public intake",value:Su(e.requestsToday,"today"),detail:e.publicIntakeTotal===null?"Company total unavailable":`${Jn(e.publicIntakeTotal)} total received`},{label:"Orders received",value:Su(e.ordersReceivedToday,"today"),detail:e.ordersReceivedTotal===null?"Company total unavailable":`${Jn(e.ordersReceivedTotal)} total recorded`},{label:"Process data flow",value:Su(e.processEventsToday,"events"),detail:"Today across public intake and orders received"}],core:{eyebrow:"Maintain Ops / App Health",title:"App Health",subtitle:"Measured browser and platform responsiveness",badge:t.label,tooltip:t.score===null?"Collecting performance samples":`${t.score} of 100 across measured signals`,rows:[["Health score",t.score===null?"Collecting":`${t.score}/100`],["Signals measured",`${t.measuredCount||0}/${t.totalCount||0}`],[t.metrics?.[0]?.shortLabel||"Page load",t.metrics?.[0]?.valueText||"Collecting"],[t.metrics?.[1]?.shortLabel||"Responsiveness",t.metrics?.[1]?.valueText||"Collecting"]],footer:"Company app health command core",status:t.label},sampling:n}}function Bv(){return{headerKicker:document.querySelector(".header-kicker"),headerSubtitle:document.querySelector(".subtitle.subtle"),headerStateLabel:document.querySelector(".header-system-state small"),headerState:document.querySelector(".header-system-state strong"),samplingNotice:document.querySelector("#sampling-notice"),stageReadoutStatus:document.querySelector(".readout-status"),stageReadoutMetrics:[...document.querySelectorAll(".readout-metrics > span")],search:document.querySelector("#file-search"),refresh:document.querySelector("#refresh-button"),zoneIndicator:document.querySelector("#zone-indicator"),telemetryRows:[...document.querySelectorAll(".telemetry-row")],activityEvents:[...document.querySelectorAll(".activity-event")],chartStats:[...document.querySelectorAll(".chart-stats > span")],timelineMonths:[...document.querySelectorAll("[data-timeline-month]")],stageActions:[...document.querySelectorAll("[data-world-target]")],timelineSource:document.querySelector("#timeline-source"),sourcePanels:[...document.querySelectorAll(".source-lattice > .source-panel")],summarySource:document.querySelector(".summary-source"),rulesGrid:document.querySelector("#rules-grid"),usageChart:document.querySelector("#usage-chart"),bucketList:document.querySelector("#bucket-list"),fileList:document.querySelector("#file-list"),fileEmpty:document.querySelector("#file-empty"),filesCount:document.querySelector("#files-count"),clearSearch:document.querySelector("#clear-search"),updated:document.querySelector("#updated-pill"),opsGrid:document.querySelector("#ops-grid"),dialog:document.querySelector("#file-dialog"),dialogTitle:document.querySelector("#dialog-title"),dialogDetails:document.querySelector("#dialog-details"),canvas:document.querySelector("#storage-world"),touchTargets:document.querySelector("[data-spatial-touch-targets]"),tooltip:document.querySelector("#world-tooltip"),exit:document.querySelector("[data-performance-exit]"),qualityButtons:[...document.querySelectorAll("[data-quality-tier]")],motion:document.querySelector("#motion-button"),inspector:document.querySelector(".spatial-inspector"),timelineDays:document.querySelector(".timeline-days"),timelineDetail:document.querySelector(".timeline-detail"),timelineConsoleDetail:document.querySelector(".timeline-console-head small"),timelineConsoleWindow:document.querySelector(".timeline-console-head > span")}}var pe=null,Tu="all",xl=null;function kv(s){let e=document.activeElement?.dataset?.dayKey,t=s.days;t.some(n=>n.key===xl)||(xl=t.at(-1)?.key??null),pe.timelineDays.replaceChildren(),pe.timelineDays.style.setProperty("--day-count",Math.max(1,t.length)),t.forEach((n,i)=>{let r=document.createElement("button");r.type="button",r.dataset.timelineMonth=String(i),r.dataset.dayKey=n.key,r.setAttribute("aria-label",`${n.label}: ${n.requests} intake, ${n.orders} orders`);let a=document.createElement("span");a.className="timeline-day-bars",a.setAttribute("aria-hidden","true"),[n.requestScale,n.orderScale].forEach(l=>{let c=document.createElement("i");c.style.setProperty("--activity-scale",l),a.append(c)});let o=document.createElement("span");o.textContent=Lv(n.label,i),r.append(a,o),r.addEventListener("click",()=>vl(i)),pe.timelineDays.append(r)}),pe.timelineMonths=[...pe.timelineDays.querySelectorAll("button")],vl(t.findIndex(n=>n.key===xl)),e&&pe.timelineMonths.find(n=>n.dataset.dayKey===e)?.focus({preventScroll:!0})}function zv(s){if(pe.inspector.hidden=!s,document.documentElement.classList.toggle("spatial-inspecting",!!s),!s)return;pe.inspector.querySelector(".inspector-eyebrow").textContent=s.eyebrow||"App performance",pe.inspector.querySelector("h2").textContent=s.title||s.name,pe.inspector.querySelector(".inspector-subtitle").textContent=s.subtitle||"";let e=pe.inspector.querySelector("dl");e.replaceChildren(),(s.rows||[]).forEach(([t,n])=>{let i=document.createElement("dt"),r=document.createElement("dd");i.textContent=t,r.textContent=n,e.append(i,r)}),pe.inspector.querySelector("footer").textContent=`${s.status||"Collecting"} / Company sample`}function Hv({enabled:s,reduced:e}){document.documentElement.dataset.motion=s?"on":"off",pe.motion.textContent=e?"Reduced motion":s?"Motion on":"Motion off",pe.motion.setAttribute("aria-pressed",String(s)),pe.motion.disabled=e,pe.motion.title=e?"Following your device's reduced-motion preference":s?"Pause room animation":"Resume room animation"}function Vv(s){let{summary:e,systems:t,months:n,sampling:i,health:r}=s,a=r?.label||ap(i),o=i.status==="current",l=s.telemetry?.status==="unavailable";document.title="Maintain Ops App Performance",document.documentElement.classList.toggle("platform-spatial-degraded",i.status==="degraded"),document.documentElement.classList.toggle("platform-spatial-pending",i.status==="pending"),document.documentElement.dataset.health=r?.status||"collecting",pe.headerKicker.textContent="App Performance",pe.headerSubtitle.innerHTML=e.totalRecords===null?"Company record count unavailable":`<span id="linked-files-count">${nt(Jn(e.totalRecords))}</span> company records monitored`,pe.headerStateLabel.textContent="App experience",pe.headerState.innerHTML=`<i aria-hidden="true"></i>${nt(a)}`,pe.samplingNotice.hidden=o&&!l,pe.samplingNotice.hidden||(pe.samplingNotice.querySelector("strong").textContent=l?"Telemetry unavailable":a,pe.samplingNotice.querySelector("span").textContent=l?s.telemetry.message:i.message);let c=[["Orders Through System",Jn(e.ordersReceivedTotal),"all company history"],["Public Intake Total",Jn(e.publicIntakeTotal),"all company history"],["Data Stored",e.storage?.available?e.storage.totalBytesText:"Role limited",""],["Records Monitored",Jn(e.totalRecords),""]];pe.stageReadoutStatus.innerHTML=`App Experience <b>${nt(a)}</b>`,pe.stageReadoutMetrics.forEach((m,p)=>{let[M,y,S]=c[p]||["Platform signal","Current",""];m.querySelector("small").textContent=M,m.querySelector("b").textContent=y;let F=m.querySelector("em");F&&(F.textContent=S)}),pe.search.placeholder="Search systems...";let h=[["App health",r?.score===null?"Collecting":`${r.score}/100`],...(r?.metrics||[]).slice(0,4).map(m=>[m.shortLabel,m.valueText])];pe.telemetryRows.forEach((m,p)=>{let M=h[p]||["Platform signal","Current"];m.querySelector("small").textContent=M[0],m.querySelector("strong").textContent=M[1]}),pe.activityEvents.forEach((m,p)=>{let M=s.recentActivity[p]||{label:"Process telemetry",value:"Pending",detail:"Awaiting source connection"};m.querySelector("small").textContent="TODAY",m.querySelector("strong").innerHTML=`${nt(M.label)}<em>${nt(`${M.value} - ${M.detail}`)}</em>`});let u=document.querySelector(".activity-head");u.querySelector("small").textContent="Process data stream",u.querySelector("strong").textContent="Today at a glance",u.querySelector("b").innerHTML=`<i aria-hidden="true"></i>${nt(a)}`,document.querySelector(".source-lattice-head p").textContent="Performance sources",document.querySelector(".source-lattice-head h2").textContent="Maintain Ops Platform Archive",document.querySelector(".source-lattice-head > span").innerHTML=`<i aria-hidden="true"></i>${t.length} systems sampled`;let d=[...document.querySelectorAll(".source-summary")],f=[["App Health",`${r?.measuredCount||0}/${r?.totalCount||0} measured`],["App Systems",`${t.length} systems`],["Activity Runway",`${n.length} days`],["Platform Systems",`${t.length} systems`],["Notable Signals",`${s.files.length} shown`],["Instrumentation Queue",`${s.operations.length} signals`]];d.forEach((m,p)=>{let[M,y]=f[p]||["Platform source","Current"];m.querySelector("span").textContent=M,m.querySelector("strong").textContent=y}),document.querySelector("#rules-title").innerHTML="Major App Systems <span>Current company-scoped operating signals</span>",document.querySelector(".rules-panel .section-heading p").textContent="Each tower above represents one part of the Maintain Ops platform. Values are sampled from live company records where they exist.",document.querySelector("#month-title").innerHTML="Activity Runway <span>Recent company activity</span>",document.querySelector(".chart-panel .section-heading p").textContent="Public intake and order throughput across the selected activity window.",document.querySelector("#space-title").innerHTML="Platform Systems <span>Major capabilities</span>",document.querySelector(".buckets-panel .section-heading p").textContent="The spatial towers map directly to the five major platform systems.",document.querySelector("#files-title").innerHTML="Current Notable Signals <span>Live platform index</span>",document.querySelector(".files-panel .section-heading p").textContent="The front physical cubes represent the current signals that need attention or mark momentum.",document.querySelector("#ops-title").innerHTML="Instrumentation Queue <span>Observed platform conditions</span>",document.querySelector(".operations-panel .section-heading p").textContent="Only values Maintain Ops can actually observe are presented as live. Missing telemetry remains marked as pending.";let g=[["Process Events Today",Jn(e.processEventsToday)],["Public Intake Today",Jn(e.requestsToday)],["Orders Received Today",Jn(e.ordersReceivedToday)]];pe.chartStats.forEach((m,p)=>{let[M,y]=g[p]||["Platform signal","0"];m.querySelector("small").textContent=M,m.querySelector("strong").textContent=y}),pe.timelineConsoleDetail.textContent=`${n.length} day activity view`,pe.timelineConsoleWindow.textContent=`${n.length} Days`;let _=[...document.querySelectorAll("[data-bucket-filter]")];["All","Systems","Signals"].forEach((m,p)=>{_[p]&&(_[p].textContent=m,_[p].dataset.bucketFilter=p===0?"all":p===1?"systems":"signals")})}function Gv(s){let e=s.health?.metrics||[],t=pe.summarySource.querySelector(".summary-grid");t.innerHTML=e.map(n=>`
    <article class="metric-card health-metric-card status-${nt(n.status)}">
      <div class="health-metric-head"><span>${nt(n.shortLabel)}</span><b>${nt(n.statusLabel)}</b></div>
      <strong>${nt(n.valueText)}</strong>
      <div class="health-metric-period">
        <span>${nt(n.statisticLabel||"Current")}</span>
        ${n.currentComparisonLabel?`<span>${nt(n.currentComparisonLabel)}</span>`:""}
      </div>
      <div class="metric-scale direction-${nt(n.direction)} ${n.status==="collecting"?"is-collecting":""}" style="--good-position:${Math.round(n.goodPosition||0)}%;--watch-position:${Math.round(n.watchPosition||0)}%" role="meter" aria-label="${nt(n.label)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(n.gaugePosition||0)}" aria-valuetext="${nt(`${n.valueText}, ${n.statusLabel}, ${n.directionLabel||""}`)}">
        <i style="left:${Math.max(0,Math.min(100,n.gaugePosition||0))}%"></i>
      </div>
      <small>${nt(n.target)}${n.directionLabel?` / ${nt(n.directionLabel)}`:""}</small>
      <p>${nt(n.basis)}${n.sampleCount?` / ${Jn(n.sampleCount)} samples`:""}</p>
    </article>
  `).join("")}function Wv(s){pe.rulesGrid.innerHTML=s.rules.map(e=>`
    <article class="rule-card">
      <h3>${nt(e.title)}</h3>
      <strong>${nt(e.summary)}</strong>
      <p>${nt(e.detail)}</p>
    </article>
  `).join("")}function Xv(s){let e=Math.max(1,...s.months.map(t=>t.added));pe.usageChart.innerHTML=s.months.map((t,n)=>{let i=Math.max(t.added?10:0,t.added/e*184);return`
      <article class="month-bar" data-month-index="${n}" title="View ${nt(t.label)} activity">
        <div class="month-plot"><div class="month-total" style="height:${i}px"></div><div class="month-fill" style="height:${i}px"></div></div>
        <div class="month-labels"><strong>${nt(t.valueLabel)}</strong><span>Company activity</span><small>${nt(t.label)}</small></div>
      </article>
    `}).join(""),pe.usageChart.querySelectorAll(".month-bar").forEach(t=>{t.addEventListener("click",()=>vl(Number(t.dataset.monthIndex)))})}function bu(s){let e=s.buckets,t=Math.max(1,...s.buckets.map(n=>n.size));pe.bucketList.innerHTML=e.map((n,i)=>{let r=Math.max(4,n.size/t*100);return`
      <article class="bucket-card" data-bucket-index="${i}" title="Focus ${nt(n.title)} in the 3D model">
        <div class="bucket-card-main">
          <div><h3 class="bucket-title">${nt(n.title)}</h3><div class="bucket-meta">${nt(n.valueLabel)} - company scoped</div></div>
          <div class="bar-track" aria-hidden="true"><div class="bar-fill" style="width:${r}%"></div></div>
          <div class="bucket-size"><span>${r.toFixed(0)}%</span>${nt(n.valueLabel)}</div>
        </div>
        <details class="bucket-source"><summary>System context <span>${nt(n.badge)}</span></summary><div class="bucket-source-list">
          ${n.rows.map(([a,o])=>`<div class="source-file"><span>${nt(a)}</span><strong>${nt(o)}</strong><small>${nt(n.title)}</small></div>`).join("")}
        </div></details>
      </article>
    `}).join(""),pe.bucketList.querySelectorAll(".bucket-card").forEach(n=>{n.addEventListener("click",i=>{i.target.closest(".bucket-source")||fi?.focusBucket(Number(n.dataset.bucketIndex))})})}function qv(s,e){return!e||`${s.name} ${s.bucket} ${s.category} ${s.equipment}`.toLowerCase().includes(e.toLowerCase())}function wu(s){let e=pe.search.value.trim(),n=[...s.files].sort((i,r)=>r.size-i.size).filter(i=>qv(i,e));pe.filesCount.textContent=`${n.length} shown`,pe.fileEmpty.hidden=n.length>0,pe.fileList.innerHTML=n.map(i=>{let r=s.files.indexOf(i);return`
      <article class="file-row" data-file-index="${r}" data-file-type="signal">
        <div class="file-token" aria-hidden="true">SIG</div>
        <div><h3 class="file-name">${nt(i.name)}</h3><p class="file-meta">${nt(i.bucket)} - ${nt(i.category)}</p></div>
        <div class="file-equipment">${nt(i.equipment)}</div>
        <button class="button open-file" data-file-index="${r}" type="button">Inspect</button>
        <div class="file-size">${nt(i.valueLabel)}</div>
      </article>
    `}).join(""),pe.fileList.querySelectorAll(".open-file").forEach(i=>{i.addEventListener("click",r=>{r.stopPropagation();let a=s.files[Number(i.dataset.fileIndex)];a&&$v(a)})}),pe.fileList.querySelectorAll(".file-row").forEach(i=>{i.addEventListener("click",()=>fi?.focusFile(Number(i.dataset.fileIndex)))})}function Yv(s){pe.opsGrid.innerHTML=s.operations.map(e=>`
    <article class="ops-card"><span class="severity ${nt(e.severity)}">${nt(e.severity)}</span><h3>${nt(e.title)}</h3><p>${nt(e.detail)}</p></article>
  `).join("")}function $v(s){pe.dialogTitle.textContent=s.name,pe.dialogDetails.innerHTML=`
    <dt>System</dt><dd>${nt(s.bucket)}</dd>
    <dt>Signal</dt><dd>${nt(s.valueLabel)}</dd>
    <dt>Context</dt><dd>${nt(s.equipment)}</dd>
    <dt>Scope</dt><dd>Current company / all plants</dd>
    <dt>Status</dt><dd>${nt(s.status)}</dd>
  `,pe.dialog.open||pe.dialog.showModal()}function vl(s){let e=tn?.days[s];xl=e?.key??null,pe.timelineDetail.textContent=e?`${e.label}: ${e.requests} intake / ${e.orders} orders / ${e.total} total`:"Awaiting activity sample",pe.timelineMonths.forEach(t=>t.classList.toggle("active",Number(t.dataset.timelineMonth)===s)),pe.timelineMonths.forEach(t=>t.setAttribute("aria-pressed",String(Number(t.dataset.timelineMonth)===s))),pe.timelineDays.style.setProperty("--selected-day",Math.max(0,s)),pe.timelineDays.classList.toggle("has-days",!!e),pe.usageChart.querySelectorAll(".month-bar").forEach(t=>t.classList.toggle("active",Number(t.dataset.monthIndex)===s))}function Eu(s=null){pe.timelineSource.open=!0,op("timeline"),pe.zoneIndicator.textContent="Viewing: Activity Runway",s!==null&&vl(s),requestAnimationFrame(()=>pe.timelineSource.scrollIntoView({behavior:document.documentElement.dataset.motion==="off"?"instant":"smooth",block:"start"}))}function op(s){pe.stageActions.forEach(e=>{let t=e.dataset.worldTarget===s;e.classList.toggle("active",t),e.setAttribute("aria-pressed",String(t))})}function lp(s){tn=Fv(s||Es),Vv(tn),Gv(tn),Wv(tn),Xv(tn),bu(tn),wu(tn),Yv(tn),pe.refresh.classList.remove("refreshing");let e=pe.refresh.querySelector("span:last-child");e&&(e.textContent="Refresh"),pe.updated.textContent=`Sampled ${new Date(s?.sampledAt||Date.now()).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}`,kv(tn),fi?fi.updateSnapshot(tn):fi=ip({canvas:pe.canvas,touchTargets:pe.touchTargets,tooltip:pe.tooltip,buckets:tn.buckets,months:tn.months,files:tn.files,core:tn.core,activity:tn.recentActivity,onInspection:zv,onMotionChange:Hv,motionPaused:localStorage.getItem("maintainops.performanceMotion")==="off",formatBytes:t=>`${Jn(t/Ml)} events`,onZoneChange:t=>{op(t.id),pe.zoneIndicator.textContent=`Viewing: ${t.label}`},onBucketSelected:()=>{Tu="all",bu(tn)},onMonthSelected:(t,n)=>Eu(n),onFileSelected:()=>{},onVaultSelected:()=>{pe.summarySource.open=!0},qualityPreference:localStorage.getItem("maintainops.performanceQuality")||"auto",onPerformanceSample:t=>{window.parent.postMessage({type:"maintainops-platform-spatial-telemetry",sample:t},As)},onQualityChange:t=>cp(t.preference,t.effective),onFirstRender:t=>{sp||(sp=!0,document.documentElement.classList.add("platform-spatial-ready"),window.__MAINTAIN_OPS_PLATFORM_SPATIAL_READY=!0,window.parent.postMessage({type:"maintainops-platform-spatial-rendered"},As),window.parent.postMessage({type:"maintainops-platform-spatial-telemetry",sample:{...t,readyMs:performance.now()-Pv}},As))}})}function cp(s,e){pe.qualityButtons.forEach(t=>{let n=t.dataset.qualityTier===s;t.classList.toggle("active",n),t.setAttribute("aria-pressed",String(n));let i=t.dataset.qualityTier==="performance"?"Efficient":t.dataset.qualityTier==="cinematic"?"Ultra":"Auto";t.textContent=t.dataset.qualityTier==="auto"&&e?`${i}: ${e==="performance"?"Efficient":e==="cinematic"?"Ultra":"Balanced"}`:i})}function Kv(){let s=pe.refresh.querySelector("span:last-child");pe.refresh.classList.add("refreshing"),s&&(s.textContent="Sampling"),window.parent.postMessage({type:"maintainops-platform-spatial-refresh"},As)}function Zv(){pe.exit?.addEventListener("click",s=>{if(window.self===window.top){localStorage.setItem("maintainops.activeSection","mywork");return}s.preventDefault(),window.parent.postMessage({type:"maintainops-platform-spatial-exit"},As)}),document.querySelectorAll("[data-bucket-filter]").forEach(s=>{s.addEventListener("click",()=>{Tu=s.dataset.bucketFilter,document.querySelectorAll("[data-bucket-filter]").forEach(e=>e.classList.toggle("active",e===s)),bu(tn)})}),pe.sourcePanels.forEach(s=>s.addEventListener("toggle",()=>{s.open&&pe.sourcePanels.forEach(e=>{e!==s&&(e.open=!1)})})),pe.search.addEventListener("input",()=>wu(tn)),pe.clearSearch.addEventListener("click",()=>{pe.search.value="",pe.search.focus(),wu(tn)}),pe.refresh.addEventListener("click",Kv),pe.motion.addEventListener("click",()=>{let s=pe.motion.getAttribute("aria-pressed")==="true";localStorage.setItem("maintainops.performanceMotion",s?"off":"on"),fi?.setMotionPaused(s)}),pe.qualityButtons.forEach(s=>s.addEventListener("click",()=>{let e=s.dataset.qualityTier||"auto";localStorage.setItem("maintainops.performanceQuality",e);let t=fi?.setQuality(e);cp(e,t?.effective||"")})),pe.stageActions.forEach(s=>s.addEventListener("click",()=>{let e=s.dataset.worldTarget;e==="timeline"?Eu():fi?.setView(e)})),window.addEventListener("keydown",s=>{if(s.key==="Escape"&&!pe.inspector.hidden){fi?.setView("overview"),pe.stageActions[0]?.focus({preventScroll:!0});return}if(s.altKey||s.ctrlKey||s.metaKey||s.target instanceof HTMLInputElement)return;let e=["overview","buckets","timeline","files","vault"],t=Number(s.key)-1;t<0||t>=e.length||(s.preventDefault(),e[t]==="timeline"?Eu():fi?.setView(e[t]))})}window.addEventListener("message",s=>{s.origin!==As||s.data?.type!=="maintainops-platform-spatial-snapshot"||(rp=!0,document.documentElement.classList.remove("platform-spatial-standalone"),lp(s.data.snapshot||Es))});pe=Bv();Zv();window.parent.postMessage({type:"maintainops-platform-spatial-ready"},As);window.setTimeout(()=>{rp||(document.documentElement.classList.add("platform-spatial-standalone"),lp(Es))},800);})();
//# sourceMappingURL=platformSpatial.601eb72bcb.js.map
