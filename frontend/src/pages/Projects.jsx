import CallToAction from "../components/CallToAction";

export default function Projects() {
  return (
    <div className="flex flex-col items-center justify-center max-w-2xl min-h-screen gap-6 p-3 pt-10 mx-auto">
      <h1 className="text-3xl font-semibold">Pojects</h1>
      <p className="text-gray-500 text-md">
        Build fun and engaging projects while learning HTML, CSS, and
        JavaScript!
      </p>
      <CallToAction />
    </div>
  );
}
