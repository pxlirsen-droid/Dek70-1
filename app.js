function showPage(page){

document.querySelectorAll(".page")
.forEach(p=>p.style.display="none");

document.getElementById(page)
.style.display="block";
}

let subjectContainer =
document.getElementById("subjects");

function addSubject(){

function addSubject(){

const semester =
document.getElementById("semesterCount").value;

const row =
document.createElement("div");

row.className="subject-row";

let semesterInputs="";

for(let i=1;i<=semester;i++){

semesterInputs +=
`
<input
type="number"
class="grade"
placeholder="เทอม ${i}"
step="0.01"
min="0"
max="4">
`;

}

row.innerHTML=`

<input
type="text"
class="subject"
placeholder="ชื่อวิชา">

${semesterInputs}

<input
type="number"
class="credit"
placeholder="หน่วยกิต">

<button onclick="removeSubject(this)">
ลบ
</button>

`;

subjectContainer.appendChild(row);
}

function removeSubject(btn){
btn.parentElement.remove();
}

function calculateGrade(){

let subjects =
document.querySelectorAll(".subject");

let grades =
document.querySelectorAll(".grade");

let credits =
document.querySelectorAll(".credit");

let totalScore=0;
let totalCredit=0;

let data=[];

for(let i=0;i<subjects.length;i++){

let name=subjects[i].value;

let grade=
parseFloat(grades[i].value)||0;

let credit=
parseFloat(credits[i].value)||0;

totalScore+=grade*credit;

totalCredit+=credit;

data.push({
name:name,
grade:grade
});
}

let gpa=
(totalScore/totalCredit).toFixed(2);

document.getElementById("gpaResult")
.innerHTML=
"เกรดเฉลี่ย = "+gpa;

data.sort(
(a,b)=>b.grade-a.grade
);

let ranking="";

data.forEach((item,index)=>{

ranking+=
(index+1)+". "
+item.name+
" ("+item.grade+")<br>";

});

document.getElementById("ranking")
.innerHTML=ranking;

recommendFaculty(data);
analyzeField(data);
}
function recommendFaculty(data){

let top=
data[0]?.name||"";

let result="";

if(top.includes("ชีว")){

result=
`
<h3>คณะที่แนะนำ</h3>

<ul>
<li>แพทยศาสตร์</li>
<li>เภสัชศาสตร์</li>
<li>สัตวแพทยศาสตร์</li>
<li>พยาบาลศาสตร์</li>
</ul>
`;

}

else if(top.includes("คณิต")){

result=
`
<h3>คณะที่แนะนำ</h3>

<ul>
<li>วิศวกรรมศาสตร์</li>
<li>วิทยาการคอมพิวเตอร์</li>
<li>บัญชี</li>
</ul>
`;

}

else{

result=
"กรอกข้อมูลเพิ่มเติม";
}

document.getElementById("facultyResult")
.innerHTML=result;
}

addSubject();
function analyzeField(data){

let science=0;
let math=0;
let language=0;

data.forEach(item=>{

let name=item.name;

if(
name.includes("ชีว") ||
name.includes("เคมี")
){
science += item.grade;
}

if(
name.includes("คณิต") ||
name.includes("ฟิสิกส์")
){
math += item.grade;
}

if(
name.includes("ไทย") ||
name.includes("อังกฤษ") ||
name.includes("สังคม")
){
language += item.grade;
}

});

let result="";

if(science > math && science > language){

result = `
<h3>สายที่โดดเด่น</h3>

วิทยาศาสตร์สุขภาพ

เหมาะกับ

• แพทยศาสตร์
• เภสัชศาสตร์
• พยาบาลศาสตร์
• สัตวแพทยศาสตร์
`;
}

else if(math > science && math > language){

result = `
<h3>สายที่โดดเด่น</h3>

คำนวณและเทคโนโลยี

เหมาะกับ

• วิศวกรรมศาสตร์
• วิทยาการคอมพิวเตอร์
• สถิติ
• บัญชี
`;
}

else{

result = `
<h3>สายที่โดดเด่น</h3>

ภาษาและสังคม

เหมาะกับ

• นิติศาสตร์
• รัฐศาสตร์
• นิเทศศาสตร์
• อักษรศาสตร์
`;
}

document.getElementById("facultyResult")
.innerHTML += result;
}
