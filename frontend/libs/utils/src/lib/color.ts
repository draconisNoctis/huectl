const REGEXP_HEX_SHORT = /^#[0-9a-f]{3}$/i;
const REGEXP_HEX_ALPHA_SHORT = /^#[0-9a-f]{4}$/i;
const REGEXP_HEX = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
const REGEXP_HEX_ALPHA = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;

export class Color {
    /**
     *
     * @param {number} R 0..255
     * @param {number} G 0..255
     * @param {number} B 0..255
     * @param {number} alpha 0..1
     */
    constructor(
        public readonly R: number,
        public readonly G: number,
        public readonly B: number,
        public readonly alpha: number = 1
    ) {}

    /**
     *
     * @param {string} hex #fff #ffff #ffffff #ffffffff
     * @returns {Color}
     */
    static fromHex(hex: string): Color {
        if (REGEXP_HEX_SHORT.test(hex) || REGEXP_HEX_ALPHA_SHORT.test(hex)) {
            hex = hex.replace(/[0-9a-f]/i, t => t + t);
        }

        const r = parseInt(hex.substr(1, 2), 16);
        const g = parseInt(hex.substr(3, 2), 16);
        const b = parseInt(hex.substr(5, 2), 16);
        const a = hex.length > 7 ? parseInt(hex.substr(7, 2), 16) / 255 : 1;

        return new Color(r, g, b, a);
    }
    
    /**
     *
     * @param {number} H 0..360
     * @param {number} S 0..1
     * @param {number} V 0..1
     * @returns {Color}
     */
    static fromHSV(H: number, S: number, V: number): Color {
        const h = (H / 60) | 0;
        const f = H / 60 - h;
        const p = V * (1 - S);
        const q = V * (1 - S * f);
        const t = V * (1 - S * (1 - f));

        let R = 0,
            G = 0,
            B = 0;

        if (H < 60) {
            R = V;
            G = t;
            B = p;
        } else if (H < 120) {
            R = q;
            G = V;
            B = p;
        } else if (H < 180) {
            R = p;
            G = V;
            B = t;
        } else if (H < 240) {
            R = p;
            G = q;
            B = V;
        } else if (H < 300) {
            R = t;
            G = p;
            B = V;
        } else {
            R = V;
            G = p;
            B = q;
        }

        return new Color((R * 255) | 0, (G * 255) | 0, (B * 255) | 0);
    }
    
    toHtml() {
        if(1 === this.alpha) {
            return `rgb(${this.R}, ${this.G}, ${this.B})`;
        }
        return `rgba(${this.R}, ${this.G}, ${this.B}, ${this.alpha})`;
    }
}
