<section class="testimonials">
	<div class="container">
		<h2 class="section-title">Real people. Real frustration. Real relief.</h2>
		
		<div class="testimonials-grid">
			<div class="testimonial-card">
				<p class="quote">Before Lectere, I spent hours searching for help. Now I just follow the visual guide and get work done.</p>
				<div class="author">— Sarah K., Small Business Owner</div>
			</div>
			<div class="testimonial-card">
				<p class="quote">As a senior, new software was terrifying. Lectere makes me feel confident and independent again.</p>
				<div class="author">— Robert M., Retired Teacher</div>
			</div>
			<div class="testimonial-card">
				<p class="quote">Our support tickets dropped 65% in the first month. Lectere pays for itself immediately.</p>
				<div class="author">— Jessica T., SaaS Product Lead</div>
			</div>
		</div>
	</div>
</section>

<style>
	.testimonials {
		padding: 8rem 2rem;
		background: linear-gradient(180deg, #15111a 0%, #1a1520 100%);
	}
	
	.container {
		max-width: 1200px;
		margin: 0 auto;
	}
	
	.section-title {
		font-size: clamp(2rem, 6vw, 3.5rem);
		font-weight: 800;
		text-align: center;
		margin-bottom: 4rem;
		letter-spacing: -0.02em;
	}
	
	.testimonials-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}
	
	.testimonial-card {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(155, 39, 76, 0.3);
		border-radius: 24px;
		padding: 2.5rem;
		transition: all 0.3s ease;
	}
	
	.testimonial-card:hover {
		transform: translateY(-8px);
		border-color: rgba(235, 51, 110, 0.5);
		box-shadow: 0 12px 50px rgba(235, 51, 110, 0.2);
	}
	
	.quote {
		font-size: 1.2rem;
		line-height: 1.7;
		color: #e0e0e0;
		margin-bottom: 1.5rem;
		font-style: italic;
	}
	
	.quote::before {
		content: '"';
		color: var(--razzmatazz);
		font-size: 2rem;
		margin-right: 0.25rem;
	}
	
	.author {
		color: #888;
		font-size: 0.95rem;
	}
</style>
