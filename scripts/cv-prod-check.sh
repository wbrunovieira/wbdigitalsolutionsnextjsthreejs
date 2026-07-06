#!/bin/bash
# Production check for the personal CV subdomains (post-deploy CI job).
# The i18n gate covers www; this covers the host-rewrite layer that once
# broke silently (see docs/i18n-migration-plan.md, P6 incident).
FAILS=0
check () { # label, url, expected regex
  local code
  code=$(curl -s -o /tmp/cvp.html -w "%{http_code}" "$2")
  if [ "$code" = "200" ] && grep -qE "$3" /tmp/cvp.html; then
    printf "%-42s 200 ✓\n" "$1"
  else
    printf "%-42s %s ✗\n" "$1" "$code"
    FAILS=$((FAILS+1))
  fi
}
DEV=https://brunodev.wbdigitalsolutions.com
VEN=https://brunov.wbdigitalsolutions.com
check "brunodev /"        "$DEV/"    "whoami"
check "brunodev /pt"      "$DEV/pt"  "Programo desde 2020"
check "brunodev /it"      "$DEV/it"  "Programmo dal 2020"
check "brunodev /es"      "$DEV/es"  "Resuelvo problemas"
check "brunov /"          "$VEN/"    "Vender é entender|VENDAS"
check "brunov /en"        "$VEN/en"  "Selling|SALES|TECHNICAL"
check "brunov /it"        "$VEN/it"  "Vendere|VENDITE"
check "brunov /es"        "$VEN/es"  "Vender es entender|VENTAS"
# per-host assets
l1=$(curl -s "$DEV/llms.txt" | head -1)
echo "$l1" | grep -q "Engineer" && echo "brunodev llms ✓" || { echo "brunodev llms ✗ ($l1)"; FAILS=$((FAILS+1)); }
curl -s "$VEN/sitemap.xml" | grep -q "brunov" && echo "brunov sitemap ✓" || { echo "brunov sitemap ✗"; FAILS=$((FAILS+1)); }
curl -s "$DEV/robots.txt" | grep -q "brunodev" && echo "brunodev robots ✓" || { echo "brunodev robots ✗"; FAILS=$((FAILS+1)); }
c=$(curl -s -o /dev/null -w "%{http_code}" "$DEV/cv/Walter-Bruno-Vieira-CV-Dev-PT.pdf")
[ "$c" = "200" ] && echo "PDF dev PT ✓" || { echo "PDF dev PT ✗ ($c)"; FAILS=$((FAILS+1)); }

echo ""
if [ "$FAILS" -gt 0 ]; then echo "❌ $FAILS CV production failure(s)"; exit 1; fi
echo "✅ CV subdomains green in production"
