(()=>{"use strict";var e={};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var s=e.g.document;if(!t&&s&&(s.currentScript&&"SCRIPT"===s.currentScript.tagName.toUpperCase()&&(t=s.currentScript.src),!t)){var r=s.getElementsByTagName("script");if(r.length)for(var n=r.length-1;n>-1&&(!t||!/^http(s?):/.test(t));)t=r[n--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})();const t=[{id:1,userName:"EmilyDavis",recipeName:"Lemon Cake",photo:e.p+"src/assets/1.jpg"},{id:2,userName:"EmmaWilson",recipeName:"French Toast",photo:e.p+"src/assets/2.jpg"},{id:3,userName:"LucasGonzalez",recipeName:"Romantic Breakfast",photo:e.p+"src/assets/3.jpg"},{id:4,userName:"AmeliaHernandez",recipeName:"Toast Board",photo:e.p+"src/assets/4.jpg"},{id:5,userName:"AndrewHall",recipeName:"Strawberrie Pancakes",photo:e.p+"src/assets/5.jpg"},{id:6,userName:"MiaKing",recipeName:"Tomato Baskets",photo:e.p+"src/assets/6.jpg"},{id:7,userName:"SaraDavis",recipeName:"Tuna Entree",photo:e.p+"src/assets/7.jpg"},{id:8,userName:"JuliaWilson",recipeName:"Healthy bowl",photo:e.p+"src/assets/8.jpg"},{id:9,userName:"AndrewHall",recipeName:"Berries cakes",photo:e.p+"src/assets/9.jpg"},{id:10,userName:"MiaKing",recipeName:"Cheesecake",photo:e.p+"src/assets/10.jpg"},{id:11,userName:"SaraDavis",recipeName:"Healthy Lunch",photo:e.p+"src/assets/11.jpg"},{id:12,userName:"JuliaWilson",recipeName:"Margarita Pizza",photo:e.p+"src/assets/12.jpg"},{id:13,userName:"Cucpcakes",recipeName:"cupcake",photo:e.p+"src/assets/13.jpg"},{id:14,userName:"JuliAnderson",recipeName:"eggs",photo:e.p+"src/assets/14.jpg"},{id:15,userName:"JuliaMorris",recipeName:"berries",photo:e.p+"src/assets/15.jpg"}],s=[{id:1,userName:"User1",photo:e.p+"src/assets/profile1.jpg"},{id:2,userName:"User2",photo:e.p+"src/assets/profile2.jpg"},{id:3,userName:"User3",photo:e.p+"src/assets/profile3.jpg"},{id:4,userName:"User4",photo:e.p+"src/assets/profile4.jpg"},{id:5,userName:"User5",photo:e.p+"src/assets/profile5.jpg"},{id:6,userName:"User6",photo:e.p+"src/assets/profile6.jpg"}];var r,n,o,i,a;!function(e){e.photo="photo",e.userName="userName",e.recipeName="recipeName"}(r||(r={}));class c extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return Object.values(r)}attributeChangedCallback(e,t,s){t!==s&&this.render()}connectedCallback(){this.render(),this.addHeartButtonListener()}render(){if(this.shadowRoot){const e=this.getAttribute(r.photo)||"Not found",t=this.getAttribute(r.recipeName)||"Not found",s=this.getAttribute(r.userName)||"Not found";this.shadowRoot.innerHTML=`\n              <link rel="stylesheet" href="../src/components/card/card.css">\n                <div class="post">\n                    <div id="photo">\n                        <img id="img" src="${e}">\n                    </div>\n                    <div class="info">\n                        <div class="title">\n                             <h1>${t}</h1>\n                        </div>\n                        <div class="subtitle">\n                            <p>${s}</p>\n                            <button class="heart-button">\n                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">\n                                    <path class="heart-outline" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="#ff9da6" stroke-width="2"/>\n                                </svg>\n                            </button>\n                        </div>\n                    </div>\n                </div>\n            `}}addHeartButtonListener(){var e;const t=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(".heart-button");t&&t.addEventListener("click",(()=>{t.classList.toggle("filled");const e=t.querySelector(".heart-outline");e&&(t.classList.contains("filled")?(e.setAttribute("fill","#ff9da6"),e.setAttribute("stroke","#ff9da6")):(e.setAttribute("fill","none"),e.setAttribute("stroke","#ff9da6")))}))}}customElements.define("component-post",c),function(e){e.photo="photo"}(n||(n={}));class l extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return Object.values(n)}attributeChangedCallback(e,t,s){t!==s&&this.render()}connectedCallback(){this.render()}render(){if(this.shadowRoot){const e=this.getAttribute(n.photo)||"Not found";this.shadowRoot.innerHTML=`\n              <link rel="stylesheet" href="../src/components/profileStorie/storie.css">\n                <div id="photo">\n                   <img id="img" src="${e}">\n                </div>\n    \n            `}}}customElements.define("profile-storie",l),function(e){e.placeholder="placeholder"}(o||(o={}));class h extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return Object.values(o)}attributeChangedCallback(e,t,s){t!==s&&this.render()}connectedCallback(){this.render()}render(){if(this.shadowRoot){const e=this.getAttribute(o.placeholder)||"Search...";this.shadowRoot.innerHTML=`\n                <link rel="stylesheet" href="../src/components/search-bar/styles.css">\n                <div class="search-bar">\n                    <input type="text" class="search-input" placeholder="${e}">\n                    <button class="search-button">\n                        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search">\n                             <circle cx="11" cy="11" r="8"></circle>\n                             <line x1="21" y1="21" x2="16.65" y2="16.65"></line>\n                         </svg>\n                        </button>\n                </div>\n            `}}}customElements.define("search-bar",h),function(e){e.profilePicture="profilePicture"}(i||(i={}));class d extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return Object.values(i)}attributeChangedCallback(e,t,s){t!==s&&this.render()}connectedCallback(){this.render()}render(){this.shadowRoot&&(this.getAttribute(i.profilePicture),this.shadowRoot.innerHTML='\n                <link rel="stylesheet" href="../src/components/left-bar/left-bar.css">\n                <div class="sidebar">\n                    <div class="profile-section">\n                        <div class="profile-picture"></div>\n                    </div>\n                    <div class="menu">\n                        <button class="menu-item active">\n                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home">\n                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>\n                                <polyline points="9 22 9 12 15 12 15 22"></polyline>\n                            </svg>\n                        </button>\n                        <button class="menu-item">\n                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart">\n                                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z"></path>\n                            </svg>\n                        </button>\n                        <button class="menu-item">\n                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">\n                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>\n                                <circle cx="12" cy="7" r="4"></circle>\n                            </svg>\n                        </button>\n                        <button class="menu-item">\n                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings">\n                                <circle cx="12" cy="12" r="3"></circle>\n                                <path d="M19.4 15a1.77 1.77 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.77 1.77 0 0 0-1.82-.33 1.77 1.77 0 0 0-1 1.6v.09a2 2 0 0 1-4 0v-.09a1.77 1.77 0 0 0-1-1.6 1.77 1.77 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.77 1.77 0 0 0 5 15a1.77 1.77 0 0 0-1.6-1H3.31a2 2 0 0 1 0-4h.09a1.77 1.77 0 0 0 1.6-1 1.77 1.77 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.77 1.77 0 0 0 9 5a1.77 1.77 0 0 0 1-1.6V3.31a2 2 0 0 1 4 0v.09a1.77 1.77 0 0 0 1 1.6 1.77 1.77 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.77 1.77 0 0 0-.33 1.82v.09a1.77 1.77 0 0 0 1.6 1z"></path>\n                            </svg>\n                        </button>\n                        <div class="exit">\n                        <button class="menu-item">\n                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out">\n                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>\n                                <polyline points="16 17 21 12 16 7"></polyline>\n                                <line x1="21" y1="12" x2="9" y2="12"></line>\n                            </svg>\n                        </button>\n                        </div>\n                    </div>\n                </div>\n            ')}}customElements.define("user-sidebar",d),function(e){e.activeIcon="activeIcon"}(a||(a={}));class p extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return Object.values(a)}attributeChangedCallback(e,t,s){t!==s&&this.render()}connectedCallback(){this.render()}render(){if(this.shadowRoot){const e=this.getAttribute(a.activeIcon)||"home";this.shadowRoot.innerHTML=`\n                <link rel="stylesheet" href="../src/components/bottomBar/BottomNavbar.css">\n                <div class="navbar">\n                    <button class="menu-item ${"home"===e?"active":""}">\n                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>\n                            <polyline points="9 22 9 12 15 12 15 22"></polyline>\n                        </svg>\n                    </button>\n                    <button class="menu-item ${"heart"===e?"active":""}">\n                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n                            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z"></path>\n                        </svg>\n                    </button>\n                    <button class="menu-item ${"search"===e?"active":""}">\n                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n                            <circle cx="11" cy="11" r="8"></circle>\n                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>\n                        </svg>\n                    </button>\n                    <button class="menu-item ${"user"===e?"active":""}">\n                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>\n                            <circle cx="12" cy="7" r="4"></circle>\n                        </svg>\n                    </button>\n                </div>\n            `}}}customElements.define("bottom-navbar",p);class u extends HTMLElement{constructor(){super(),this.recipesList=[],this.storiesList=[],this.attachShadow({mode:"open"}),t.forEach((e=>{const t=this.ownerDocument.createElement("component-post");t.setAttribute(r.photo,e.photo),t.setAttribute(r.userName,e.userName),t.setAttribute(r.recipeName,e.recipeName),this.recipesList.push(t)})),s.forEach((e=>{const t=this.ownerDocument.createElement("profile-storie");t.setAttribute(n.photo,e.photo),this.storiesList.push(t)}))}connectedCallback(){this.render()}render(){if(this.shadowRoot){this.shadowRoot.innerHTML=` \n                <link rel="stylesheet" href="../src/styles.css">\n                <div id="main-container">\n                    <div id="sidebar">\n                        <user-sidebar ${i.profilePicture}></user-sidebar>\n                    </div>\n                    <div id="content">\n                        <div id="arriba">\n                            <div id="story-container"></div>\n                            <div id="derecha">\n                                <search-bar ${o.placeholder}="Search recipe..."></search-bar>\n                            </div>\n                        </div>\n                        <div id="post">\n                            <div id="component-post"></div>\n                        </div>\n                    </div>\n                    <bottom-navbar ${a.activeIcon}="home"></bottom-navbar>\n                </div>\n            `;const e=this.shadowRoot.querySelector("#story-container"),t=this.shadowRoot.querySelector("#component-post");this.storiesList.forEach((t=>{e&&e.appendChild(t)})),this.recipesList.forEach((e=>{t&&t.appendChild(e)}))}}}customElements.define("app-container",u)})();