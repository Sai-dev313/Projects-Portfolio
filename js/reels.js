(function () {
  // Optional `aspect` ("9:16" or "16:9") can be pinned per reel; otherwise
  // rendered Instagram embeds are auto-grouped by their measured aspect ratio.
  var REELS = [
    { id: "DeXVF1uo1DL", url: "https://www.instagram.com/reel/DeXVF1uo1DL/", title: "Featured Edit #01", bestPick: true },
    { id: "DdjblUIya8v", url: "https://www.instagram.com/reel/DdjblUIya8v/", title: "Featured Edit #02", bestPick: true },
    { id: "DfObTvSzfjj", url: "https://www.instagram.com/reel/DfObTvSzfjj/", title: "Featured Edit #03", bestPick: true },
    { id: "DfUqQ5Pu-Vn", url: "https://www.instagram.com/reel/DfUqQ5Pu-Vn/", title: "Featured Edit #04", bestPick: true },
    { id: "DfWwTVcuXC-", url: "https://www.instagram.com/reel/DfWwTVcuXC-/", title: "Featured Edit #05", bestPick: true },
    { id: "DgN1-71IoC8", url: "https://www.instagram.com/reel/DgN1-71IoC8/", title: "Featured Edit #06", bestPick: true },
    { id: "DXumxUXjn4w", url: "https://www.instagram.com/p/DXumxUXjn4w/", title: "Reel Edit #07", bestPick: false },
    { id: "DYC9_UOOFlp", url: "https://www.instagram.com/p/DYC9_UOOFlp/", title: "Reel Edit #08", bestPick: false },
    { id: "DckgqdRIV-Q", url: "https://www.instagram.com/p/DckgqdRIV-Q/", title: "Reel Edit #09", bestPick: false },
    { id: "DfZvGChuvqV", url: "https://www.instagram.com/p/DfZvGChuvqV/", title: "Reel Edit #10", bestPick: false },
    { id: "DfXj7CoupR_", url: "https://www.instagram.com/p/DfXj7CoupR_/", title: "Reel Edit #11", bestPick: false },
    { id: "DfRADIbzhcN", url: "https://www.instagram.com/p/DfRADIbzhcN/", title: "Reel Edit #12", bestPick: false },
    { id: "DfOv3xWT2bx", url: "https://www.instagram.com/p/DfOv3xWT2bx/", title: "Reel Edit #13", bestPick: false },
    { id: "DfMtKAOuSC5", url: "https://www.instagram.com/p/DfMtKAOuSC5/", title: "Reel Edit #14", bestPick: false },
    { id: "DfMm7Ysuwb4", url: "https://www.instagram.com/p/DfMm7Ysuwb4/", title: "Reel Edit #15", bestPick: false },
    { id: "DeqPjcOz-jw", url: "https://www.instagram.com/p/DeqPjcOz-jw/", title: "Reel Edit #16", bestPick: false },
    { id: "DemY9pOurVN", url: "https://www.instagram.com/p/DemY9pOurVN/", title: "Reel Edit #17", bestPick: false },
    { id: "Dec-xrAIQ4g", url: "https://www.instagram.com/p/Dec-xrAIQ4g/", title: "Reel Edit #18", bestPick: false }
  ];

  var currentFilter = "all";

  function createReelCard(reel, orderIndex) {
    var article = document.createElement("article");
    article.className = "card reel-card";
    article.setAttribute("data-best", reel.bestPick ? "true" : "false");
    article.setAttribute("data-order", String(orderIndex));
    article.setAttribute("data-aspect", reel.aspect || "9:16");
    if (reel.aspect) {
      article.setAttribute("data-aspect-pinned", "true");
    }

    var frameWrap = document.createElement("div");
    frameWrap.className = "reel-frame";

    var blockquote = document.createElement("blockquote");
    blockquote.className = "instagram-media";
    blockquote.setAttribute("data-instgrm-permalink", reel.url + "?utm_source=ig_embed");
    blockquote.setAttribute("data-instgrm-version", "14");
    blockquote.style.cssText =
      "background:#FFF;border:0;border-radius:0;box-shadow:none;margin:0;max-width:100%;min-width:0;padding:0;width:100%;";

    var fallback = document.createElement("a");
    fallback.className = "reel-fallback";
    fallback.href = reel.url;
    fallback.target = "_blank";
    fallback.rel = "noopener";
    fallback.textContent = "Loading Instagram Reel — Watch on Instagram ↗";
    blockquote.appendChild(fallback);

    frameWrap.appendChild(blockquote);

    var meta = document.createElement("div");
    meta.className = "reel-meta";

    var titleWrap = document.createElement("div");
    titleWrap.className = "reel-title-wrap";

    var title = document.createElement("span");
    title.className = "reel-title";
    title.textContent = reel.title;
    titleWrap.appendChild(title);

    if (reel.bestPick) {
      var badge = document.createElement("span");
      badge.className = "reel-badge";
      badge.textContent = "Best Pick";
      titleWrap.appendChild(badge);
    }

    var link = document.createElement("a");
    link.className = "reel-ext";
    link.href = reel.url;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Watch on IG ↗";

    meta.appendChild(titleWrap);
    meta.appendChild(link);

    article.appendChild(frameWrap);
    article.appendChild(meta);
    return article;
  }

  function insertSorted(grid, card) {
    var cardOrder = parseInt(card.getAttribute("data-order"), 10) || 0;
    var siblings = grid.children;
    var refNode = null;
    for (var i = 0; i < siblings.length; i += 1) {
      var siblingOrder = parseInt(siblings[i].getAttribute("data-order"), 10) || 0;
      if (siblingOrder > cardOrder) {
        refNode = siblings[i];
        break;
      }
    }
    if (typeof grid.moveBefore === "function" && card.parentNode) {
      try {
        grid.moveBefore(card, refNode);
      } catch (_) {
        grid.insertBefore(card, refNode);
      }
    } else {
      grid.insertBefore(card, refNode);
    }
  }

  function updateCounts(root) {
    var groups = root.querySelectorAll(".reels-group");
    var totalVisible = 0;

    groups.forEach(function (group) {
      var grid = group.querySelector(".reels-grid");
      var countEl = group.querySelector("[data-group-count]");
      var cards = grid ? grid.querySelectorAll(".reel-card") : [];
      var visibleInGroup = 0;

      cards.forEach(function (card) {
        var isBest = card.getAttribute("data-best") === "true";
        var show = currentFilter === "all" || isBest;
        card.hidden = !show;
        if (show) visibleInGroup += 1;
      });

      totalVisible += visibleInGroup;
      group.hidden = visibleInGroup === 0;
      if (countEl) {
        countEl.textContent = visibleInGroup + (visibleInGroup === 1 ? " reel" : " reels");
      }
    });

    var totalCountId = root.getAttribute("data-count-target");
    if (totalCountId) {
      var totalEl = document.getElementById(totalCountId);
      if (totalEl) {
        totalEl.textContent = currentFilter === "best"
          ? "Showing " + totalVisible + " featured best picks"
          : "Showing " + totalVisible + " of " + REELS.length + " edited reels";
      }
    }
  }

  function observeEmbedAspect(root) {
    var verticalGrid = root.querySelector('[data-aspect-grid="9:16"]');
    var wideGrid = root.querySelector('[data-aspect-grid="16:9"]');
    if (!verticalGrid || !wideGrid || typeof ResizeObserver !== "function") return;

    var timers = new WeakMap();

    var resizeObserver = new ResizeObserver(function (entries) {
      entries.forEach(function (entry) {
        var iframe = entry.target;
        var card = iframe.closest(".reel-card");
        if (!card || card.getAttribute("data-aspect-pinned") === "true") return;
        if (!iframe.classList.contains("instagram-media-rendered")) return;

        var rect = entry.contentRect;
        if (rect.width < 120 || rect.height < 220) return;

        var prevTimer = timers.get(card);
        if (prevTimer) clearTimeout(prevTimer);

        var timer = setTimeout(function () {
          var liveRect = iframe.getBoundingClientRect();
          if (liveRect.width < 120 || liveRect.height < 220) return;

          // 9:16 embeds render > ~1.7x column width (video + IG header/footer);
          // 16:9 and square/letterboxed embeds render noticeably shorter.
          var ratio = liveRect.height / liveRect.width;
          var detected = ratio < 1.55 ? "16:9" : "9:16";
          var current = card.getAttribute("data-aspect");

          if (detected !== current) {
            card.setAttribute("data-aspect", detected);
            insertSorted(detected === "16:9" ? wideGrid : verticalGrid, card);
            updateCounts(root);
          }
        }, 250);

        timers.set(card, timer);
      });
    });

    var mutationObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        m.addedNodes.forEach(function (node) {
          if (node.nodeType !== 1) return;
          if (node.tagName === "IFRAME") {
            resizeObserver.observe(node);
          } else {
            var nested = node.querySelectorAll ? node.querySelectorAll("iframe") : [];
            nested.forEach(function (ifr) {
              resizeObserver.observe(ifr);
            });
          }
        });
      });
    });

    mutationObserver.observe(root, { childList: true, subtree: true });
  }

  function loadInstagramEmbedScript() {
    if (window.instgrm && window.instgrm.Embeds) {
      window.instgrm.Embeds.process();
      return;
    }
    if (document.querySelector('script[src*="instagram.com/embed.js"]')) {
      return;
    }
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.instagram.com/embed.js";
    script.onload = function () {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }
    };
    document.body.appendChild(script);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var root = document.querySelector("[data-reels-groups]");
    if (!root) return;

    var verticalGrid = root.querySelector('[data-aspect-grid="9:16"]');
    var wideGrid = root.querySelector('[data-aspect-grid="16:9"]');
    if (!verticalGrid || !wideGrid) return;

    var initialFilter = root.getAttribute("data-initial-filter") || "all";
    var itemsToRender = initialFilter === "best"
      ? REELS.filter(function (r) { return r.bestPick; })
      : REELS;

    var verticalFrag = document.createDocumentFragment();
    var wideFrag = document.createDocumentFragment();

    itemsToRender.forEach(function (reel, index) {
      var card = createReelCard(reel, index);
      if (reel.aspect === "16:9") {
        wideFrag.appendChild(card);
      } else {
        verticalFrag.appendChild(card);
      }
    });

    verticalGrid.appendChild(verticalFrag);
    wideGrid.appendChild(wideFrag);

    observeEmbedAspect(root);

    currentFilter = initialFilter;
    updateCounts(root);

    var targetId = root.id;
    if (targetId) {
      var buttons = document.querySelectorAll(
        '[data-filter-target="' + targetId + '"]'
      );
      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          currentFilter = btn.getAttribute("data-filter") || "all";
          buttons.forEach(function (b) {
            b.setAttribute("aria-pressed", b === btn ? "true" : "false");
          });
          updateCounts(root);
        });
      });
    }

    loadInstagramEmbedScript();
  });
})();
