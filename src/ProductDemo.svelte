<section class="product-demo">
	<div class="container">
		<h2 class="section-title">See it inside real software.</h2>
		
		<div class="demo-frame">
			<div class="demo-header">
				<div class="demo-dots">
					<span class="dot red"></span>
					<span class="dot yellow"></span>
					<span class="dot green"></span>
				</div>
				<div class="demo-title">Example Application</div>
			</div>
			<div class="demo-content">
				<div class="demo-cursor">👆</div>
				<div class="demo-highlight"></div>
				<div class="demo-tooltip">
					<p>Click here to create a new project</p>
				</div>
				<div class="demo-badge">✓ Task Complete</div>
			</div>
		</div>
		
		<div class="demo-cta">
			<button class="btn-primary">Try Live Demo</button>
		</div>
	</div>
</section>

<style>
	.product-demo {
		padding: 8rem 2rem;
		background: linear-gradient(180deg, #1a1520 0%, #15111a 100%);
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
	
	.demo-frame {
		max-width: 1000px;
		margin: 0 auto 3rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(155, 39, 76, 0.3);
		border-radius: 24px;
		overflow: hidden;
		backdrop-filter: blur(10px);
	}
	
	.demo-header {
		background: rgba(0, 0, 0, 0.3);
		padding: 1rem 1.5rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}
	
	.demo-dots {
		display: flex;
		gap: 0.5rem;
	}
	
	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}
	
	.dot.red { background: #ff5f56; }
	.dot.yellow { background: #ffbd2e; }
	.dot.green { background: #27c93f; }
	
	.demo-title {
		color: #888;
		font-size: 0.9rem;
	}
	
	.demo-content {
		position: relative;
		padding: 4rem 2rem;
		min-height: 400px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.demo-cursor {
		position: absolute;
		font-size: 2rem;
		animation: cursorMove 3s ease-in-out infinite;
	}
	
	@keyframes cursorMove {
		0%, 100% { transform: translate(0, 0); }
		50% { transform: translate(50px, -30px); }
	}
	
	.demo-highlight {
		width: 200px;
		height: 60px;
		border: 3px solid var(--razzmatazz);
		border-radius: 12px;
		animation: pulse 2s ease-in-out infinite;
	}
	
	@keyframes pulse {
		0%, 100% { opacity: 1; box-shadow: 0 0 20px rgba(235, 51, 110, 0.5); }
		50% { opacity: 0.7; box-shadow: 0 0 40px rgba(235, 51, 110, 0.8); }
	}
	
	.demo-tooltip {
		position: absolute;
		top: 2rem;
		left: 50%;
		transform: translateX(-50%);
		background: var(--amaranth-purple);
		padding: 1rem 1.5rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
		animation: fadeInDown 1s ease-out;
	}
	
	@keyframes fadeInDown {
		from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
		to { opacity: 1; transform: translateX(-50%) translateY(0); }
	}
	
	.demo-tooltip p {
		margin: 0;
		font-size: 1rem;
		color: white;
	}
	
	.demo-badge {
		position: absolute;
		bottom: 2rem;
		right: 2rem;
		background: linear-gradient(135deg, #27c93f, #1fa832);
		padding: 0.75rem 1.5rem;
		border-radius: 12px;
		font-weight: 600;
		box-shadow: 0 4px 20px rgba(39, 201, 63, 0.3);
		animation: fadeInUp 1s ease-out 1s backwards;
	}
	
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	.demo-cta {
		text-align: center;
	}
	
	.btn-primary {
		background: var(--razzmatazz);
		color: white;
		padding: 1rem 2.5rem;
		font-size: 1.1rem;
		font-weight: 600;
		border: none;
		border-radius: 16px;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 20px rgba(235, 51, 110, 0.3);
	}
	
	.btn-primary:hover {
		transform: translateY(-2px) scale(1.02);
		box-shadow: 0 6px 30px rgba(235, 51, 110, 0.5);
	}
</style>
