// Pure detection only; install availability is determined by the actual browser event.
export function installPlatform({userAgent='',platform='',maxTouchPoints=0,standalone=false,displayStandalone=false}={}) {
 if(standalone||displayStandalone)return 'installed';
 if(/iPad|iPhone|iPod/.test(userAgent)||(platform==='MacIntel'&&maxTouchPoints>1))return 'ios';
 if(/Android/.test(userAgent))return 'android';
 return 'desktop';
}
