import { NextResponse } from 'next/server';

export async function GET() {
  const assetlinks = [
    {
      "relation": ["delegate_permission/common.handle_all_urls"],
      "target": {
        "namespace": "android_app",
        "package_name": "com.moolgyan.app",
        "sha256_cert_fingerprints": [
          "91:FF:29:73:B3:4A:94:5D:77:7A:04:F3:F0:40:F5:E0:86:6E:34:02:00:0D:CD:2A:E9:33:D4:19:94:D2:59:1B"
        ]
      }
    }
  ];

  return NextResponse.json(assetlinks);
}

export const dynamic = 'force-static';
