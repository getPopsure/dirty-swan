import { ToasterProps, Toast, ToastProps, ToastType, Toaster, toast } from '.';
import { Button } from '../button';
import styles from './style.module.scss';
import classNames from 'classnames';

const toastTypes: ToastType[] = ['success', 'warning', 'error', 'information'];

const story = {
  title: 'JSX/Toast',
  component: Toast,
  argTypes: {
    title: {
      description: 'Title of the toast.',
    },
    description: {
      description:
        'Additional description content to be displayed inside the toast.',
    },
    type: {
      description:
        'Type of toast to display. This changes the styles/colors of the toast.',
    },
    action: {
      description:
        'Object containing a possible action button inside the toast.',
    },
    duration: {
      description: 'Duration in ms that the toast should be displayed.',
      table: {
        defaultValue: { summary: 3000 },
      },
    },
    onDismiss: {
      table: {
        disable: true,
      },
    },
    classNames: {
      description:
        'Allows customization of toast and toast wrapper (named as Toaster)',
      table: {
        category: 'Toaster props',
      },
    },
  },
  args: {
    title: 'We couldn’t open the chat',
    description:
      "We couldn't open the chat description. We couldn't open the chat description.",
    action: {
      title: 'Send an email',
      onClick: () => {},
    },
    type: 'success',
    duration: 3000,
    classNames: {
      toast: '',
      wrapper: '',
    },
  },
};

const FakeInlineToast = ({
  title,
  description,
  action,
  type,
}: Omit<ToastProps, 'onDismiss'>) => (
  <div className="mb32">
    <div
      className={classNames(styles.toast, 'br8 bs-lg d-inline-flex')}
      style={{
        padding: '12px 20px',
      }}
    >
      <Toast
        title={title}
        onDismiss={() => {}}
        description={description}
        action={action}
        type={type}
      />
    </div>
  </div>
);

export const ToastStory = {
  render: ({
    title,
    description,
    action,
    type,
    duration,
    classNames: toasterClassNames,
  }: ToastProps & ToasterProps) => {
    const showToast = () =>
      toast(title, {
        description,
        duration,
        type,
        action,
      });

    return (
      <>
        <div className="mb16">
          <div>Show a toast using the following code:</div>
          <pre className="bg-neutral-300 br4 d-inline-flex p8 mt8">
            {'() => toast(title, { description, type, action })'}
          </pre>
        </div>
        <Toaster classNames={toasterClassNames} />

        <Button onClick={showToast}>Click here to trigger toast</Button>
      </>
    );
  },

  name: 'Toast',
};

export const ToastTypes = {
  render: (props: ToastProps) => {
    return (
      <>
        {toastTypes.map((toastType) => (
          <div key={toastType} className="d-flex fd-column">
            <h3 className="p-h3 mb16">{toastType}</h3>
            <FakeInlineToast {...props} type={toastType} />
          </div>
        ))}
      </>
    );
  },
};

export const ToastContent = {
  render: ({ title, description, action }: ToastProps) => {
    return (
      <div className="d-flex fd-column">
        <FakeInlineToast title={title} />
        <FakeInlineToast title={title} description={description} />
        <FakeInlineToast
          title={title}
          description={description}
          action={action}
        />
        <FakeInlineToast title={title} action={action} />
      </div>
    );
  },
};

export default story;
