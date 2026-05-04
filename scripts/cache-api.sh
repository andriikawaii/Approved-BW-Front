#!/bin/bash
# Cache all BuiltWell API page responses to local JSON files
# Run this whenever the API is up: bash scripts/cache-api.sh

API="https://api.builtwellct.com/api/pages"
CACHE_DIR="src/api/cache"

mkdir -p "$CACHE_DIR"

SLUGS=(
  ""
  "about"
  "contact"
  "faq"
  "services"
  "process"
  "portfolio"
  "careers"
  "financing"
  "pricing"
  "privacy-policy"
  "terms"
  "reviews"
  "sitemap"
  "warranty"
  "free-consultation"
  "homeowner-hub"
  "insurance-restoration"
  "areas-we-serve"
  "case-studies"
  "thank-you"
  "kitchen-remodeling"
  "bathroom-remodeling"
  "basement-finishing"
  "flooring"
  "home-additions"
  "interior-painting"
  "interior-carpentry"
  "attic-conversions"
  "decks-porches"
  "remodeling-design-planning"
  "comfort-accessibility-remodeling"
  "fairfield-county"
  "new-haven-county"
  "fairfield-county/greenwich-ct"
  "fairfield-county/westport-ct"
  "new-haven-county/orange-ct"
  "new-haven-county/new-haven-ct"
  "new-haven-county/madison-ct"
  "kitchen-remodeling/greenwich-ct"
  "kitchen-remodeling/westport-ct"
  "kitchen-remodeling/darien-ct"
  "kitchen-remodeling/new-canaan-ct"
  "kitchen-remodeling/stamford-ct"
  "kitchen-remodeling/norwalk-ct"
  "kitchen-remodeling/fairfield-ct"
  "kitchen-remodeling/ridgefield-ct"
  "kitchen-remodeling/orange-ct"
  "kitchen-remodeling/new-haven-ct"
  "kitchen-remodeling/hamden-ct"
  "kitchen-remodeling/branford-ct"
  "kitchen-remodeling/guilford-ct"
  "kitchen-remodeling/madison-ct"
  "kitchen-remodeling/woodbridge-ct"
  "kitchen-remodeling/milford-ct"
  "bathroom-remodeling/greenwich-ct"
  "bathroom-remodeling/westport-ct"
  "bathroom-remodeling/darien-ct"
  "bathroom-remodeling/new-canaan-ct"
  "bathroom-remodeling/stamford-ct"
  "bathroom-remodeling/norwalk-ct"
  "bathroom-remodeling/fairfield-ct"
  "bathroom-remodeling/ridgefield-ct"
  "bathroom-remodeling/orange-ct"
  "bathroom-remodeling/new-haven-ct"
  "bathroom-remodeling/hamden-ct"
  "bathroom-remodeling/branford-ct"
  "bathroom-remodeling/guilford-ct"
  "bathroom-remodeling/madison-ct"
  "bathroom-remodeling/woodbridge-ct"
  "bathroom-remodeling/milford-ct"
  "basement-finishing/greenwich-ct"
  "basement-finishing/westport-ct"
  "basement-finishing/darien-ct"
  "basement-finishing/new-canaan-ct"
  "basement-finishing/stamford-ct"
  "basement-finishing/norwalk-ct"
  "basement-finishing/fairfield-ct"
  "basement-finishing/ridgefield-ct"
  "basement-finishing/orange-ct"
  "basement-finishing/new-haven-ct"
  "basement-finishing/hamden-ct"
  "basement-finishing/branford-ct"
  "basement-finishing/guilford-ct"
  "basement-finishing/madison-ct"
  "basement-finishing/woodbridge-ct"
  "basement-finishing/milford-ct"
  "flooring/greenwich-ct"
  "flooring/westport-ct"
  "flooring/darien-ct"
  "flooring/new-canaan-ct"
  "flooring/stamford-ct"
  "flooring/norwalk-ct"
  "flooring/fairfield-ct"
  "flooring/ridgefield-ct"
  "flooring/orange-ct"
  "flooring/new-haven-ct"
  "flooring/hamden-ct"
  "flooring/branford-ct"
  "flooring/guilford-ct"
  "flooring/madison-ct"
  "flooring/woodbridge-ct"
  "flooring/milford-ct"
)

OK=0
FAIL=0

for slug in "${SLUGS[@]}"; do
  if [ -z "$slug" ]; then
    file="$CACHE_DIR/_home.json"
    url="$API/"
  else
    file="$CACHE_DIR/${slug//\//__}.json"
    url="$API/$slug"
  fi

  data=$(curl -s --connect-timeout 5 --max-time 15 "$url" 2>/dev/null)

  if [ -n "$data" ] && echo "$data" | python3 -c "import json,sys; json.loads(sys.stdin.read())" 2>/dev/null; then
    echo "$data" > "$file"
    echo "OK: $slug"
    OK=$((OK+1))
  else
    echo "FAIL: $slug"
    FAIL=$((FAIL+1))
  fi

  sleep 0.2
done

echo ""
echo "Done: $OK cached, $FAIL failed"
