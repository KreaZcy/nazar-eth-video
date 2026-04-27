import json, urllib.request, subprocess, os

API_KEY = "sk_e7554818a8471f381f655ce34703bc5b671ace4c321034fc"
VOICE_ID = "EXAVITQu4vr4xnSDxMaL"
OUT = "/home/izcy-tuf/Desktop/iZcy/KreaZcy/my-video/public/narration"

def generate(name, text):
    print(f"  Generating {name}...")
    payload = json.dumps({
        "text": text,
        "model_id": "eleven_turbo_v2_5",
        "voice_settings": {"stability": 0.5, "similarity_boost": 0.75}
    }).encode()
    req = urllib.request.Request(
        f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}",
        data=payload,
        headers={"Content-Type": "application/json", "xi-api-key": API_KEY}
    )
    resp = urllib.request.urlopen(req, timeout=120)
    data = resp.read()
    raw_path = os.path.join(OUT, f"{name}.mp3")
    with open(raw_path, "wb") as f:
        f.write(data)
    dur = float(subprocess.run(["ffprobe","-v","quiet","-show_entries","format=duration","-of","csv=p=0", raw_path], capture_output=True, text=True).stdout.strip())
    frames = round(dur * 30)
    print(f"    {name}: {dur:.1f}s ({frames} frames)")
    return dur, frames

print("=== Regenerating affected clips ===\n")

durations = {}

print("1. Intro - fix NazarETH pronunciation")
d, f = generate("intro", "This is Nazareth. The onchain fitness commitment protocol.")
durations["intro"] = f

print("2. HowItWorks - shorter deposit line")
d, f = generate("howitworks", 
    "Here is how it works. "
    "Connect your wallet and Strava. "
    "Create a challenge. Pick your sport, distance, and stake. "
    "Deposit USDC with yield sharing. "
    "Train and sync. Your Strava GPX data is oracle verified. "
    "Withdraw milestones. Get ten percent back for every ten percent progress. "
    "Then claim your territory."
)
durations["howitworks"] = f

print("3. Differentiator - add advantages")
d, f = generate("differentiator", 
    "What makes Nazareth different? "
    "EIP 712 Sybil protection, so one wallet equals one real athlete. "
    "Milestone withdrawals, so you earn back gradually, not just at the end. "
    "And oracle verified progress, meaning real GPS data submitted as on chain proof."
)
durations["differentiator"] = f

print("4. CTA - 1.5x longer")
d, f = generate("cta", 
    "Ready to put your money where your legs are? "
    "Stake real USDC. Train with real accountability. Earn yield while you grind. "
    "Try Nazareth on Base today."
)
durations["cta"] = f

print("5. Outro - 1.5x longer")
d, f = generate("outro", 
    "NazarETH. Commit onchain. Deliver in real life. "
    "Visit nazareth dot izcy dot tech. Built on Base."
)
durations["outro"] = f

print("\n=== FINAL FRAME COUNTS ===")
total = 0
for name, frames in durations.items():
    total += frames
    print(f"  {name}: {frames} frames ({frames/30:.1f}s)")
print(f"\n  New scenes total: {total} frames = {total/30:.1f}s")

# Keep unchanged scenes
unchanged = {"hook": 225, "problem": 310, "solution": 285, "featurecombo": 255}
print("\n  Unchanged scenes:")
for name, frames in unchanged.items():
    total += frames
    print(f"  {name}: {frames} frames ({frames/30:.1f}s)")

trans = 6 * 7  # 7 transitions (removed techstack = -1 transition)
grand = total + trans
print(f"\n  Grand total: {grand} frames = {grand/30:.1f}s")
print(f"  (scenes={total}, transitions={trans})")
