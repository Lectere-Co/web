// Lectere — marketing mock renderer
// Renders the Lectere pop-up palette and the on-screen guidance overlay as
// clean, native macOS screenshots (SwiftUI materials + SF Pro + SF Symbols)
// and writes them as high-res PNGs into ../public.
//
//   swift tools/mockshot.swift
//
// Note: true Liquid Glass (.glassEffect) only composites in a live on-screen
// window, so these use SwiftUI materials which render faithfully via ImageRenderer.

import SwiftUI
import AppKit

// MARK: - Brand

let accent = Color(red: 0.92, green: 0.20, blue: 0.43)        // #eb336e
let accentDeep = Color(red: 0.61, green: 0.15, blue: 0.30)    // #9b274c
let ink = Color(red: 0.086, green: 0.039, blue: 0.071)        // #160a12
let textPrimary = ink
let textSecondary = Color(red: 0.42, green: 0.39, blue: 0.44)
let textTertiary = Color(red: 0.62, green: 0.60, blue: 0.64)
let hairline = Color.black.opacity(0.08)
let hairlineStrong = Color.black.opacity(0.12)

let LOGO_PATH = "/Users/rishblob/Documents/testsuite/lectere/marketing-site/public/lecterelogonotext.svg"
let OUT_DIR = "/Users/rishblob/Documents/testsuite/lectere/marketing-site/public"

// MARK: - Logo

struct LectereMark: View {
    var size: CGFloat = 22
    var body: some View {
        Group {
            if let img = NSImage(contentsOfFile: LOGO_PATH) {
                Image(nsImage: img).resizable().interpolation(.high).aspectRatio(contentMode: .fit)
            } else {
                RoundedRectangle(cornerRadius: size * 0.24, style: .continuous).fill(accent)
            }
        }
        .frame(width: size, height: size)
    }
}

// MARK: - Shared bits

func kbd(_ s: String) -> some View {
    Text(s)
        .font(.system(size: 10, design: .monospaced))
        .foregroundStyle(textSecondary)
        .padding(.horizontal, 5).padding(.vertical, 1.5)
        .background(RoundedRectangle(cornerRadius: 4).fill(Color.black.opacity(0.045)))
        .overlay(RoundedRectangle(cornerRadius: 4).strokeBorder(hairline, lineWidth: 1))
}

func kbdHint(_ keys: [String], _ label: String) -> some View {
    HStack(spacing: 4) {
        ForEach(keys, id: \.self) { kbd($0) }
        Text(label).font(.system(size: 10)).foregroundStyle(textTertiary)
    }
}

// MARK: - 01 · Palette

struct ExampleRow: View {
    let text: String
    let selected: Bool
    var body: some View {
        HStack(spacing: 10) {
            Text(text)
                .font(.system(size: 14, weight: selected ? .medium : .regular))
                .foregroundStyle(selected ? textPrimary : textSecondary)
            Spacer()
            Image(systemName: "arrow.up.left")
                .font(.system(size: 11, weight: .semibold))
                .foregroundStyle(selected ? accent : textTertiary)
                .opacity(selected ? 1 : 0.45)
        }
        .padding(.vertical, 8).padding(.leading, 18).padding(.trailing, 14)
        .background(
            ZStack(alignment: .leading) {
                if selected {
                    LinearGradient(colors: [accent.opacity(0.12), accent.opacity(0.015)],
                                   startPoint: .leading, endPoint: .trailing)
                    Rectangle().fill(accent).frame(width: 2).padding(.vertical, 5)
                }
            }
        )
        .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
        .padding(.horizontal, 6)
    }
}

struct PaletteMock: View {
    var body: some View {
        VStack(spacing: 0) {
            // input row
            HStack(spacing: 12) {
                LectereMark(size: 22)
                Rectangle().fill(hairlineStrong).frame(width: 1, height: 26)
                Text("Ask anything about Mail…")
                    .font(.system(size: 16))
                    .foregroundStyle(textTertiary)
                Spacer(minLength: 8)
                HStack(spacing: 5) {
                    Text("in").font(.system(size: 11)).foregroundStyle(textSecondary)
                    Text("Mail").font(.system(size: 11, weight: .medium)).foregroundStyle(textPrimary)
                }
                .padding(.horizontal, 9).padding(.vertical, 5)
                .background(Capsule().fill(Color.black.opacity(0.04)))
                .overlay(Capsule().strokeBorder(hairline, lineWidth: 1))
            }
            .padding(.horizontal, 16).frame(height: 54)

            Rectangle().fill(hairline).frame(height: 1)

            VStack(alignment: .leading, spacing: 2) {
                Text("TRY ASKING")
                    .font(.system(size: 10, weight: .semibold)).tracking(1.8)
                    .foregroundStyle(textTertiary)
                    .padding(.horizontal, 18).padding(.top, 12).padding(.bottom, 4)
                ExampleRow(text: "Walk me through what's on this screen", selected: true)
                ExampleRow(text: "Where do I find…", selected: false)
                ExampleRow(text: "Explain what this button does", selected: false)
            }
            .padding(.bottom, 10)

            Rectangle().fill(hairline).frame(height: 1)

            HStack {
                Spacer()
                HStack(spacing: 14) {
                    kbdHint(["↑", "↓"], "use example")
                    kbdHint(["⏎"], "ask")
                    kbdHint(["esc"], "close")
                }
            }
            .padding(.horizontal, 16).padding(.vertical, 9)
        }
        .frame(width: 540)
        .background(.regularMaterial)
        .background(Color.white.opacity(0.5))
        .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 16, style: .continuous).strokeBorder(Color.white.opacity(0.7), lineWidth: 1).blendMode(.plusLighter))
        .overlay(RoundedRectangle(cornerRadius: 16, style: .continuous).strokeBorder(Color.black.opacity(0.1), lineWidth: 1))
        .shadow(color: .black.opacity(0.16), radius: 34, y: 20)
        .shadow(color: .black.opacity(0.06), radius: 2, y: 1)
    }
}

// MARK: - 02 · Overlay

struct ToolButton: View {
    let icon: String
    let label: String
    let dimmed: Bool
    var body: some View {
        VStack(spacing: 3) {
            Image(systemName: icon).font(.system(size: 16, weight: .regular))
            Text(label).font(.system(size: 10))
        }
        .foregroundStyle(textSecondary)
        .frame(width: 58, height: 44)
        .opacity(dimmed ? 0.4 : 1)
    }
}

struct OverlayMock: View {
    var body: some View {
        // app window
        VStack(spacing: 0) {
            // titlebar
            ZStack {
                HStack(spacing: 7) {
                    Circle().fill(Color(red: 1, green: 0.37, blue: 0.34)).frame(width: 11, height: 11)
                    Circle().fill(Color(red: 1, green: 0.74, blue: 0.18)).frame(width: 11, height: 11)
                    Circle().fill(Color(red: 0.16, green: 0.78, blue: 0.25)).frame(width: 11, height: 11)
                    Spacer()
                }
                Text("Mail").font(.system(size: 12, weight: .semibold)).foregroundStyle(textSecondary)
            }
            .padding(.horizontal, 13).frame(height: 38)
            .background(Color(white: 0.97))

            Rectangle().fill(hairline).frame(height: 1)

            // toolbar with Share as the target
            HStack(spacing: 6) {
                ToolButton(icon: "arrowshape.turn.up.left", label: "Reply", dimmed: true)
                ToolButton(icon: "arrowshape.turn.up.right", label: "Forward", dimmed: true)
                ToolButton(icon: "archivebox", label: "Archive", dimmed: true)
                // target
                VStack(spacing: 3) {
                    Image(systemName: "square.and.arrow.up").font(.system(size: 16, weight: .regular))
                    Text("Share").font(.system(size: 10, weight: .semibold))
                }
                .foregroundStyle(ink)
                .frame(width: 58, height: 44)
                .background(RoundedRectangle(cornerRadius: 9).fill(Color.white))
                .overlay(RoundedRectangle(cornerRadius: 9).strokeBorder(accent, lineWidth: 2.5))
                .background(
                    RoundedRectangle(cornerRadius: 9)
                        .fill(accent.opacity(0.0))
                        .shadow(color: accent.opacity(0.55), radius: 16)
                        .shadow(color: accent.opacity(0.35), radius: 28)
                )
                Spacer()
            }
            .padding(.horizontal, 16).frame(height: 60)
            .background(Color(white: 0.99))

            Rectangle().fill(hairline).frame(height: 1)

            // message body (dimmed)
            VStack(alignment: .leading, spacing: 9) {
                HStack(spacing: 10) {
                    Circle().fill(Color(white: 0.85)).frame(width: 34, height: 34)
                    VStack(alignment: .leading, spacing: 3) {
                        Text("Maya Chen").font(.system(size: 13, weight: .semibold)).foregroundStyle(textPrimary)
                        Text("Re: Friday's interview").font(.system(size: 12)).foregroundStyle(textSecondary)
                    }
                    Spacer()
                    Text("9:41 AM").font(.system(size: 11)).foregroundStyle(textTertiary)
                }
                RoundedRectangle(cornerRadius: 4).fill(Color(white: 0.93)).frame(height: 8).frame(maxWidth: .infinity)
                RoundedRectangle(cornerRadius: 4).fill(Color(white: 0.93)).frame(height: 8).frame(maxWidth: 360)
                RoundedRectangle(cornerRadius: 4).fill(Color(white: 0.93)).frame(height: 8).frame(maxWidth: 300)
            }
            .padding(16)
            .opacity(0.5)
            Spacer(minLength: 0)
        }
        .frame(width: 560, height: 300)
        .background(Color.white)
        .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 14, style: .continuous).strokeBorder(Color.black.opacity(0.1), lineWidth: 1))
        .shadow(color: .black.opacity(0.18), radius: 34, y: 20)
        // soft spotlight focus toward the Share target (top-right of toolbar)
        .overlay(alignment: .top) {
            // callout
            HStack(spacing: 7) {
                Image(systemName: "arrowtriangle.left.fill").font(.system(size: 9)).foregroundStyle(accent)
                Text("Click Share").font(.system(size: 12.5, weight: .semibold)).foregroundStyle(ink)
            }
            .padding(.horizontal, 13).padding(.vertical, 9)
            .background(.regularMaterial)
            .background(Color.white.opacity(0.7))
            .clipShape(RoundedRectangle(cornerRadius: 11, style: .continuous))
            .overlay(RoundedRectangle(cornerRadius: 11, style: .continuous).strokeBorder(Color.black.opacity(0.08), lineWidth: 1))
            .shadow(color: .black.opacity(0.18), radius: 16, y: 8)
            .offset(x: 96, y: 70)
        }
        // step floater
        .overlay(alignment: .bottomLeading) {
            HStack(spacing: 10) {
                LectereMark(size: 22)
                VStack(alignment: .leading, spacing: 4) {
                    Text("Click Share").font(.system(size: 13, weight: .semibold)).foregroundStyle(textPrimary)
                    HStack(spacing: 6) {
                        Text("Step 2 of 3").font(.system(size: 11)).foregroundStyle(textSecondary)
                        HStack(spacing: 3) {
                            Capsule().fill(accent).frame(width: 13, height: 3)
                            Capsule().fill(accent).frame(width: 13, height: 3)
                            Capsule().fill(Color.black.opacity(0.12)).frame(width: 13, height: 3)
                        }
                    }
                }
            }
            .padding(.horizontal, 13).padding(.vertical, 11)
            .background(.regularMaterial)
            .background(Color.white.opacity(0.7))
            .clipShape(RoundedRectangle(cornerRadius: 13, style: .continuous))
            .overlay(RoundedRectangle(cornerRadius: 13, style: .continuous).strokeBorder(Color.black.opacity(0.08), lineWidth: 1))
            .shadow(color: .black.opacity(0.2), radius: 22, y: 12)
            .offset(x: 18, y: -18)
        }
    }
}

// MARK: - Scene + render

func scene<Content: View>(_ w: CGFloat, _ h: CGFloat, @ViewBuilder _ content: () -> Content) -> some View {
    ZStack {
        LinearGradient(colors: [Color(red: 0.965, green: 0.965, blue: 0.975),
                                Color(red: 0.915, green: 0.915, blue: 0.93)],
                       startPoint: .top, endPoint: .bottom)
        content()
    }
    .frame(width: w, height: h)
    .environment(\.colorScheme, .light)
}

@MainActor
func writePNG(_ view: some View, _ name: String, scale: CGFloat = 3) {
    let r = ImageRenderer(content: view)
    r.scale = scale
    r.isOpaque = true
    guard let cg = r.cgImage else { print("FAIL \(name)"); return }
    let rep = NSBitmapImageRep(cgImage: cg)
    guard let data = rep.representation(using: .png, properties: [:]) else { print("FAIL png \(name)"); return }
    try? data.write(to: URL(fileURLWithPath: "\(OUT_DIR)/\(name)"))
    print("OK \(name) \(cg.width)x\(cg.height)")
}

MainActor.assumeIsolated {
    writePNG(scene(720, 430) { PaletteMock() }, "hiw-palette.png", scale: 2)
    writePNG(scene(720, 430) { OverlayMock() }, "hiw-overlay.png", scale: 2)
}
