const router = require("koa-router")();
const superagent = require("superagent");

router.get("/", async (ctx, next) => {
  const juejinConfig = {
    url: "https://api.juejin.cn/recommend_api/v1/article/recommend_all_feed",
    body: { id_type: 2, sort_type: 0, limit: 20 },
    headers: {
      "content-type": "application/json",
    },
  };

  const articlePromises = []
  const target = 20
  let i = 0
  while (i <= target) {
    articlePromises.push(superagent
      .post(juejinConfig.url)
      .send({
        ...juejinConfig.body,
        cursor: Buffer.from(`{"v":"7168775357762387999","i":${i}}`).toString('base64')
      })
      .set(juejinConfig.headers))
    i += 20
  }

  const res = await Promise.all(articlePromises)
  const articles = res.map(x => JSON.parse(x.text).data).flat().filter(x => x.item_type !== 14).sort((a, b) => b.item_info.article_info.digg_count - a.item_info.article_info.digg_count)
  await ctx.render("index", {
    articles
  });
});

router.get("/string", async (ctx, next) => {
  ctx.body = "koa2 string";
});

router.get("/json", async (ctx, next) => {
  ctx.body = {
    title: "koa2 json",
  };
});

module.exports = router;
