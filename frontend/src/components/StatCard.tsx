import "./StatCard.css";

interface Props{

title:string;

value:number;

emoji:string;

}

export default function StatCard({

title,

value,

emoji

}:Props){

return(

<div className="card">

<h2>

{emoji}

</h2>

<h3>

{value}

</h3>

<p>

{title}

</p>

</div>

);

}