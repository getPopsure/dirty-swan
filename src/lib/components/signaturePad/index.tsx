import React, { Component } from "react";

import SignaturePad from "signature_pad";

import styles from "./style.module.scss";

// Hacky solution to have image set up in css
// The images a manually converted to base64
// and then injected usign <style>
const sign =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjcgMy43MDAwMUMxMy4zIDQuMDAwMDEgMTMuNSA1LjEwMDAxIDE0LjEgNi4yMDAwMUMxNC43IDcuMzAwMDEgMTQuOSA5LjIwMDAxIDE0LjYgMTAuNUMxNC4xIDEyLjMgMTUuMyAxNC40IDE5LjMgMTkuN0MyMi4yIDIzLjQgMjUuNiAyOCAyNi45IDI5LjhMMjkuMiAzM0wyMyAzOS43QzE5LjcgNDMuNCAxNy4xIDQ2LjkgMTcuNCA0Ny42QzE3LjcgNDguMyAxNy4yIDQ5LjQgMTYuNCA1MEMxNC44IDUxLjQgMTQuNSA1NCAxNi4xIDU0QzE3LjUgNTQgMjMuNiA0OS41IDI5IDQ0LjRMMzMuNSA0MC4xTDQxIDUxLjNDNDkuMiA2My42IDUzLjcgNjkgNTUuOCA2OUM1Ni42IDY5IDU2LjggNjguNSA1Ni40IDY3LjdDNTYgNjcuMSA1Ny44IDY4LjkgNjAuNSA3MS44QzYzLjEgNzQuNyA2NS41IDc2LjkgNjUuNyA3Ni42QzY1LjkgNzYuNCA2NS4yIDc0LjQgNjQuMSA3Mi4xQzYyLjkgNjkuOSA2MiA2Ny4yIDYyIDY2LjJDNjIgNjMuMyA1NC41IDQ3LjYgNDguOSAzOUM0Ni4yIDM0LjggNDQgMzEgNDQgMzAuNkM0NCAzMC4yIDQ2LjIgMjcuMyA0OC45IDI0LjJDNTQuMyAxNy45IDU5IDExLjIgNTkgOS44MDAwMUM1OSA5LjMwMDAxIDU3LjcgOS4xMDAwMSA1NiA5LjUwMDAxQzU0LjIgOS45MDAwMSA1MC41IDEyLjcgNDYuNCAxNy4xQzQyLjcgMjAuOSAzOS40IDI0IDM5LjEgMjRDMzguOCAyNCAzNi4zIDIwLjcgMzMuNiAxNi44QzMwLjkgMTIuOSAyNy45IDkuNTAwMDEgMjcgOS4zMDAwMUMyNiA5LjAwMDAxIDI0LjMgNy42MDAwMSAyMy4yIDYuMTAwMDFDMjEuNyA0LjEwMDAxIDIwLjMgMy4zMDAwMSAxNy43IDMuMjAwMDFDMTUuOCAzLjEwMDAxIDE0IDMuMzAwMDEgMTMuNyAzLjcwMDAxWiIgZmlsbD0iIzhFOENFRSIvPgo8L3N2Zz4K";
const reset =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNFYxMEg3IiBzdHJva2U9IiM4RThDRUUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0zLjUxIDE0Ljk5OTlDNC4xNTgzOSAxNi44NDAzIDUuMzg3MzQgMTguNDIwMSA3LjAxMTY2IDE5LjUwMTNDOC42MzU5OCAyMC41ODI1IDEwLjU2NzcgMjEuMTA2NSAxMi41MTU3IDIwLjk5NDRDMTQuNDYzNyAyMC44ODIzIDE2LjMyMjYgMjAuMTQwMSAxNy44MTIxIDE4Ljg3OTdDMTkuMzAxNyAxNy42MTkzIDIwLjM0MTMgMTUuOTA4OSAyMC43NzQyIDE0LjAwNjNDMjEuMjA3MiAxMi4xMDM3IDIxLjAxMDEgMTAuMTExOSAyMC4yMTI2IDguMzMxMDVDMTkuNDE1MiA2LjU1MDE5IDE4LjA2MDUgNS4wNzY3NCAxNi4zNTI4IDQuMTMyNzFDMTQuNjQ1MSAzLjE4ODY4IDEyLjY3NjkgMi44MjUyMSAxMC43NDQ3IDMuMDk3MDdDOC44MTI0NSAzLjM2ODkyIDcuMDIwOTEgNC4yNjEzNyA1LjY0IDUuNjM5OTVMMSA5Ljk5OTk1IiBzdHJva2U9IiM4RThDRUUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=";

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
    onChange(this.signaturePad.isEmpty() ? "" : this.signaturePad.toDataURL());
    this.setState({ hasContent: !this.signaturePad.isEmpty() });
  }

  private resizeCanvas() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    this.canvas.width = this.canvas.offsetWidth * ratio;
    this.canvas.height = this.canvas.offsetHeight * ratio;
    this.canvas.getContext("2d").scale(ratio, ratio);
  }

  private clear() {
    this.signaturePad.clear();
    this.notifyOnChange();
  }
}

export default Signature;
