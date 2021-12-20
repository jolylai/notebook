const observer = new MutationObserver(entities => {
  console.log('entities: ', entities);
});

observer.observe(document.body, { attributes: true, attributeOldValue: true });

const img = document.getElementById('img');

const btn = document.getElementById('btn');

const handler = () => {
  document.body.className = 'foo';
  document.body.className = 'bar';
  document.body.className = 'baz';
};

btn.addEventListener('click', handler, false);
