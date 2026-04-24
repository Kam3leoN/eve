import { type CSSProperties, useEffect, useState } from 'react';
import { DocCodeBlock, DocDemo } from '../components/DocPrimitives';

const SHAPES = [
  { name: 'circle', label: 'Circle' },
  { name: 'square', label: 'Square' },
  { name: 'slanted', label: 'Slanted' },
  { name: 'arch', label: 'Arch' },
  { name: 'semicircle', label: 'Semicircle' },
  { name: 'oval', label: 'Oval' },
  { name: 'pill', label: 'Pill' },
  { name: 'triangle', label: 'Triangle' },
  { name: 'arrow', label: 'Arrow' },
  { name: 'fan', label: 'Fan' },
  { name: 'diamond', label: 'Diamond' },
  { name: 'clamshell', label: 'Clamshell' },
  { name: 'pentagon', label: 'Pentagon' },
  { name: 'gem', label: 'Gem' },
  { name: 'sunnysoft', label: 'Very sunny' },
  { name: 'sunny', label: 'Sunny' },
  { name: 'sides4', label: '4-sided cookie' },
  { name: 'sides6', label: '6-sided cookie' },
  { name: 'sides7', label: '7-sided cookie' },
  { name: 'sides9', label: '9-sided cookie' },
  { name: 'sides12', label: '12-sided cookie' },
  { name: 'leaf4', label: '4-leaf clover' },
  { name: 'leaf8', label: '8-leaf clover' },
  { name: 'burst', label: 'Burst' },
  { name: 'burstsoft', label: 'Soft burst' },
  { name: 'boom', label: 'Boom' },
  { name: 'boomsoft', label: 'Soft boom' },
  { name: 'flower', label: 'Flower' },
  { name: 'puffy', label: 'Puffy' },
  { name: 'puffydiamond', label: 'Puffy diamond' },
  { name: 'ghost', label: 'Ghost ish' },
  { name: 'pixelcircle', label: 'Pixel circle' },
  { name: 'pixeltriangle', label: 'Pixel triangle' },
  { name: 'bun', label: 'Bun' },
  { name: 'heart', label: 'Heart' },
] as const;
type ShapeMotion = 'emphasized' | 'emphasized-recoil' | 'spin' | 'spin-inverse';

export function ShapePage() {
  const [shapeColor, setShapeColor] = useState('#ee4540');
  const [shapeAnimated, setShapeAnimated] = useState(false);
  const [shapeMotion, setShapeMotion] = useState<ShapeMotion>('emphasized-recoil');

  const shapeRowStyle = {
    '--liblayout-columns': 5,
  } as CSSProperties;

  useEffect(() => {
    document.title = 'Composant Shape - Eve Docs';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      'content',
      'Shape library Material 3 Expressive: 35 formes dans un unique composant Web lib-shape.',
    );
  }, []);

  return (
    <section>
      <h2>Shape</h2>
      <p>
        <code>lib-shape</code> expose les 35 formes Material 3 Expressive via l&apos;attribut{' '}
        <code>name</code>, avec un seul SVG interne.
      </p>

      <DocDemo title="Playground">
        <div className="stack" style={{ gap: '1rem' }}>
          <label htmlFor="shape-color-input">
            Couleur (hex ou rgba)
            <input
              id="shape-color-input"
              type="text"
              value={shapeColor}
              onChange={(event) => setShapeColor(event.target.value)}
              placeholder="#ee4540 ou rgba(0,0,0,0.5)"
              style={{ marginInlineStart: '0.75rem', minInlineSize: '18rem' }}
            />
          </label>

          <label htmlFor="shape-animated-input">
            <input
              id="shape-animated-input"
              type="checkbox"
              checked={shapeAnimated}
              onChange={(event) => setShapeAnimated(event.target.checked)}
              style={{ marginInlineEnd: '0.5rem' }}
            />
            Activer animation
          </label>

          <label htmlFor="shape-motion-input">
            Type d&apos;animation
            <select
              id="shape-motion-input"
              value={shapeMotion}
              onChange={(event) => setShapeMotion(event.target.value as ShapeMotion)}
              style={{ marginInlineStart: '0.75rem' }}
            >
              <option value="emphasized">Emphasized</option>
              <option value="emphasized-recoil">Emphasized (recoil)</option>
              <option value="spin">Spin</option>
              <option value="spin-inverse">Spin inverse</option>
            </select>
          </label>

          <lib-card variant="filled" className="docs-shape-card">
            <div className="docs-shape-preview">
              <lib-shape
                name="flower"
                color={shapeColor}
                motion={shapeAnimated ? shapeMotion : 'none'}
                recoil={shapeAnimated && shapeMotion === 'emphasized-recoil'}
                aria-label="Shape playground"
              />
            </div>
            <p slot="supporting" className="docs-shape-label">
              Valeur courante: <code>{shapeColor || 'currentColor'}</code>
            </p>
          </lib-card>
        </div>
      </DocDemo>

      <DocDemo title="Bibliothèque de formes">
        <div className="row g-2" style={shapeRowStyle} role="list" aria-label="Shape library">
          {SHAPES.map((shape) => (
            <div key={shape.name} className="s1 docs-shape-item" role="listitem">
              <lib-card variant="filled" className="docs-shape-card">
                <div className="docs-shape-preview">
                  <lib-shape name={shape.name} aria-label={shape.label} />
                </div>
                <p slot="supporting" className="docs-shape-label">
                  {shape.label}
                </p>
              </lib-card>
            </div>
          ))}
        </div>
      </DocDemo>

      <DocDemo title="Code">
        <DocCodeBlock>{`<lib-shape name="clamshell" color="#ee4540"></lib-shape>
<lib-shape name="sunnysoft" aria-label="Very sunny"></lib-shape>
<lib-shape name="flower" color="rgba(0,0,0,0.5)"></lib-shape>
<lib-shape name="flower" motion="emphasized" recoil></lib-shape>
<lib-shape name="flower" motion="spin"></lib-shape>
<lib-shape name="flower" motion="spin-inverse"></lib-shape>
<lib-shape name="pixeltriangle"></lib-shape>`}</DocCodeBlock>
      </DocDemo>
    </section>
  );
}
