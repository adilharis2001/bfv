export default function LandingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">
          Private Body Composition Analysis in 60 Seconds
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          AI-powered body fat analysis. Your images are never stored.
        </p>
        <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-dark transition">
          Get Your Free Scan
        </button>
      </div>
    </div>
  );
}
