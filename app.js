// Mock Compliance Data based on the brief
const complianceData = [
    {
        id: 'c1',
        title: 'Minimum corridor width',
        status: 'fail',
        description: 'Corridor width of 1,050mm does not meet the 1,200mm minimum required. Revise the corridor width in the floor plan.',
        extractedValue: '1,050mm',
        requiredValue: '1,200mm',
        regulationRef: 'UBBL 1984 Reg. 42',
        comment: '',
        page: 1,
        x: 10, // percentage coordinates for pin
        y: 69
    },
    {
        id: 'c2',
        title: 'Number of emergency exits',
        status: 'fail',
        description: 'System flagged: minimum 2 exits required. Submitter has added a comment: \'Second exit shown on Level 2, page 4.\' Reviewer decision pending.',
        extractedValue: '1',
        requiredValue: '2 exits minimum',
        regulationRef: 'UBBL 1984 Reg. 165',
        comment: 'Second exit shown on Level 2, page 4.',
        page: 1,
        x: 23.5,
        y: 78
    },
    {
        id: 'c3',
        title: 'Gross floor area',
        status: 'flagged',
        description: 'Could not be extracted from the drawing. Enter the value manually before running compliance analysis.',
        extractedValue: 'Not extracted',
        requiredValue: 'Required for analysis',
        regulationRef: 'UBBL 1984 Reg. 3',
        comment: '',
        page: 2,
        x: 69,
        y: 68
    },
    {
        id: 'c4',
        title: 'Setback from road boundary',
        status: 'pass',
        description: 'Extracted value of 4,500mm meets the 3,000mm minimum. No action required.',
        extractedValue: '4,500mm',
        requiredValue: '3,000mm minimum',
        regulationRef: 'UBBL 1984 Reg. 13',
        comment: '',
        page: 3,
        x: 57,
        y: 78
    }
];

// SVGs for the 3 pages
const pages = [
`
<svg class="drawing-svg" id="svg-page-1" viewBox="0 0 860 540" xmlns="http://www.w3.org/2000/svg">

    <rect width="860" height="540" fill="#F7F7F4"/>

    <!-- Drawing border -->
    <rect x="20" y="20" width="820" height="500" fill="none" stroke="#AAAAAA" stroke-width="1"/>
    <!-- Inner margin line -->
    <rect x="30" y="30" width="800" height="480" fill="none" stroke="#CCCCCC" stroke-width="0.5" stroke-dasharray="4,3"/>

    <!-- ── Outer building walls ── -->
    <rect x="80" y="70" width="530" height="370" fill="#EFEFEC" stroke="#2C2C2C" stroke-width="5"/>

    <!-- ── Interior walls ── -->
    <!-- Vertical: bedroom/living divide -->
    <line x1="300" y1="70"  x2="300" y2="290" stroke="#2C2C2C" stroke-width="3.5"/>
    <!-- Vertical: right zone -->
    <line x1="460" y1="70"  x2="460" y2="290" stroke="#2C2C2C" stroke-width="3.5"/>
    <!-- Horizontal: upper/lower split -->
    <line x1="80"  y1="290" x2="610" y2="290" stroke="#2C2C2C" stroke-width="3.5"/>
    <!-- Horizontal: bedroom internal -->
    <line x1="80"  y1="200" x2="300" y2="200" stroke="#2C2C2C" stroke-width="3.5"/>
    <!-- Bathroom wall -->
    <line x1="300" y1="200" x2="460" y2="200" stroke="#2C2C2C" stroke-width="3.5"/>
    <!-- Lower corridor -->
    <line x1="300" y1="290" x2="300" y2="440" stroke="#2C2C2C" stroke-width="3.5"/>
    <!-- Lower right -->
    <line x1="450" y1="290" x2="450" y2="440" stroke="#2C2C2C" stroke-width="3.5"/>

    <!-- ── Windows (light blue) ── -->
    <rect x="100" y="67" width="60" height="6" fill="#A8D8EA" stroke="#5599BB" stroke-width="0.8"/>
    <rect x="200" y="67" width="60" height="6" fill="#A8D8EA" stroke="#5599BB" stroke-width="0.8"/>
    <rect x="315" y="67" width="55" height="6" fill="#A8D8EA" stroke="#5599BB" stroke-width="0.8"/>
    <rect x="470" y="67" width="80" height="6" fill="#A8D8EA" stroke="#5599BB" stroke-width="0.8"/>
    <rect x="607" y="100" width="6" height="60" fill="#A8D8EA" stroke="#5599BB" stroke-width="0.8"/>
    <rect x="607" y="210" width="6" height="55" fill="#A8D8EA" stroke="#5599BB" stroke-width="0.8"/>
    <rect x="100" y="437" width="55" height="6" fill="#A8D8EA" stroke="#5599BB" stroke-width="0.8"/>
    <rect x="350" y="437" width="60" height="6" fill="#A8D8EA" stroke="#5599BB" stroke-width="0.8"/>
    <rect x="460" y="437" width="70" height="6" fill="#A8D8EA" stroke="#5599BB" stroke-width="0.8"/>

    <!-- ── Doors ── -->
    <!-- Bedroom 1 door + swing -->
    <line x1="80" y1="200" x2="120" y2="200" stroke="#2C2C2C" stroke-width="2.5"/>
    <path d="M 80 200 Q 80 165 115 162" fill="none" stroke="#777" stroke-width="1.2" stroke-dasharray="3,2"/>
    <!-- Bedroom 2 door + swing -->
    <line x1="310" y1="80" x2="310" y2="118" stroke="#2C2C2C" stroke-width="2.5"/>
    <path d="M 310 80 Q 345 80 348 115" fill="none" stroke="#777" stroke-width="1.2" stroke-dasharray="3,2"/>
    <!-- Bathroom door -->
    <line x1="310" y1="210" x2="310" y2="244" stroke="#2C2C2C" stroke-width="2.5"/>
    <path d="M 310 210 Q 340 210 343 240" fill="none" stroke="#777" stroke-width="1.2" stroke-dasharray="3,2"/>
    <!-- Main entrance -->
    <line x1="160" y1="440" x2="220" y2="440" stroke="#2C2C2C" stroke-width="2.5"/>
    <path d="M 160 440 Q 160 405 195 402" fill="none" stroke="#777" stroke-width="1.2" stroke-dasharray="3,2"/>
    <!-- Living room door -->
    <line x1="460" y1="305" x2="460" y2="340" stroke="#2C2C2C" stroke-width="2.5"/>

    <!-- ── Room labels (callout A) ── -->
    <text x="190" y="148" text-anchor="middle" font-size="11.5" fill="#1A1A2E" font-family="Arial" font-weight="700">BEDROOM 1</text>
    <text x="190" y="164" text-anchor="middle" font-size="10"   fill="#666"   font-family="Arial">4,200 × 3,600 mm</text>

    <text x="380" y="128" text-anchor="middle" font-size="11.5" fill="#1A1A2E" font-family="Arial" font-weight="700">BEDROOM 2</text>
    <text x="380" y="144" text-anchor="middle" font-size="10"   fill="#666"   font-family="Arial">3,800 × 3,600 mm</text>

    <text x="380" y="248" text-anchor="middle" font-size="10"   fill="#1A1A2E" font-family="Arial" font-weight="700">BATHROOM</text>
    <text x="380" y="262" text-anchor="middle" font-size="9.5"  fill="#666"   font-family="Arial">1,900 × 2,400 mm</text>

    <text x="190" y="342" text-anchor="middle" font-size="11.5" fill="#1A1A2E" font-family="Arial" font-weight="700">KITCHEN</text>
    <text x="190" y="358" text-anchor="middle" font-size="10"   fill="#666"   font-family="Arial">3,500 × 3,200 mm</text>

    <text x="535" y="175" text-anchor="middle" font-size="11.5" fill="#1A1A2E" font-family="Arial" font-weight="700">LIVING /</text>
    <text x="535" y="191" text-anchor="middle" font-size="11.5" fill="#1A1A2E" font-family="Arial" font-weight="700">DINING</text>
    <text x="535" y="207" text-anchor="middle" font-size="10"   fill="#666"   font-family="Arial">6,200 × 5,600 mm</text>

    <text x="190" y="398" text-anchor="middle" font-size="10.5" fill="#1A1A2E" font-family="Arial">CORRIDOR</text>
    <text x="190" y="412" text-anchor="middle" font-size="9.5"  fill="#666"   font-family="Arial">1,200 mm wide</text>

    <text x="530" y="370" text-anchor="middle" font-size="10.5" fill="#1A1A2E" font-family="Arial" font-weight="700">UTILITY</text>
    <text x="530" y="385" text-anchor="middle" font-size="9.5"  fill="#666"   font-family="Arial">2,800 × 2,400 mm</text>

    <!-- ── Dimension strings (callout B) ── -->
    <!-- Overall top -->
    <line x1="80" y1="38" x2="610" y2="38" stroke="#1565C0" stroke-width="1"/>
    <line x1="80" y1="34" x2="80" y2="42" stroke="#1565C0" stroke-width="1"/>
    <line x1="610" y1="34" x2="610" y2="42" stroke="#1565C0" stroke-width="1"/>
    <text x="345" y="34" text-anchor="middle" font-size="10.5" fill="#1565C0" font-family="Arial" font-weight="700">17,600</text>

    <!-- Top segments -->
    <line x1="80" y1="52" x2="300" y2="52" stroke="#1565C0" stroke-width="0.8"/>
    <line x1="80" y1="48" x2="80" y2="56" stroke="#1565C0" stroke-width="0.8"/>
    <line x1="300" y1="48" x2="300" y2="56" stroke="#1565C0" stroke-width="0.8"/>
    <text x="190" y="49" text-anchor="middle" font-size="9.5" fill="#1565C0" font-family="Arial">7,200</text>

    <line x1="300" y1="52" x2="460" y2="52" stroke="#1565C0" stroke-width="0.8"/>
    <line x1="460" y1="48" x2="460" y2="56" stroke="#1565C0" stroke-width="0.8"/>
    <text x="380" y="49" text-anchor="middle" font-size="9.5" fill="#1565C0" font-family="Arial">4,800</text>

    <line x1="460" y1="52" x2="610" y2="52" stroke="#1565C0" stroke-width="0.8"/>
    <line x1="610" y1="48" x2="610" y2="56" stroke="#1565C0" stroke-width="0.8"/>
    <text x="535" y="49" text-anchor="middle" font-size="9.5" fill="#1565C0" font-family="Arial">4,500</text>

    <!-- Overall right side -->
    <line x1="636" y1="70" x2="636" y2="440" stroke="#1565C0" stroke-width="1"/>
    <line x1="632" y1="70" x2="640" y2="70" stroke="#1565C0" stroke-width="1"/>
    <line x1="632" y1="440" x2="640" y2="440" stroke="#1565C0" stroke-width="1"/>
    <text x="655" y="259" text-anchor="middle" font-size="10.5" fill="#1565C0" font-family="Arial" font-weight="700" transform="rotate(90,655,259)">12,200</text>

    <!-- Right segments -->
    <line x1="622" y1="70"  x2="622" y2="290" stroke="#1565C0" stroke-width="0.8"/>
    <line x1="618" y1="70"  x2="626" y2="70"  stroke="#1565C0" stroke-width="0.8"/>
    <line x1="618" y1="290" x2="626" y2="290" stroke="#1565C0" stroke-width="0.8"/>
    <text x="616" y="185" text-anchor="middle" font-size="9.5" fill="#1565C0" font-family="Arial" transform="rotate(90,616,185)">7,400</text>

    <line x1="622" y1="290" x2="622" y2="440" stroke="#1565C0" stroke-width="0.8"/>
    <line x1="618" y1="440" x2="626" y2="440" stroke="#1565C0" stroke-width="0.8"/>
    <text x="616" y="368" text-anchor="middle" font-size="9.5" fill="#1565C0" font-family="Arial" transform="rotate(90,616,368)">4,800</text>

    <!-- Corridor width callout -->
    <line x1="85" y1="295" x2="85" y2="438" stroke="#C62828" stroke-width="0.8" stroke-dasharray="3,2"/>
    <line x1="85" y1="295" x2="300" y2="295" stroke="#C62828" stroke-width="0.8" stroke-dasharray="3,2"/>
    <line x1="85" y1="438" x2="300" y2="438" stroke="#C62828" stroke-width="0.8" stroke-dasharray="3,2"/>
    <line x1="88" y1="295" x2="88" y2="438" stroke="#C62828" stroke-width="1.2"/>
    <line x1="84" y1="295" x2="92" y2="295" stroke="#C62828" stroke-width="1.2"/>
    <line x1="84" y1="438" x2="92" y2="438" stroke="#C62828" stroke-width="1.2"/>
    <text x="98" y="372" font-size="9" fill="#C62828" font-family="Arial" font-weight="700">CORRIDOR</text>
    <text x="98" y="384" font-size="9" fill="#C62828" font-family="Arial" font-weight="700">W=1,200</text>

    <!-- ── Emergency exits (callout C) ── -->
    <rect x="155" y="432" width="70" height="14" fill="none" stroke="#2E7D32" stroke-width="1.5" stroke-dasharray="4,2"/>
    <text x="190" y="426" text-anchor="middle" font-size="8.5" fill="#2E7D32" font-family="Arial" font-weight="700">EXIT 1</text>

    <!-- ── North arrow ── -->
    <circle cx="690" cy="430" r="22" fill="none" stroke="#555" stroke-width="1.2"/>
    <polygon points="690,410 684,440 690,435 696,440" fill="#2C2C2C"/>
    <text x="690" y="460" text-anchor="middle" font-size="10" fill="#333" font-family="Arial" font-weight="700">N</text>

    <!-- ── Scale bar ── -->
    <line x1="700" y1="380" x2="820" y2="380" stroke="#333" stroke-width="1.5"/>
    <line x1="700" y1="376" x2="700" y2="384" stroke="#333" stroke-width="1.5"/>
    <line x1="760" y1="376" x2="760" y2="384" stroke="#333" stroke-width="1.5"/>
    <line x1="820" y1="376" x2="820" y2="384" stroke="#333" stroke-width="1.5"/>
    <rect x="700" y="376" width="60" height="8" fill="#333"/>
    <rect x="760" y="376" width="60" height="8" fill="none" stroke="#333" stroke-width="1"/>
    <text x="700" y="396" text-anchor="middle" font-size="9" fill="#333" font-family="Arial">0</text>
    <text x="760" y="396" text-anchor="middle" font-size="9" fill="#333" font-family="Arial">3m</text>
    <text x="820" y="396" text-anchor="middle" font-size="9" fill="#333" font-family="Arial">6m</text>
    <text x="760" y="408" text-anchor="middle" font-size="9" fill="#555" font-family="Arial">SCALE 1:100</text>

    </svg>
`,

`
<svg class="drawing-svg" id="svg-page-2" viewBox="0 0 860 440" xmlns="http://www.w3.org/2000/svg">

    <rect width="860" height="440" fill="#F7F7F4"/>
    <rect x="20" y="20" width="820" height="400" fill="none" stroke="#AAAAAA" stroke-width="1"/>
    <rect x="30" y="30" width="800" height="380" fill="none" stroke="#CCCCCC" stroke-width="0.5" stroke-dasharray="4,3"/>

    <!-- Main table -->
    <rect x="60" y="60" width="580" height="330" fill="#fff" stroke="#BDBDBD" stroke-width="1"/>

    <!-- Table title -->
    <rect x="60" y="60" width="580" height="28" fill="#1A1A2E"/>
    <text x="350" y="79" text-anchor="middle" font-size="12" fill="#fff" font-family="Arial" font-weight="700">ROOM SCHEDULE / JADUAL BILIK</text>

    <!-- Column headers -->
    <rect x="60" y="88" width="580" height="22" fill="#E8EAF0"/>
    <text x="100" y="103" font-size="10" fill="#1A1A2E" font-family="Arial" font-weight="700">No.</text>
    <text x="145" y="103" font-size="10" fill="#1A1A2E" font-family="Arial" font-weight="700">Room / Bilik</text>
    <text x="340" y="103" font-size="10" fill="#1A1A2E" font-family="Arial" font-weight="700">Length (mm)</text>
    <text x="450" y="103" font-size="10" fill="#1A1A2E" font-family="Arial" font-weight="700">Width (mm)</text>
    <text x="565" y="103" font-size="10" fill="#1A1A2E" font-family="Arial" font-weight="700">Area (m²)</text>
    <line x1="60" y1="110" x2="640" y2="110" stroke="#BDBDBD" stroke-width="0.8"/>

    <!-- Data rows -->
    <!-- Vertical separators -->
    <line x1="130" y1="88" x2="130" y2="390" stroke="#DDDDDD" stroke-width="0.5"/>
    <line x1="330" y1="88" x2="330" y2="390" stroke="#DDDDDD" stroke-width="0.5"/>
    <line x1="440" y1="88" x2="440" y2="390" stroke="#DDDDDD" stroke-width="0.5"/>
    <line x1="550" y1="88" x2="550" y2="390" stroke="#DDDDDD" stroke-width="0.5"/>

    <!-- Row data -->
    <!-- Row 1 -->
    <text x="100" y="128" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">1</text>
    <text x="145" y="128" font-size="10.5" fill="#333" font-family="Arial">Bedroom 1 / Bilik Tidur 1</text>
    <text x="380" y="128" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">4,200</text>
    <text x="490" y="128" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">3,600</text>
    <text x="595" y="128" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">15.12</text>
    <line x1="60" y1="136" x2="640" y2="136" stroke="#EEEEEE" stroke-width="0.5"/>

    <!-- Row 2 shaded -->
    <rect x="61" y="136" width="578" height="26" fill="#F8FAFB"/>
    <text x="100" y="154" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">2</text>
    <text x="145" y="154" font-size="10.5" fill="#333" font-family="Arial">Bedroom 2 / Bilik Tidur 2</text>
    <text x="380" y="154" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">3,800</text>
    <text x="490" y="154" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">3,600</text>
    <text x="595" y="154" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">13.68</text>
    <line x1="60" y1="162" x2="640" y2="162" stroke="#EEEEEE" stroke-width="0.5"/>

    <!-- Row 3 -->
    <text x="100" y="180" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">3</text>
    <text x="145" y="180" font-size="10.5" fill="#333" font-family="Arial">Bathroom / Bilik Mandi</text>
    <text x="380" y="180" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">1,900</text>
    <text x="490" y="180" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">2,400</text>
    <text x="595" y="180" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">4.56</text>
    <line x1="60" y1="188" x2="640" y2="188" stroke="#EEEEEE" stroke-width="0.5"/>

    <!-- Row 4 shaded -->
    <rect x="61" y="188" width="578" height="26" fill="#F8FAFB"/>
    <text x="100" y="206" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">4</text>
    <text x="145" y="206" font-size="10.5" fill="#333" font-family="Arial">Kitchen / Dapur</text>
    <text x="380" y="206" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">3,500</text>
    <text x="490" y="206" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">3,200</text>
    <text x="595" y="206" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">11.20</text>
    <line x1="60" y1="214" x2="640" y2="214" stroke="#EEEEEE" stroke-width="0.5"/>

    <!-- Row 5 -->
    <text x="100" y="232" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">5</text>
    <text x="145" y="232" font-size="10.5" fill="#333" font-family="Arial">Living / Dining / Ruang Tamu</text>
    <text x="380" y="232" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">6,200</text>
    <text x="490" y="232" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">5,600</text>
    <text x="595" y="232" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">34.72</text>
    <line x1="60" y1="240" x2="640" y2="240" stroke="#EEEEEE" stroke-width="0.5"/>

    <!-- Row 6 shaded -->
    <rect x="61" y="240" width="578" height="26" fill="#F8FAFB"/>
    <text x="100" y="258" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">6</text>
    <text x="145" y="258" font-size="10.5" fill="#333" font-family="Arial">Corridor / Koridor</text>
    <text x="380" y="258" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">3,680</text>
    <text x="490" y="258" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">1,200</text>
    <!-- Flagged value -->
    <rect x="558" y="244" width="74" height="22" rx="2" fill="#FFF3E0"/>
    <text x="595" y="258" text-anchor="middle" font-size="10" fill="#E65100" font-family="Arial" font-weight="700">4.42 ⚠</text>
    <line x1="60" y1="266" x2="640" y2="266" stroke="#EEEEEE" stroke-width="0.5"/>

    <!-- Row 7 -->
    <text x="100" y="284" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">7</text>
    <text x="145" y="284" font-size="10.5" fill="#333" font-family="Arial">Utility / Bilik Stor</text>
    <text x="380" y="284" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">2,800</text>
    <text x="490" y="284" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">2,400</text>
    <text x="595" y="284" text-anchor="middle" font-size="10.5" fill="#333" font-family="Arial">6.72</text>
    <line x1="60" y1="292" x2="640" y2="292" stroke="#BDBDBD" stroke-width="0.8"/>

    <!-- GFA total row -->
    <rect x="61" y="292" width="578" height="30" fill="#E8EAF0"/>
    <text x="145" y="312" font-size="11" fill="#1A1A2E" font-family="Arial" font-weight="700">GROSS FLOOR AREA (GFA) / KELUASAN LANTAI KASAR</text>
    <text x="595" y="312" text-anchor="middle" font-size="11" fill="#1A1A2E" font-family="Arial" font-weight="700">90.42 m²</text>
    <line x1="60" y1="322" x2="640" y2="322" stroke="#BDBDBD" stroke-width="0.8"/>

    <!-- Notes row -->
    <rect x="61" y="322" width="578" height="22" fill="#F8FAFB"/>
    <text x="145" y="336" font-size="9.5" fill="#777" font-family="Arial">Note: All dimensions are internal clear dimensions. GFA measured to internal face of external walls per UBBL 1984 Reg. 3.</text>
    <line x1="60" y1="344" x2="640" y2="344" stroke="#BDBDBD" stroke-width="0.5"/>

    <!-- Flagged note -->
    <rect x="60" y="352" width="580" height="38" fill="#FFF8F0" stroke="#FFE0B2" stroke-width="1"/>
    <text x="80" y="368" font-size="10" fill="#E65100" font-family="Arial" font-weight="700">⚠  Row 6 (Corridor):</text>
    <text x="195" y="368" font-size="10" fill="#666" font-family="Arial">Area value was unclear in the original drawing — computed from extracted dimensions.</text>
    <text x="80" y="382" font-size="10" fill="#666" font-family="Arial">Submitter should verify this value manually before running compliance analysis.</text>

    </svg>
`,

`
<svg class="drawing-svg" id="svg-page-3" viewBox="0 0 860 320" xmlns="http://www.w3.org/2000/svg">

    <rect width="860" height="320" fill="#F7F7F4"/>
    <rect x="20" y="20" width="820" height="280" fill="none" stroke="#AAAAAA" stroke-width="1"/>

    <!-- Context: corner of a drawing sheet -->
    <rect x="40" y="40" width="340" height="250" fill="#EFEFEC" stroke="#CCCCCC" stroke-width="0.8" stroke-dasharray="6,4"/>
    <text x="210" y="175" text-anchor="middle" font-size="12" fill="#BBBBBB" font-family="Arial">[ Drawing content ]</text>

    <!-- Title block -->
    <rect x="380" y="40" width="440" height="250" fill="#fff" stroke="#2C2C2C" stroke-width="2"/>

    <!-- Firm name header -->
    <rect x="380" y="40" width="440" height="36" fill="#1A1A2E"/>
    <text x="600" y="56" text-anchor="middle" font-size="13" fill="#fff" font-family="Arial" font-weight="700">ARKITEK MAJU SDN BHD</text>
    <text x="600" y="70" text-anchor="middle" font-size="9"  fill="#A0A8CC" font-family="Arial">Registered Architect No. A/1234 · Reg. LAM</text>

    <!-- Fields -->
    <!-- Row 1 -->
    <rect x="380" y="76" width="220" height="44" fill="#F8F8F8" stroke="#E0E0E0" stroke-width="0.5"/>
    <text x="392" y="91"  font-size="8.5" fill="#888" font-family="Arial">Project / Projek</text>
    <text x="392" y="104" font-size="10"  fill="#1A1A2E" font-family="Arial" font-weight="700">Proposed Residential Building</text>
    <text x="392" y="116" font-size="10"  fill="#1A1A2E" font-family="Arial">Lot 47, Mukim Ampangan, N. Sembilan</text>

    <rect x="600" y="76" width="220" height="44" fill="#F8F8F8" stroke="#E0E0E0" stroke-width="0.5"/>
    <text x="612" y="91"  font-size="8.5" fill="#888" font-family="Arial">Client / Klien</text>
    <text x="612" y="106" font-size="10"  fill="#1A1A2E" font-family="Arial" font-weight="700">Ahmad bin Razif</text>
    <text x="612" y="118" font-size="10"  fill="#1A1A2E" font-family="Arial">No. K/P: 820314-06-5678</text>

    <!-- Row 2 -->
    <rect x="380" y="120" width="110" height="36" fill="#fff" stroke="#E0E0E0" stroke-width="0.5"/>
    <text x="392" y="134" font-size="8.5" fill="#888" font-family="Arial">Drawing No.</text>
    <text x="392" y="148" font-size="10.5" fill="#1A1A2E" font-family="Arial" font-weight="700">A-001</text>

    <rect x="490" y="120" width="110" height="36" fill="#fff" stroke="#E0E0E0" stroke-width="0.5"/>
    <text x="502" y="134" font-size="8.5" fill="#888" font-family="Arial">Revision / Semakan</text>
    <text x="502" y="148" font-size="10.5" fill="#1A1A2E" font-family="Arial" font-weight="700">Rev C</text>

    <rect x="600" y="120" width="110" height="36" fill="#fff" stroke="#E0E0E0" stroke-width="0.5"/>
    <text x="612" y="134" font-size="8.5" fill="#888" font-family="Arial">Scale / Skala</text>
    <text x="612" y="148" font-size="10.5" fill="#1A1A2E" font-family="Arial" font-weight="700">1 : 100</text>

    <rect x="710" y="120" width="110" height="36" fill="#fff" stroke="#E0E0E0" stroke-width="0.5"/>
    <text x="722" y="134" font-size="8.5" fill="#888" font-family="Arial">Date / Tarikh</text>
    <text x="722" y="148" font-size="10.5" fill="#1A1A2E" font-family="Arial" font-weight="700">Mac 2025</text>

    <!-- Row 3 -->
    <rect x="380" y="156" width="220" height="36" fill="#fff" stroke="#E0E0E0" stroke-width="0.5"/>
    <text x="392" y="170" font-size="8.5" fill="#888" font-family="Arial">Drawing Title / Tajuk Lukisan</text>
    <text x="392" y="184" font-size="10.5" fill="#1A1A2E" font-family="Arial" font-weight="700">GROUND FLOOR PLAN / PELAN LANTAI BAWAH</text>

    <rect x="600" y="156" width="220" height="36" fill="#fff" stroke="#E0E0E0" stroke-width="0.5"/>
    <text x="612" y="170" font-size="8.5" fill="#888" font-family="Arial">Sheet / Helaian</text>
    <text x="612" y="184" font-size="10.5" fill="#1A1A2E" font-family="Arial" font-weight="700">1 of 6</text>

    <!-- Row 4: Stamp area -->
    <rect x="380" y="192" width="220" height="98" fill="#FAFAFA" stroke="#E0E0E0" stroke-width="0.5"/>
    <text x="490" y="210" text-anchor="middle" font-size="8.5" fill="#888" font-family="Arial">Architect's Stamp / Cop Arkitek</text>
    <circle cx="490" cy="252" r="28" fill="none" stroke="#555" stroke-width="1.2"/>
    <circle cx="490" cy="252" r="24" fill="none" stroke="#555" stroke-width="0.5"/>
    <text x="490" y="247" text-anchor="middle" font-size="8"   fill="#555" font-family="Arial">ARKITEK</text>
    <text x="490" y="258" text-anchor="middle" font-size="7.5" fill="#555" font-family="Arial">AHMAD ZULKIFLI</text>
    <text x="490" y="269" text-anchor="middle" font-size="7.5" fill="#555" font-family="Arial">A/1234</text>

    <rect x="600" y="192" width="220" height="98" fill="#FAFAFA" stroke="#E0E0E0" stroke-width="0.5"/>
    <text x="710" y="210" text-anchor="middle" font-size="8.5" fill="#888" font-family="Arial">Checked By / Disemak Oleh</text>
    <text x="710" y="252" text-anchor="middle" font-size="9.5" fill="#333" font-family="Arial">Zulaikha binti Azman</text>
    <text x="710" y="266" text-anchor="middle" font-size="9"   fill="#888" font-family="Arial">Principal Architect</text>
    <line x1="640" y1="278" x2="780" y2="278" stroke="#333" stroke-width="0.8"/>
    <text x="710" y="285" text-anchor="middle" font-size="8.5" fill="#888" font-family="Arial">Signature / Tandatangan</text>

    </svg>
`
];

let activeItemId = null;
let editingItemId = null;
let currentPage = 1;

// DOM Elements
const drawingContainer = document.getElementById('drawing-container');
const annotationsLayer = document.getElementById('annotations-layer');
const resultsList = document.getElementById('results-list');
const pageIndicator = document.getElementById('page-indicator');

// Initialize
function init() {
    currentPage = 1;
    currentScale = 1;
    translateX = 0;
    translateY = 0;
    activeItemId = null;
    editingItemId = null;
    renderPage();
    renderResultCards();
}

function renderPage() {
    // Inject the corresponding SVG for the current page
    // Remove the old SVG if it exists, without deleting the annotationsLayer
    const oldSvg = drawingContainer.querySelector('svg');
    if (oldSvg) {
        oldSvg.remove();
    }
    
    // Insert new SVG
    drawingContainer.insertAdjacentHTML('afterbegin', pages[currentPage - 1]);
    
    // Update indicator
    pageIndicator.innerText = `Page ${currentPage} of 3`;
    
    // Render pins for this page
    renderPins();
    
    // Apply current transform to new SVG
    updateTransform();
}

window.prevPage = function() {
    if (currentPage > 1) {
        currentPage--;
        renderPage();
    }
}

window.nextPage = function() {
    if (currentPage < 3) {
        currentPage++;
        renderPage();
    }
}

// Render Pins on the drawing
function renderPins() {
    annotationsLayer.innerHTML = '';
    
    const pinsForPage = complianceData.filter(item => {
        if (item.page !== currentPage) return false;
        if (currentFilter !== 'all' && item.status !== currentFilter) return false;
        return true;
    });
    
    pinsForPage.forEach(item => {
        const pin = document.createElement('div');
        pin.className = `pin ${item.status} ${activeItemId === item.id ? 'active' : ''}`;
        pin.style.left = `${item.x}%`;
        pin.style.top = `${item.y}%`;
        pin.innerHTML = getStatusIcon(item.status);
        pin.dataset.id = item.id;
        pin.dataset.tooltip = item.title;
        
        pin.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Auto-open panel if it's closed
            const appContainer = document.querySelector('.app-container');
            if (appContainer && appContainer.classList.contains('panel-closed')) {
                appContainer.classList.remove('panel-closed');
                const btnToggleResults = document.getElementById('btn-toggle-results');
                if (btnToggleResults) {
                    const iconSpan = btnToggleResults.querySelector('span.material-symbols-outlined');
                    if (iconSpan) iconSpan.innerText = 'dock_to_right';
                }
            }
            
            selectItem(item.id);
            setTimeout(() => {
                scrollToCard(item.id);
            }, 10);
        });

        pin.addEventListener('mouseenter', () => {
            const card = document.getElementById(`card-${item.id}`);
            if (card && activeItemId !== item.id) {
                card.style.borderColor = 'var(--primary-color)';
                card.style.boxShadow = '0 0 0 1px var(--primary-color)';
            }
        });
        
        pin.addEventListener('mouseleave', () => {
            const card = document.getElementById(`card-${item.id}`);
            if (card && activeItemId !== item.id) {
                card.style.borderColor = '';
                card.style.boxShadow = '';
            }
        });
        
        annotationsLayer.appendChild(pin);
    });
}

// Render Result Cards in the sidebar
function renderResultCards() {
    resultsList.innerHTML = '';
    
    const filteredData = complianceData.filter(item => {
        if (currentFilter !== 'all' && item.status !== currentFilter) return false;
        return true;
    });

    filteredData.forEach(item => {
        const isActive = activeItemId === item.id;
        const card = document.createElement('div');
        card.className = `result-card status-${item.status} ${isActive ? 'active' : ''}`;
        card.id = `card-${item.id}`;
        card.dataset.id = item.id;
        
        const hasComment = item.comment && item.comment.trim().length > 0;
        const needsInput = item.status === 'fail' || item.status === 'flagged';
        const isEditing = editingItemId === item.id;
        
        let headerIcon = '';
        if (item.status === 'fail') headerIcon = '<span class="material-symbols-outlined icon-filled icon-fail">cancel</span>';
        else if (item.status === 'flagged') headerIcon = '<span class="material-symbols-outlined icon-filled icon-flagged">warning</span>';
        else if (item.status === 'pass') headerIcon = '<span class="material-symbols-outlined icon-filled icon-pass">check_circle</span>';

        let commentSectionHTML = '';
        if (needsInput) {
            if (isEditing) {
                // State 3: Editing
                commentSectionHTML = `
                    <div class="comment-section editing">
                        <label class="comment-label">Add comment (optional)</label>
                        <textarea class="comment-textarea" id="textarea-${item.id}">${item.comment || ''}</textarea>
                        <div class="comment-actions">
                            <button class="btn btn-outline" onclick="cancelComment('${item.id}', event)">Cancel</button>
                            <button class="btn btn-primary" onclick="saveComment('${item.id}', event)">Add</button>
                        </div>
                    </div>
                `;
            } else if (hasComment) {
                // State 4: Saved comment
                commentSectionHTML = `
                    <div class="comment-section saved">
                        <div class="saved-comment-meta">
                            <div class="meta-left">
                                <span class="comment-added-text">Comment added</span>
                                <span class="badge-review">In-review</span>
                            </div>
                            <button class="edit-btn" onclick="editComment('${item.id}', event)"><span class="material-symbols-outlined icon-sm">edit</span> Edit</button>
                        </div>
                        <div class="saved-comment-box">${item.comment}</div>
                    </div>
                `;
            } else {
                // State 2: Prompt to add comment
                commentSectionHTML = `
                    <div class="comment-section add-prompt">
                        <button class="edit-btn btn-add-comment" onclick="editComment('${item.id}', event)"><span class="material-symbols-outlined icon-sm">edit</span> Add Comment</button>
                    </div>
                `;
            }
        }
        
        let detailsSectionHTML = `
            <div class="card-details-section">
                <div class="card-desc">${item.description}</div>
                <div class="card-metrics">
                    <div class="metric-box">
                        <span class="metric-label">EXTRACTED VALUE</span>
                        <span class="metric-value">${item.extractedValue}</span>
                    </div>
                    <div class="metric-box">
                        <span class="metric-label">REQUIRED</span>
                        <span class="metric-value">${item.requiredValue}</span>
                    </div>
                </div>
                <div class="regulation-ref">
                    <span class="material-symbols-outlined icon-sm">menu_book</span> ${item.regulationRef}
                </div>
                ${commentSectionHTML}
            </div>
        `;

        card.innerHTML = `
            <div class="card-header">
                <div class="header-left">
                    ${headerIcon}
                    <div class="check-title">${item.title}</div>
                </div>
                <span class="material-symbols-outlined chevron-icon">expand_more</span>
            </div>
            ${detailsSectionHTML}
        `;
        
        card.addEventListener('click', () => {
            selectItem(item.id);
        });
        
        resultsList.appendChild(card);
    });
}

// Handle Selection
function selectItem(id) {
    if (activeItemId === id) {
        // Toggle off
        activeItemId = null;
        editingItemId = null;
        renderPins();
        renderResultCards();
        return;
    }
    
    activeItemId = id;
    editingItemId = null; // Reset editing state on switch
    
    // Check if the item is on a different page, if so, switch page
    const item = complianceData.find(d => d.id === id);
    if (item && item.page !== currentPage) {
        currentPage = item.page;
        renderPage(); // This handles rendering pins too
    } else {
        renderPins();
    }
    
    renderResultCards(); // Full re-render to apply state changes properly
}

// Scroll sidebar to card
function scrollToCard(id) {
    const card = document.getElementById(`card-${id}`);
    if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Save Comment
window.saveComment = function(id, event) {
    event.stopPropagation();
    const textarea = document.getElementById(`textarea-${id}`);
    const text = textarea.value;
    
    const item = complianceData.find(d => d.id === id);
    if (item) {
        item.comment = text;
        editingItemId = null;
        renderResultCards(); // re-render to show saved state
    }
};

// Edit Comment
window.editComment = function(id, event) {
    event.stopPropagation();
    editingItemId = id;
    
    // Need to make sure card is active so we can see the edit UI
    if (activeItemId !== id) {
        activeItemId = id;
        renderPins();
    }
    
    renderResultCards();
    
    // Populate textarea after render
    setTimeout(() => {
        const textarea = document.getElementById(`textarea-${id}`);
        if (textarea) {
            textarea.focus();
            textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
        }
    }, 10);
};

// Cancel Comment
window.cancelComment = function(id, event) {
    event.stopPropagation();
    editingItemId = null;
    renderResultCards();
};

// Helper for Icons
function getStatusIcon(status) {
    switch (status) {
        case 'pass': return '<span class="material-symbols-outlined icon-bold">check</span>';
        case 'fail': return '<span class="material-symbols-outlined icon-bold">close</span>';
        case 'flagged': return '<span class="material-symbols-outlined icon-bold">priority_high</span>';
        default: return '';
    }
}

// Click anywhere to deselect (optional)
document.addEventListener('click', (e) => {
    if (!e.target.closest('.result-card') && !e.target.closest('.pin') && !e.target.closest('.viewer-controls') && !e.target.closest('.results-panel')) {
        activeItemId = null;
        renderPins();
        document.querySelectorAll('.result-card').forEach(card => card.classList.remove('active'));
    }
});

// --- PAN & ZOOM LOGIC ---
let currentScale = 1;
let translateX = 0;
let translateY = 0;
let isPanning = false;
let startX = 0;
let startY = 0;
let panToolActive = false;

const btnZoomIn = document.getElementById('btn-zoom-in');
const btnZoomOut = document.getElementById('btn-zoom-out');
const zoomIndicator = document.getElementById('zoom-indicator');
const btnPan = document.getElementById('btn-pan');

function updateTransform() {
    const svgContainer = drawingContainer.querySelector('.drawing-svg');
    if (svgContainer) {
        svgContainer.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
        svgContainer.style.transformOrigin = '0 0';
        svgContainer.style.transition = isPanning ? 'none' : 'transform 0.2s';
    }
    
    annotationsLayer.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
    annotationsLayer.style.transformOrigin = '0 0';
    annotationsLayer.style.transition = isPanning ? 'none' : 'transform 0.2s';
    
    zoomIndicator.innerText = `${Math.round(currentScale * 100)}%`;
}

btnZoomIn.addEventListener('click', () => {
    currentScale = Math.min(currentScale + 0.25, 3);
    updateTransform();
});

btnZoomOut.addEventListener('click', () => {
    currentScale = Math.max(currentScale - 0.25, 0.5);
    updateTransform();
});

const btnResetView = document.getElementById('btn-reset-view');
if (btnResetView) {
    btnResetView.addEventListener('click', () => {
        currentScale = 1;
        translateX = 0;
        translateY = 0;
        updateTransform();
    });
}

btnPan.addEventListener('click', () => {
    panToolActive = !panToolActive;
    if (panToolActive) {
        btnPan.classList.add('active');
        drawingContainer.style.cursor = 'grab';
    } else {
        btnPan.classList.remove('active');
        drawingContainer.style.cursor = 'default';
    }
});

drawingContainer.addEventListener('mousedown', (e) => {
    if (!panToolActive) return;
    isPanning = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    drawingContainer.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', (e) => {
    if (!isPanning) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateTransform();
});

window.addEventListener('mouseup', () => {
    if (isPanning) {
        isPanning = false;
        if (panToolActive) drawingContainer.style.cursor = 'grab';
        updateTransform();
    }
});

// --- FILTERING LOGIC ---
let currentFilter = 'all';
const filterSelect = document.getElementById('results-filter');

if (filterSelect) {
    filterSelect.addEventListener('change', (e) => {
        currentFilter = e.target.value;
        renderResultCards();
        renderPins();
    });
}

// --- SUBMISSION LOGIC ---
const btnSubmit = document.getElementById('btn-submit-approval');
const modal = document.getElementById('submit-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const btnConfirmSubmit = document.getElementById('btn-confirm-submit');

if (btnSubmit && modal) {
    btnSubmit.addEventListener('click', () => {
        const incomplete = complianceData.filter(item => 
            (item.status === 'fail' || item.status === 'flagged') && item.comment.trim() === ''
        );
        
        if (incomplete.length > 0) {
            modalTitle.innerText = 'Incomplete Report';
            modalTitle.style.color = '#DC2626';
            modalDesc.innerHTML = `You have <strong>${incomplete.length}</strong> flagged/failed item(s) missing a justification. You must provide a comment for all issues before submitting.`;
            btnConfirmSubmit.style.display = 'none';
        } else {
            modalTitle.innerText = 'Submit Report?';
            modalTitle.style.color = 'var(--text-main)';
            modalDesc.innerHTML = `All issues have been justified. Are you ready to submit this compliance report to the local authority?`;
            btnConfirmSubmit.style.display = 'block';
            btnConfirmSubmit.innerText = 'Submit Report';
        }
        
        modal.classList.add('active');
    });

    window.closeModal = function() {
        modal.classList.remove('active');
    }

    btnConfirmSubmit.addEventListener('click', () => {
        modalTitle.innerText = 'Success!';
        modalTitle.style.color = '#10B981';
        modalDesc.innerHTML = 'Your compliance report has been submitted successfully.';
        btnConfirmSubmit.style.display = 'none';
        setTimeout(closeModal, 2000);
    });
}
// --- TOGGLE PANEL LOGIC ---
const btnToggleResults = document.getElementById('btn-toggle-results');
const appContainerToggle = document.querySelector('.app-container');

if (btnToggleResults && appContainerToggle) {
    btnToggleResults.addEventListener('click', () => {
        appContainerToggle.classList.toggle('panel-closed');
        
        // Change icon based on state
        const iconSpan = btnToggleResults.querySelector('span.material-symbols-outlined');
        if (iconSpan) {
            if (appContainerToggle.classList.contains('panel-closed')) {
                iconSpan.innerText = 'view_sidebar';
            } else {
                iconSpan.innerText = 'dock_to_right';
            }
        }
    });
}

// Run Init
init();
