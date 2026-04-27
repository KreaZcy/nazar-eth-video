import json, urllib.request, sys

API_KEY = "sk_e7554818a8471f381f655ce34703bc5b671ace4c321034fc"
VOICE_ID = "EXAVITQu4vr4xnSDxMaL"

text = """This is NazarETH. You already use Strava and INTVL. But when you miss a fitness goal? Nothing. Zero accountability.

Fitness commitments have zero teeth. You skip the gym, no consequences. You quit a challenge, just lie about it.

NazarETH is an onchain fitness commitment protocol. Stake USDC, earn yield while you commit. Oracle-verified Strava data on Base.

Connect wallet and Strava. Create a challenge. Deposit USDC, it earns yield while you train. Train and sync with oracle-verified GPX. Withdraw milestones, ten percent back per ten percent progress. Then claim your territory.

Strava plus USDC plus Base equals NazarETH. Put skin in the game, let the chain decide.

EIP-712 Sybil protection. Milestone withdrawals. Oracle-verified progress.

Built with Base, Solidity, Go, React, Strava, and USDC.

Ready to put your money where your legs are? Try NazarETH on Base.

Commit onchain. Deliver IRL."""

print(f"Generating... ({len(text)} chars)")

payload = json.dumps({
    "text": text,
    "model_id": "eleven_turbo_v2_5",
    "voice_settings": {"stability": 0.5, "similarity_boost": 0.75}
}).encode()

req = urllib.request.Request(
    f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}",
    data=payload,
    headers={
        "Content-Type": "application/json",
        "xi-api-key": API_KEY
    }
)

resp = urllib.request.urlopen(req, timeout=120)
data = resp.read()
out = "/home/izcy-tuf/Desktop/iZcy/KreaZcy/my-video/public/narration.mp3"
with open(out, "wb") as f:
    f.write(data)
print(f"Done! {len(data)} bytes")

import subprocess
dur = subprocess.run(["ffprobe","-v","quiet","-show_entries","format=duration","-of","csv=p=0",out], capture_output=True, text=True).stdout.strip()
print(f"Duration: {float(dur):.1f}s")
