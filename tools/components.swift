// Lectere — native control renderer
// Renders the demo's atomic macOS controls in SwiftUI and exports them as the
// skins for the (still interactive) HTML demo in MacDemo.tsx:
//   • Tahoe-style desktop wallpaper (SwiftUI MeshGradient)
//   • Toggle switch — off / on
//   • Slider knob
//   • Window titlebar material strip
// Output: ../public/ui/*
//
//   swift tools/components.swift
//
import SwiftUI
import AppKit

let OUT = "/Users/rishblob/Documents/testsuite/lectere/marketing-site/public/ui"
try? FileManager.default.createDirectory(atPath: OUT, withIntermediateDirectories: true)

func c(_ hex: Int) -> Color {
    Color(red: Double((hex >> 16) & 0xff) / 255, green: Double((hex >> 8) & 0xff) / 255, blue: Double(hex & 0xff) / 255)
}

@MainActor
func writePNG(_ view: some View, _ name: String, _ w: CGFloat, _ h: CGFloat, scale: CGFloat = 3) {
    let r = ImageRenderer(content: view.frame(width: w, height: h))
    r.scale = scale
    r.isOpaque = false
    guard let cg = r.cgImage else { print("FAIL \(name)"); return }
    let rep = NSBitmapImageRep(cgImage: cg)
    guard let data = rep.representation(using: .png, properties: [:]) else { print("FAIL png \(name)"); return }
    try? data.write(to: URL(fileURLWithPath: "\(OUT)/\(name)"))
    print("OK \(name) \(cg.width)x\(cg.height)")
}

@MainActor
func writeJPG(_ view: some View, _ name: String, _ w: CGFloat, _ h: CGFloat, scale: CGFloat = 2) {
    let r = ImageRenderer(content: view.frame(width: w, height: h))
    r.scale = scale
    r.isOpaque = true
    guard let cg = r.cgImage else { print("FAIL \(name)"); return }
    let rep = NSBitmapImageRep(cgImage: cg)
    guard let data = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.86]) else { print("FAIL jpg \(name)"); return }
    try? data.write(to: URL(fileURLWithPath: "\(OUT)/\(name)"))
    print("OK \(name) \(cg.width)x\(cg.height)")
}

// MARK: - Tahoe wallpaper (clean dark plum mesh, one subtle warm glow)

struct Wallpaper: View {
    var body: some View {
        Group {
            if #available(macOS 15, *) {
                MeshGradient(
                    width: 3, height: 3,
                    points: [
                        .init(0, 0), .init(0.5, 0), .init(1, 0),
                        .init(0, 0.5), .init(0.5, 0.5), .init(1, 0.5),
                        .init(0, 1), .init(0.5, 1), .init(1, 1),
                    ],
                    colors: [
                        c(0x3a1733), c(0x241228), c(0x161020),
                        c(0x2a1330), c(0x1b1024), c(0x130d1c),
                        c(0x180e1e), c(0x140d1a), c(0x0c0814),
                    ]
                )
            } else {
                LinearGradient(colors: [c(0x2a1330), c(0x130d1c)], startPoint: .topLeading, endPoint: .bottomTrailing)
            }
        }
    }
}

// MARK: - Toggle switch

struct Switch: View {
    let on: Bool
    var body: some View {
        Capsule()
            .fill(on ? c(0x34c759) : Color(white: 0.84))
            .overlay(alignment: on ? .trailing : .leading) {
                Circle()
                    .fill(.white)
                    .shadow(color: .black.opacity(0.28), radius: 1.4, y: 1)
                    .padding(2)
            }
            .overlay(Capsule().strokeBorder(Color.black.opacity(on ? 0 : 0.05), lineWidth: 1))
    }
}

// MARK: - Slider knob

struct Knob: View {
    var body: some View {
        Circle()
            .fill(.white)
            .overlay(Circle().strokeBorder(Color.black.opacity(0.06), lineWidth: 0.6))
            .shadow(color: .black.opacity(0.32), radius: 1.6, y: 0.8)
            .padding(3)
    }
}

// MARK: - Titlebar material strip

struct Titlebar: View {
    var body: some View {
        ZStack {
            LinearGradient(colors: [c(0xf9f7fa), c(0xeeebf0)], startPoint: .top, endPoint: .bottom)
            Rectangle().fill(.ultraThinMaterial).opacity(0.35)
        }
        .overlay(alignment: .bottom) { Rectangle().fill(Color.black.opacity(0.09)).frame(height: 1) }
    }
}

MainActor.assumeIsolated {
    writeJPG(Wallpaper(), "wallpaper.jpg", 1280, 800, scale: 1)
    writePNG(Switch(on: false), "toggle-off.png", 40, 24)
    writePNG(Switch(on: true), "toggle-on.png", 40, 24)
    writePNG(Knob(), "slider-knob.png", 24, 24)
    writePNG(Titlebar(), "titlebar.png", 600, 44, scale: 2)
}
