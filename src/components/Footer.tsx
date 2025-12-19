import { motion } from 'motion/react';
import { Twitter, Linkedin, Github, Heart } from 'lucide-react';

const footerLinks = {
  Product: ['Features', 'Demo', 'Pricing', 'Integrations'],
  Company: ['About', 'Blog', 'Careers', 'Contact'],
  Resources: ['Documentation', 'Help Center', 'Community', 'API'],
  Legal: ['Privacy', 'Terms', 'Security'],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="container px-6 py-16">
        <div className="grid lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              className="text-2xl font-display font-medium text-gradient inline-block mb-4"
              whileHover={{ scale: 1.02 }}
            >
              Lectere
            </motion.div>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Software that teaches you while you use it.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-5 h-5 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href={`#${link.toLowerCase()}`}
                      className="text-muted-foreground hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Lectere. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> for better software experiences
          </p>
        </div>
      </div>
    </footer>
  );
}
