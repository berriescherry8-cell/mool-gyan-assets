import { NextResponse } from 'next/server';

export async function GET() {
  const assetlinks = [
    {
      "relation": ["delegate_permission/common.handle_all_urls"],
      "target": {
        "namespace": "android_app",
        "package_name": "com.moolgyan.app",
        "sha256_cert_fingerprints": [
          "76:DF:1B:43:DD:F3:D0:D7:61:E1:B8:AA:86:36:25:8A:F3:89:1E:6C:F5:02:09:D3:C5:BF:AA:F7:EB:6B:D9:7F"
        ]
      }
    }
  ];

  return NextResponse.json(assetlinks);
}
