import { useState } from "react";
import axios from "axios";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const Contact = () => {

const [form, setForm] = useState({
name: "",
email: "",
phone: "",
message: ""
});

const handleChange = (e:any) => {

setForm({
...form,
[e.target.name]: e.target.value
});

};

const handleSubmit = async (e:any) => {

e.preventDefault();

await axios.post("https://maulik-art.onrender.com/api/contacts", form);

alert("Message Sent");

setForm({
name:"",
email:"",
phone:"",
message:""
});

};

return (
<>
<Navbar/>

<section className="px-20 py-20 min-h-screen">

<h1 className="text-4xl font-bold text-center mb-12">
Contact Us
</h1>

<form
onSubmit={handleSubmit}
className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-10 space-y-6"
>

<input
name="name"
value={form.name}
onChange={handleChange}
type="text"
placeholder="Your Name"
className="border p-3 rounded-xl w-full"
/>

<input
name="email"
value={form.email}
onChange={handleChange}
type="email"
placeholder="Your Email"
className="border p-3 rounded-xl w-full"
/>

<input
name="phone"
value={form.phone}
onChange={handleChange}
type="text"
placeholder="Phone Number"
className="border p-3 rounded-xl w-full"
/>

<textarea
name="message"
value={form.message}
onChange={handleChange}
placeholder="Your Message"
rows={5}
className="border p-3 rounded-xl w-full"
/>

<button className="bg-black text-white px-6 py-3 rounded-xl w-full">
Send Message
</button>

</form>

</section>

<Footer/>
</>
);

};

export default Contact;