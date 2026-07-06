#!/bin/bash
# Exit non-zero if any check fails (CI gate).
FAILS=0
# Host-rewrite matrix for the i18n x CV-subdomain interaction (dev server).
B=http://localhost:3000
DEV="Host: brunodev.wbdigitalsolutions.com"
VEN="Host: brunov.wbdigitalsolutions.com"
check () { # label, host header, path, expected regex
  local body code
  body=$(curl -s -H "$2" -o /tmp/hm.html -w "%{http_code}" "$B$3")
  code=$body
  if grep -qE "$4" /tmp/hm.html; then ok="✓"; else ok="✗"; FAILS=$((FAILS+1)); fi
  printf "%-24s %s  %s\n" "$1" "$code" "$ok"
}
echo "== CV subdomains =="
check "brunodev /"        "$DEV" "/"          "whoami"
check "brunodev /pt"      "$DEV" "/pt"        "Programo desde 2020"
check "brunodev /it"      "$DEV" "/it"        "Programmo dal 2020"
check "brunodev /es"      "$DEV" "/es"        "Resuelvo problemas"
check "brunov /"          "$VEN" "/"          "Selling|SALES|TECHNICAL"
check "brunov /pt"        "$VEN" "/pt"        "Vender é entender|VENDAS"
check "brunov /it"        "$VEN" "/it"        "Vendere|VENDITE"
check "brunov /es"        "$VEN" "/es"        "Vender es entender|VENTAS"
echo "== per-host files =="
h1=$(curl -s -H "$DEV" "$B/llms.txt" | head -1); echo "brunodev llms: $h1"
h2=$(curl -s -H "$VEN" "$B/llms.txt" | head -1); echo "brunov   llms: $h2"
s1=$(curl -s -H "$DEV" "$B/sitemap.xml" | grep -c brunodev); echo "brunodev sitemap refs: $s1"
r1=$(curl -s -H "$DEV" "$B/robots.txt" | grep Sitemap); echo "brunodev robots: $r1"
echo "== www intact =="
check "www /"             "Host: localhost"  "/"    "Websites, Systems"
check "www /pt"           "Host: localhost"  "/pt"  "Sites, Sistemas"
check "www /it/websites"  "Host: localhost"  "/it/websites" "."
w=$(curl -s "$B/sitemap.xml" | grep -c "wbdigitalsolutions.com"); echo "www sitemap urls: $w"
echo "== redirects =="
curl -s -o /dev/null -w "www /pt-BR -> %{http_code} %{redirect_url}\n" "$B/pt-BR"
curl -s -o /dev/null -w "www /index.html -> %{http_code} %{redirect_url}\n" "$B/index.html"
curl -s -o /dev/null -w "www /pt/dev -> %{http_code} %{redirect_url}\n" "$B/pt/dev"

echo ""
if [ "$FAILS" -gt 0 ]; then echo "❌ $FAILS host-check failure(s)"; exit 1; fi
echo "✅ host matrix green"
