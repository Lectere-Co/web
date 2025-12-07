<script>
	import HeroSection from './HeroSection.svelte';
	import ProblemSection from './ProblemSection.svelte';
	import WhatIsLectere from './WhatIsLectere.svelte';
	import HowItWorks from './HowItWorks.svelte';
	import ProductDemo from './ProductDemo.svelte';
	import WhoItsFor from './WhoItsFor.svelte';
	import BusinessUseCases from './BusinessUseCases.svelte';
	import CompetitiveComparison from './CompetitiveComparison.svelte';
	import SocialImpact from './SocialImpact.svelte';
	import PricingSection from './PricingSection.svelte';
	import Testimonials from './Testimonials.svelte';
	import FinalCTA from './FinalCTA.svelte';
	import Footer from './Footer.svelte';

	let mouseX = $state(0);
	let mouseY = $state(0);
	
	function handleMouseMove(e) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	}
</script>

<div class="app" role="application" onmousemove={handleMouseMove}>
	<HeroSection {mouseX} {mouseY} />
	<ProblemSection />
	<WhatIsLectere />
	<HowItWorks />
	<ProductDemo />
	<WhoItsFor />
	<BusinessUseCases />
	<CompetitiveComparison />
	<SocialImpact />
	<PricingSection />
	<Testimonials />
	<FinalCTA />
	<Footer />
</div>

<style>
	.app {
		width: 100%;
		min-height: 100vh;
		background: #0a0a0f;
		color: #ffffff;
		overflow-x: hidden;
	}
</style>
