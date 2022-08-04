function PaletteItem(color) {
  return (
    <li className="pt-full sm:w-8 lg:w-auto xl:w-8 rounded-sm ring-1 ring-inset ring-slate-900/5 dark:ring-0 dark:highlight-white/10"></li>
  );
}

export default function Palette({ colors = [] }) {
  colors = [
    '#E6F7FF',
    '#BAE7FF',
    '#91D5FF',
    '#69C0FF',
    '#40A9FF',
    '#1890FF',
    '#096DD9',
    '#0050B3',
    '#003A8C',
    '#002766',
  ];
  const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);

    const getSelection = document.getSelection();

    const selected =
      getSelection && getSelection.rangeCount > 0
        ? getSelection.getRangeAt(0)
        : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
      getSelection && getSelection.removeAllRanges();
      getSelection && getSelection.addRange(selected);
    }
  };

  return (
    <div>
      <ul className="w-">
        {colors.map(color => (
          <PaletteItem color={color} />
        ))}
      </ul>
    </div>
  );
}
