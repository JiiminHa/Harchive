import { readFileSync, writeFileSync } from "node:fs";
import Parser from "rss-parser";

// rss-parser 생성
const parser = new Parser({
  headers: {
    Accept: "application/rss+xml, application/xml, text/xml; q=0.1",
  },
});

(async () => {
  const feed = await parser.parseURL("https://jiminha.tistory.com/rss");

  let blogList = `<ul>`;
  for (let i = 0; i < 10; i++) {
    const item = feed.items[i];
    if (!item) break;

    const { title, link } = item;
    blogList += `<li><a href='${link}' target='_blank'>${title}</a></li>`;
  }
  blogList += `</ul>`;

  // 기존 README.md 읽기
  const readme = readFileSync("README.md", "utf8");

  // 블로그 마커 영역만 교체
  const updated = readme.replace(
    /<!-- BLOG-START -->([\s\S]*?)<!-- BLOG-END -->/,
    `<!-- BLOG-START -->\n${blogList}\n<!-- BLOG-END -->`
  );

  writeFileSync("README.md", updated, "utf8");
  console.log("✅ README.md 블로그 영역 자동 업데이트 완료");
})();
