import React, { Component } from 'react';

import SignaturePad from 'signature_pad';

import styles from './style.module.scss';

import sign from './img/sign.svg';
import reset from './img/reset.svg';

interface Props {
  onChange: (base64signature: string) => void;
}

interface State {
  hasContent: boolean;
}

class Signature extends Component<Props, State> {
  private canvasRef: React.RefObject<HTMLCanvasElement>;
  private canvas: any;
  private signaturePad: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasContent: false,
    };
    this.canvasRef = React.createRef();
    this.notifyOnChange = this.notifyOnChange.bind(this);
    this.resizeCanvas = this.resizeCanvas.bind(this);
    this.clear = this.clear.bind(this);
  }

  public componentDidMount() {
    this.canvas = this.canvasRef.current;
    this.signaturePad = new SignaturePad(this.canvas, {
      onEnd: this.notifyOnChange,
    });
    this.resizeCanvas();
  }

  public render() {
    const { hasContent } = this.state;

    return (
      <>
        <style
          dangerouslySetInnerHTML={{
            __html: `.${styles.reset}::before { 
              -webkit-mask-image: url("${reset}");
              mask-image: url("${reset}");
           }`,
          }}
        />
        <div className={styles.container}>
          <canvas className={styles.canvas} ref={this.canvasRef} />
          <div className={styles.separator} />
          <div
            className={styles.sign}
            style={{
              WebkitMaskImage: `url("${sign}")`,
              maskImage: `url("${sign}")`,
            }}
          />
          <button
            className={styles.reset}
            onClick={this.clear}
            disabled={!hasContent}
          >
            Reset
          </button>
        </div>
      </>
    );
  }

  private notifyOnChange() {
    const { onChange } = this.props;
    onChange(this.signaturePad.isEmpty() ? '' : this.signaturePad.toDataURL());
    this.setState({ hasContent: !this.signaturePad.isEmpty() });
  }

  private resizeCanvas() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    this.canvas.width = this.canvas.offsetWidth * ratio;
    this.canvas.height = this.canvas.offsetHeight * ratio;
    this.canvas.getContext('2d').scale(ratio, ratio);
  }

  private clear() {
    this.signaturePad.clear();
    this.notifyOnChange();
  }
}

export default Signature;
