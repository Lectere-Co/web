<section class="comparison">
	<div class="container">
		<h2 class="section-title">Why Lectere wins.</h2>
		
		<div class="comparison-table">
			<div class="comparison-row header">
				<div class="comparison-cell">Feature</div>
				<div class="comparison-cell">Docs</div>
				<div class="comparison-cell">Tours</div>
				<div class="comparison-cell lectere">Lectere</div>
			</div>
			<div class="comparison-row">
				<div class="comparison-cell">Real-time guidance</div>
				<div class="comparison-cell">❌</div>
				<div class="comparison-cell">❌</div>
				<div class="comparison-cell lectere">✅</div>
			</div>
			<div class="comparison-row">
				<div class="comparison-cell">Context-aware</div>
				<div class="comparison-cell">❌</div>
				<div class="comparison-cell">❌</div>
				<div class="comparison-cell lectere">✅</div>
			</div>
			<div class="comparison-row">
				<div class="comparison-cell">Auto-updates</div>
				<div class="comparison-cell">❌</div>
				<div class="comparison-cell">❌</div>
				<div class="comparison-cell lectere">✅</div>
			</div>
			<div class="comparison-row">
				<div class="comparison-cell">Works everywhere</div>
				<div class="comparison-cell">❌</div>
				<div class="comparison-cell">❌</div>
				<div class="comparison-cell lectere">✅</div>
			</div>
		</div>
	</div>
</section>

<style>
	.comparison {
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
	
	.comparison-table {
		max-width: 900px;
		margin: 0 auto;
		background: rgba(255, 255, 255, 0.02);
		border-radius: 24px;
		overflow: hidden;
		border: 1px solid rgba(155, 39, 76, 0.2);
	}
	
	.comparison-row {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr 1fr;
		gap: 1px;
		background: rgba(255, 255, 255, 0.05);
	}
	
	.comparison-row.header {
		background: rgba(0, 0, 0, 0.3);
	}
	
	.comparison-cell {
		padding: 1.5rem;
		background: rgba(10, 10, 15, 0.9);
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	
	.comparison-row.header .comparison-cell {
		font-weight: 700;
		font-size: 1.1rem;
	}
	
	.comparison-cell.lectere {
		background: linear-gradient(135deg, rgba(155, 39, 76, 0.2), rgba(235, 51, 110, 0.2));
		border-left: 3px solid var(--razzmatazz);
		font-weight: 600;
		box-shadow: 0 0 30px rgba(235, 51, 110, 0.2);
	}
	
	@media (max-width: 768px) {
		.comparison-row {
			grid-template-columns: 1.5fr repeat(3, 1fr);
			font-size: 0.9rem;
		}
		
		.comparison-cell {
			padding: 1rem 0.5rem;
		}
	}
</style>
