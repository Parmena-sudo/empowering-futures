import { useState } from "react";
import { BookOpen, Users, Megaphone, Mail, Phone, MapPin, Menu, X, HandHeart, ShieldCheck } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function Navbar() {
  const [open, setOpen] = useState(false);
  const nav = ["About", "Impact", "Programs", "Team", "Donate", "Contact"];
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brandBlue via-brandGreen to-brandGold text-white font-black flex items-center justify-center">EF</div>
          <div><h1 className="font-bold text-brandBlue leading-tight">Empowering Futures</h1><p className="text-xs text-slate-500">Grassroots Empowerment Network</p></div>
        </a>
        <nav className="hidden md:flex gap-6 text-sm font-medium">{nav.map(n=><a key={n} href={`#${n.toLowerCase()}`} className="hover:text-brandBlue">{n}</a>)}</nav>
        <button className="md:hidden" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button>
      </div>
      {open && <div className="md:hidden bg-white border-t px-5 py-3">{nav.map(n=><a key={n} href={`#${n.toLowerCase()}`} onClick={()=>setOpen(false)} className="block py-2 font-medium">{n}</a>)}</div>}
    </header>
  );
}

function Form({ type }) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    const body = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const endpoint = type === "contact" ? "/contact" : type === "volunteer" ? "/volunteer" : "/donation-interest";
      const res = await fetch(`${API_URL}${endpoint}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error("Request failed");
      e.currentTarget.reset();
      setStatus("Thank you. Your message has been received.");
    } catch {
      setStatus("Something went wrong. Please email grassrootsempowermentnetwork@gmail.com directly.");
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <input name="name" required placeholder="Your name" className="w-full border rounded-xl p-3" />
      <input name="email" type="email" required placeholder="Email address" className="w-full border rounded-xl p-3" />
      {type !== "contact" && <input name="phone" placeholder="Phone / WhatsApp" className="w-full border rounded-xl p-3" />}
      <textarea name="message" required placeholder={type==="contact"?"Your message":type==="volunteer"?"How would you like to support?":"Tell us about your donation interest"} rows="4" className="w-full border rounded-xl p-3" />
      <button disabled={loading} className="bg-brandBlue text-white px-5 py-3 rounded-xl font-bold">{loading ? "Sending..." : "Submit"}</button>
      {status && <p className="text-sm text-slate-600">{status}</p>}
    </form>
  );
}

export default function App() {
  const stats = [["200+","Girls retained in school"],["50","Girls directly mentored"],["10+","Awareness sessions"],["20%","Attitude shift recorded"]];
  const programs = [[BookOpen,"School Support","Learning materials, sanitary pads, and basic support so poverty does not quietly push girls out of class."],[Users,"Mentorship","Safe spaces where girls build confidence, discuss challenges, and receive guidance."],[Megaphone,"Community Dialogue","Radio and community conversations involving girls, parents, teachers, and local leaders."]];
  const team = [["Deng Kuol Parmena Aguto","Project Lead","Leads strategy, partnerships, project planning, and representation."],["Abel Ajak Geu","Community Engagement Lead","Coordinates outreach with schools, parents, pupils, and local leaders."],["Miss Awuok Deborah Ayii","Monitoring & Evaluation Lead","Supports impact tracking, mentorship outcomes, attendance monitoring, and accountability."]];

  return (
    <div className="min-h-screen text-slate-800">
      <Navbar/>
      <section id="home" className="bg-gradient-to-br from-sky-900 via-sky-700 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-5 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex gap-2 items-center bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm mb-6"><ShieldCheck size={16}/> Community-led education initiative in South Sudan</div>
            <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6">Replacing early marriage with education, one girl at a time.</h2>
            <p className="text-lg text-sky-50 leading-relaxed mb-8">Empowering Futures works with girls, schools, parents, and local leaders in Mingkaman and surrounding rural communities to keep girls in school through mentorship, awareness, and practical support.</p>
            <div className="flex gap-4 flex-wrap"><a href="#about" className="bg-white text-sky-800 px-6 py-3 rounded-2xl font-bold">Explore Our Work</a><a href="#donate" className="border border-white px-6 py-3 rounded-2xl font-bold">Donate Now</a></div>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-3xl p-6 grid grid-cols-2 gap-4">{stats.map(([value,label])=><div key={label} className="bg-white/10 rounded-2xl p-5 text-center"><h3 className="text-4xl font-black">{value}</h3><p className="text-sm text-sky-100 mt-2">{label}</p></div>)}</div>
        </div>
      </section>

      <section id="about" className="max-w-7xl mx-auto px-5 py-20 grid lg:grid-cols-2 gap-12">
        <div><p className="text-brandBlue font-bold uppercase mb-3">About Us</p><h3 className="text-3xl md:text-5xl font-black mb-6">Built from lived experience, not boardroom guesses.</h3><p className="text-lg text-slate-600 leading-relaxed mb-5">Empowering Futures was born from the realities of girls who leave school quietly because of poverty, displacement, lack of support, and early marriage.</p><p className="text-lg text-slate-600 leading-relaxed">We meet immediate needs while also changing long-term attitudes. We do not only speak about girls. We create platforms where girls speak for themselves.</p></div>
        <div className="bg-white p-8 rounded-3xl shadow border space-y-6"><div><h4 className="font-black text-xl text-brandBlue">Mission</h4><p className="text-slate-600">To reduce early girl-child marriage and school dropout through mentorship, awareness, and practical school support.</p></div><div><h4 className="font-black text-xl text-brandBlue">Vision</h4><p className="text-slate-600">A future where every girl can stay in school, lead with confidence, and shape her own life.</p></div><div><h4 className="font-black text-xl text-brandBlue">Values</h4><p className="text-slate-600">Listening, dignity, trust, local ownership, and leadership close to the community.</p></div></div>
      </section>

      <section id="impact" className="bg-white py-20 border-y"><div className="max-w-7xl mx-auto px-5"><div className="text-center max-w-3xl mx-auto mb-12"><p className="text-brandBlue font-bold uppercase mb-3">Impact</p><h3 className="text-3xl md:text-5xl font-black mb-5">Small work. Real results.</h3><p className="text-lg text-slate-600">Behind every number is a girl, a classroom, and a future that did not end too early.</p></div><div className="grid md:grid-cols-4 gap-6">{stats.map(([value,label])=><div key={label} className="bg-slate-50 border rounded-3xl p-8 text-center"><h4 className="text-5xl font-black text-brandBlue mb-3">{value}</h4><p className="font-semibold text-slate-600">{label}</p></div>)}</div></div></section>

      <section id="programs" className="max-w-7xl mx-auto px-5 py-20"><div className="text-center max-w-3xl mx-auto mb-12"><p className="text-brandBlue font-bold uppercase mb-3">Programs</p><h3 className="text-3xl md:text-5xl font-black mb-5">Our three-pronged approach.</h3></div><div className="grid md:grid-cols-3 gap-8">{programs.map(([Icon,title,text])=><div key={title} className="bg-white rounded-3xl p-8 shadow border"><div className="w-16 h-16 rounded-2xl bg-sky-100 text-brandBlue flex items-center justify-center mb-6"><Icon size={30}/></div><h4 className="font-black text-2xl mb-3">{title}</h4><p className="text-slate-600 leading-relaxed">{text}</p></div>)}</div></section>

      <section id="team" className="bg-slate-100 py-20"><div className="max-w-7xl mx-auto px-5"><div className="text-center max-w-3xl mx-auto mb-12"><p className="text-brandBlue font-bold uppercase mb-3">Team</p><h3 className="text-3xl md:text-5xl font-black">The people behind the work.</h3></div><div className="grid md:grid-cols-3 gap-8">{team.map(([name,role,desc])=><div key={name} className="bg-white rounded-3xl p-8 text-center shadow border"><div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-br from-brandBlue to-brandGreen text-white font-black text-2xl flex items-center justify-center mb-6">{name.split(" ").slice(0,2).map(x=>x[0]).join("")}</div><h4 className="font-black text-xl">{name}</h4><p className="font-bold text-brandBlue my-2">{role}</p><p className="text-slate-600">{desc}</p></div>)}</div></div></section>

      <section id="donate" className="bg-gradient-to-br from-sky-900 via-sky-700 to-emerald-700 text-white py-20"><div className="max-w-5xl mx-auto px-5 text-center"><HandHeart size={48} className="mx-auto mb-5"/><h3 className="text-3xl md:text-5xl font-black mb-6">Every small contribution can keep a girl in school.</h3><p className="text-lg text-sky-50 mb-8">Support school supplies, mentorship, awareness sessions, and community implementation.</p><div className="bg-white/10 border border-white/20 rounded-3xl p-8 max-w-2xl mx-auto"><p className="text-lg"><b>MTN MoMo:</b> +233 246 594 247</p><p className="text-lg mt-2"><b>Account Name:</b> Deng Kuol Parmena Aguto</p><div className="mt-8 bg-white rounded-2xl p-5 text-slate-800 text-left"><h4 className="font-black text-xl mb-4">Donation Interest Form</h4><Form type="donation"/></div></div></div></section>

      <section id="contact" className="max-w-7xl mx-auto px-5 py-20 grid lg:grid-cols-2 gap-8"><div className="bg-white rounded-3xl p-8 shadow border"><p className="text-brandBlue font-bold uppercase mb-3">Contact</p><h3 className="text-3xl font-black mb-6">Let’s build change together.</h3><div className="space-y-4 text-slate-700"><p className="flex gap-3"><Mail className="text-brandBlue"/> grassrootsempowermentnetwork@gmail.com</p><p className="flex gap-3"><Phone className="text-brandBlue"/> +211 925 668 155</p><p className="flex gap-3"><MapPin className="text-brandBlue"/> Mingkaman, South Sudan</p></div></div><div className="bg-white rounded-3xl p-8 shadow border"><h4 className="font-black text-xl mb-4">Send us a message</h4><Form type="contact"/><div className="mt-8 pt-8 border-t"><h4 className="font-black text-xl mb-4">Volunteer or partner with us</h4><Form type="volunteer"/></div></div></section>

      <footer className="bg-slate-950 text-slate-300 py-10"><div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row justify-between gap-6"><div><h4 className="text-xl font-black text-white">Empowering Futures</h4><p className="text-sm text-slate-400">Grassroots Empowerment Network. Replacing early marriage with education, one girl at a time.</p></div><div className="text-sm text-slate-400"><p>© 2025 Grassroots Empowerment Network</p><p>Developed with mentorship support from ILF</p></div></div></footer>
    </div>
  );
}
