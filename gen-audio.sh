#!/bin/bash
API_KEY="sk_03b0ffe5fc9c34ca5a00fe9f0699c5dcab91a341a2b6ffb2"
VOICE_ID="IKne3meq5aSn9XLyUdCD"
OUTPUT="/home/izcy-tuf/Desktop/iZcy/KreaZcy/my-video/public/narration.mp3"

TEXT='This is NazarETH. You already use Strava. You already use INTVL. But what happens when you miss a fitness goal? Nothing. Zero accountability. Fitness commitments have zero teeth. You skip the gym, no money lost. You quit mid challenge, just lie about it. Centralized escrow can disappear. The solution? An onchain fitness commitment protocol. Stake USDC and earn yield while you commit. Oracle verified Strava data. Secure onchain escrow on Base. Heres how it works. Step one, connect your wallet and Strava. Step two, create a challenge. Pick your sport, distance, and stake. Step three, deposit USDC. Its locked and earns yield while you train. Step four, train and sync. Your Strava GPX data is oracle verified. Step five, withdraw milestones. Get ten percent back for every ten percent progress. Step six, claim territory. Own your fitness domain. Strava plus USDC plus Base equals NazarETH. Put skin in the game and let the chain decide. What makes it different? EIP-712 Sybil protection binds one wallet to one Strava account permanently. Milestone withdrawals let you claim back gradually. Oracle verified progress means real Strava data submitted as on chain proof. Built with Base, Solidity, Go, React, Strava API, and USDC. Ready to put your money where your legs are? Try NazarETH on Base. Commit onchain. Deliver IRL.'

curl -s -X "https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}" \
  -H "xi-api-key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -H "Accept: audio/mpeg" \
  -d "$(python3 -c "
import json
print(json.dumps({
    'text': '''$TEXT''',
    'model_id': 'eleven_turbo_v2',
    'voice_settings': {'stability': 0.5, 'similarity_boost': 0.75}
}))
")" \
  -o "${OUTPUT}"

file "${OUTPUT}"
ls -la "${OUTPUT}"
