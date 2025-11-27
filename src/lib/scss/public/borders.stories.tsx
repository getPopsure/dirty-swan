import classNames from 'classnames';

const borders = [
  {
    name: 'Strong Default',
    className: 'border-strong-default',
    variable: '$border-strong-default',
    description: '1px solid neutral-400',
  },
  {
    name: 'Strong Hover',
    className: 'border-strong-hover',
    variable: '$border-strong-hover',
    description: '1px solid neutral-600',
  },
  {
    name: 'Strong Active',
    className: 'border-strong-active',
    variable: '$border-strong-active',
    description: '1px solid neutral-900',
  },
  {
    name: 'Medium Default',
    className: 'border-medium-default',
    variable: '$border-medium-default',
    description: '1px solid neutral-300',
  },
  {
    name: 'Medium Hover',
    className: 'border-medium-hover',
    variable: '$border-medium-hover',
    description: '1px solid neutral-500',
  },
  {
    name: 'Medium Active',
    className: 'border-medium-active',
    variable: '$border-medium-active',
    description: '1px solid neutral-800',
  },
  {
    name: 'Soft Default',
    className: 'border-soft-default',
    variable: '$border-soft-default',
    description: '1px solid neutral-200',
  },
  {
    name: 'Soft Hover',
    className: 'border-soft-hover',
    variable: '$border-soft-hover',
    description: '1px solid neutral-400',
  },
  {
    name: 'Soft Active',
    className: 'border-soft-active',
    variable: '$border-soft-active',
    description: '1px solid neutral-600',
  },
  {
    name: 'Focus',
    className: 'border-focus',
    variable: '$border-focus',
    description: '2px solid neutral-900',
  },
];

export const Borders = () => (
  <div className="bg-white">
    <h2 className="p-h2 mb24">Border Tokens</h2>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr
          style={{
            height: '40px',
            lineHeight: '40px',
            textAlign: 'left',
            borderBottom: '1px solid #e7e7ed',
          }}
        >
          <th className="pl16 fw-bold">Preview</th>
          <th className="pl16 fw-bold">Name</th>
          <th className="pl16 fw-bold">CSS Class</th>
          <th className="pl16 fw-bold">SCSS Variable</th>
          <th className="pl16 fw-bold">Description</th>
        </tr>
      </thead>
      <tbody>
        {borders.map((border) => (
          <tr key={border.className} style={{ height: '80px' }}>
            <td className="px24" style={{ verticalAlign: 'middle' }}>
              <div
                className={classNames('br8 bg-neutral-200', border.className)}
                style={{ width: '64px', height: '64px' }}
              />
            </td>
            <td className="p16" style={{ verticalAlign: 'middle' }}>
              {border.name}
            </td>
            <td className="p16" style={{ verticalAlign: 'middle' }}>
              {border.className}
            </td>
            <td className="p16" style={{ verticalAlign: 'middle' }}>
              {border.variable}
            </td>
            <td className="p16" style={{ verticalAlign: 'middle' }}>
              {border.description}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default {
  title: 'CSS/Base',
  component: Borders,
  parameters: {
    docs: {
      description: {
        component:
          'Border tokens for consistent border styling across the design system. Includes strong, medium, and soft variants with default, hover, active, and focus states.',
      },
    },
  },
};
