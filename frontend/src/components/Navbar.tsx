import "./Navbar.css";

export default function Navbar(){

const date=

new Date();

return(

<nav className="navbar">

<h2>

🐾 Pet Alert Platform

</h2>

<div>

{date.toLocaleDateString()}

</div>

</nav>

);

}