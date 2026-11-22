const seedProjects = [
 {id:"saha-hotel",name:"SAHA HOTEL OS",category:"Hospitality · Yaoundé",description:"Hotel operations, room booking, guest access and front desk workflows.",status:"In progress",priority:"High",next:"Resolve deployment quota and complete end-to-end booking tests.",link:"https://github.com/ZOUACEDRIC/saha-hotel-os"},
 {id:"mboaai",name:"MboaAI",category:"Artificial intelligence · Cameroon",description:"Independent Cameroon-focused AI assistant and knowledge platform.",status:"In progress",priority:"High",next:"Validate document processing and run Ollama locally before server deployment.",link:"https://github.com/ZOUACEDRIC/MboaAI"},
 {id:"livecoreai",name:"LIVECOREAI",category:"AI creator tools",description:"AI avatar and creator media platform with persistent private media.",status:"In progress",priority:"High",next:"Validate media persistence, then define the Android app delivery path.",link:"https://github.com/ZOUACEDRIC/LIVECOREAI"},
 {id:"kamarket",name:"KaMarket",category:"Commerce · Cameroon",description:"Marketplace foundation and merchant onboarding for Cameroon.",status:"Planning",priority:"Medium",next:"Review launch checklist and confirm first-admin setup.",link:"https://github.com/ZOUACEDRIC/kamarket"},
 {id:"kolapay",name:"KolaPay",category:"Fintech infrastructure",description:"Wallet security foundations and transaction ledger.",status:"Planning",priority:"Medium",next:"Review ledger rules, reconciliation and security test coverage.",link:"https://github.com/ZOUACEDRIC/kolapay"},
 {id:"wanda-food",name:"WANDA FOOD Delivery",category:"Food delivery",description:"Food ordering and delivery platform; deployments previously reported blocked.",status:"Blocked",priority:"High",next:"Inspect deployment failure logs and restore a working production build.",link:"https://github.com/luminafield/WANDA-FOOD-delivery"},
 {id:"mobile-erp",name:"Mobile ERP Store",category:"Business software",description:"Mobile-first ERP and store management application.",status:"Planning",priority:"Medium",next:"Define the first complete inventory-to-sales workflow.",link:"https://github.com/ZOUACEDRIC/Mobile-ERP-Store"},
 {id:"sh-global",name:"SH GLOBAL",category:"Business platform",description:"SH Global web platform; last known production deployment was ready.",status:"In progress",priority:"Low",next:"Run a live user journey test and confirm current production health.",link:"https://github.com/luminafield/SH-GLOBAL"},
 {id:"proteus-library",name:"Proteus Custom Library",category:"Engineering · Electronics",description:"Custom Proteus components for electronics and embedded projects.",status:"Planning",priority:"Low",next:"Consolidate component models, pinouts and installation notes.",link:"https://github.com/ZOUACEDRIC/Proteus-Custom-Library"},
 {id:"smart-irrigation",name:"Smart Irrigation System",category:"IoT · Agriculture",description:"Sensor-driven irrigation controller with pumps, display and wireless monitoring.",status:"Planning",priority:"Medium",next:"Freeze the schematic and validate power, sensor and pump interfaces.",link:""}
];
let projects = loadProjects();
let currentView = "overview";
const $ = id => document.getElementById(id);
function loadProjects(){try{const saved=localStorage.getItem("saha-control-projects");return saved?JSON.parse(saved):seedProjects.map(p=>({...p}));}catch{return seedProjects.map(p=>({...p}));}}
function save(){localStorage.setItem("saha-control-projects",JSON.stringify(projects));}
function slugStatus(s){return s.toLowerCase().replaceAll(" ","-");}
function esc(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function render(){
 $("total-count").textContent=projects.length;
 $("active-count").textContent=projects.filter(p=>p.status==="In progress").length;
 $("blocked-count").textContent=projects.filter(p=>p.status==="Blocked").length;
 $("done-count").textContent=projects.filter(p=>p.status==="Completed").length;
 ["Planning","In progress","Blocked","Completed"].forEach((s,i)=>{$(["pipe-planning","pipe-progress","pipe-blocked","pipe-completed"][i]).textContent=projects.filter(p=>p.status===s).length;});
 const q=$("search").value.toLowerCase(),filter=$("status-filter").value;
 let shown=projects.filter(p=>(filter==="all"||p.status===filter)&&[p.name,p.category,p.description,p.next].join(" ").toLowerCase().includes(q));
 if(currentView==="priorities")shown=shown.filter(p=>p.priority==="High"||p.status==="Blocked");
 if(currentView==="roadmap")shown=[...shown].sort((a,b)=>["Blocked","In progress","Planning","Completed"].indexOf(a.status)-["Blocked","In progress","Planning","Completed"].indexOf(b.status));
 $("project-list").innerHTML=shown.length?shown.map(p=>`<div class="project-row"><div class="project-main"><div class="project-title">${esc(p.name)}</div><div class="project-desc">${esc(p.description)}</div><div class="category">${esc(p.category)}</div></div><span class="status ${slugStatus(p.status)}">${esc(p.status)}</span><span class="priority ${p.priority.toLowerCase()}">${esc(p.priority)} priority</span><button class="edit-btn" data-edit="${esc(p.id)}" aria-label="Edit ${esc(p.name)}">↗</button></div>`).join(""):'<div class="empty-state">No projects match this view. Try another filter or add a project.</div>';
 const priorities=projects.filter(p=>p.priority==="High"||p.status==="Blocked").sort((a,b)=>(a.status==="Blocked"?-1:0)-(b.status==="Blocked"?-1:0)).slice(0,4);
 $("priority-list").innerHTML=priorities.length?priorities.map((p,i)=>`<div class="priority-item"><span class="priority-number">0${i+1}</span><div><strong>${esc(p.name)}</strong><small>${esc(p.next||"Set the next action.")}</small></div></div>`).join(""):'<div class="empty-state">No urgent priorities. Nice work.</div>';
}
function openEditor(p){
 $("project-form").reset();$("project-id").value=p?.id||"";
 $("dialog-title").textContent=p?"Edit project":"Add a project";
 $("project-name").value=p?.name||"";$("project-category").value=p?.category||"";$("project-description").value=p?.description||"";
 $("project-status").value=p?.status||"Planning";$("project-priority").value=p?.priority||"Medium";
 $("project-next").value=p?.next||"";$("project-link").value=p?.link||"";
 $("delete-btn").hidden=!p;$("project-dialog").showModal();
}
$("project-list").addEventListener("click",e=>{const b=e.target.closest("[data-edit]");if(b)openEditor(projects.find(p=>p.id===b.dataset.edit));});
$("add-btn").addEventListener("click",()=>openEditor());$("close-dialog").addEventListener("click",()=>$("project-dialog").close());
$("project-form").addEventListener("submit",e=>{e.preventDefault();const id=$("project-id").value;const p={id:id||"p-"+Date.now(),name:$("project-name").value.trim(),category:$("project-category").value.trim(),description:$("project-description").value.trim(),status:$("project-status").value,priority:$("project-priority").value,next:$("project-next").value.trim(),link:$("project-link").value.trim()};if(id)projects=projects.map(x=>x.id===id?p:x);else projects.unshift(p);save();$("project-dialog").close();render();});
$("delete-btn").addEventListener("click",()=>{const id=$("project-id").value;if(id&&confirm("Delete this project from this browser's dashboard?")){projects=projects.filter(p=>p.id!==id);save();$("project-dialog").close();render();}});
$("search").addEventListener("input",render);$("status-filter").addEventListener("change",render);
document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>{currentView=b.dataset.view;document.querySelectorAll("[data-view]").forEach(x=>x.classList.toggle("active",x===b));const names={overview:["Good work starts with focus.","Track what matters. Clear blockers. Ship finished products.","Project portfolio"],projects:["Everything you are building.","A clear view of every project in your workspace.","All projects"],priorities:["Focus on what moves us forward.","High-priority work and anything currently blocked.","Priority projects"],roadmap:["See the delivery pipeline.","Move each project from planning to a tested, shipped product.","Roadmap"]};$("page-title").textContent=names[currentView][0];$("page-subtitle").textContent=names[currentView][1];$("list-title").textContent=names[currentView][2];$("crumb-view").textContent=names[currentView][2];render();}));
$("export-btn").addEventListener("click",()=>{const blob=new Blob([JSON.stringify({exportedAt:new Date().toISOString(),projects},null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="saha-projects.json";a.click();URL.revokeObjectURL(a.href);});
$("today").textContent=new Intl.DateTimeFormat(undefined,{weekday:"short",month:"short",day:"numeric",year:"numeric"}).format(new Date());
render();