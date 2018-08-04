Date.prototype.Format = function (fmt) { //
    let o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * 判断浏览区是否支持canvas
 * @returns {boolean}
 */
export function isSupportCanvas() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}

/**
 * 判断浏览区是否是移动端
 * @returns {boolean}
 */
export function isPhone(){
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {  
        return true;  
    }else{  
        return false;  
    }  
}

/**
 * 获取某月最后一天的日期
 * @param number year
 * @param number month
 * @return {number}
 */
export function getLastDay(year, month) {
    var new_year = year; //取当前的年份
    var new_month = month++; //取下一个月的第一天，方便计算（最后一天不固定）
    if (month > 12) //如果当前大于12月，则年份转到下一年
    {
        new_month -= 12; //月份减
        new_year++; //年份增
    }
    var new_date = new Date(new_year, new_month, 1); //取当年当月中的第一天
    return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();
}

export function hasClass( elements,cName ){ 
  return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); 
} 

export function addClass( elements,cName ){ 
  if( !hasClass( elements,cName ) ){ 
    elements.className += " " + cName; 
  }; 
}

export function removeClass( elements,cName ){ 
  if( hasClass( elements,cName ) ){ 
    elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" ), " " );
  }; 
}

export function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

/**
 *
 * @param String id
 * @param Object id
 * @param Function id
 */
export function threeWaveBg(id, conf, wavDomCallback) {
    //return;
    if(isPhone()) return;
    if (!id) return;
    if (!conf || typeof conf == 'function') {
        wavDomCallback = conf;
        conf = {};
    }

    var SEPARATION = conf.s || 80,
        AMOUNTX = conf.x || 50,
        AMOUNTY = conf.y || 30;

    var domId = conf.id || '__THREE_WAVE__';

    var container;
    var camera, scene, renderer;

    var particles, particle, count = 0;

    var mouseX = 85,
        mouseY = -342;

    var windowHalfX = window.innerWidth / 1.8;
    var windowHalfY = window.innerHeight / 1.8;

    init();
    animate();

    function init() {

        var wavDom = document.getElementById(domId);
        if(wavDom){
            wavDom.parentNode.removeChild(wavDom);
        }

        container = document.createElement('div');
        document.getElementById(id).appendChild(container);
        container.style.position = 'absolute';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.overflow = 'hidden';
        container.style.top = '0';
        container.style.left = '0';
        container.style.zIndex = '-1';

        if (wavDomCallback && typeof wavDomCallback == 'function') {
            wavDomCallback(container);
        }
        //container.style.opacity = '0.2';

        camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 1000;

        scene = new THREE.Scene();

        particles = new Array();

        var PI2 = Math.PI * 2;
        var material = new THREE.ParticleCanvasMaterial({

            color: 0xe1e1e1,
            program: function (context) {

                context.beginPath();
                context.arc(0, 0, .6, 0, PI2, true);
                context.fill();

            }

        });

        var i = 0;

        for (var ix = 0; ix < AMOUNTX; ix++) {

            for (var iy = 0; iy < AMOUNTY; iy++) {

                particle = particles[i++] = new THREE.Particle(material);
                particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
                particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
                scene.add(particle);

            }

        }

        renderer = new THREE.CanvasRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('touchstart', onDocumentTouchStart, false);
        document.addEventListener('touchmove', onDocumentTouchMove, false);

        //

        window.addEventListener('resize', onWindowResize, false);

    }

    function onWindowResize() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    //

    function onDocumentMouseMove(event) {

        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;

    }

    function onDocumentTouchStart(event) {

        if (event.touches.length === 1) {

            event.preventDefault();

            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;

        }

    }

    function onDocumentTouchMove(event) {

        if (event.touches.length === 1) {

            event.preventDefault();

            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;

        }

    }

    //

    function animate() {

        requestAnimationFrame(animate);

        render();


    }

    function render() {

        camera.position.x += (mouseX - camera.position.x) * .05;
        camera.position.y += (-mouseY - camera.position.y) * .05;
        camera.lookAt(scene.position);

        var i = 0;

        for (var ix = 0; ix < AMOUNTX; ix++) {

            for (var iy = 0; iy < AMOUNTY; iy++) {

                particle = particles[i++];
                particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
                particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2;

            }

        }

        renderer.render(scene, camera);

        count += 0.1;

    }
}