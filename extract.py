import re

def main():
    html_file = r'D:\index.html\What_is_a_Building_Plan.html'
    app_js_file = r'D:\Gamuda Tech AI\prototype\app.js'

    with open(html_file, 'r', encoding='utf-8') as f:
        html_content = f.read()

    # Find all SVGs
    svgs = re.findall(r'(<svg class="plan-wrap" viewBox=".*?</svg>)', html_content, re.DOTALL)
    
    if len(svgs) < 3:
        print(f"Only found {len(svgs)} SVGs!")
        return

    # Process SVGs
    processed_svgs = []
    for i, svg in enumerate(svgs[:3]):
        # Replace class and add ID
        new_svg = svg.replace('class="plan-wrap"', f'class="drawing-svg" id="svg-page-{i+1}"')
        processed_svgs.append(f"`\n{new_svg}\n`")

    pages_array_content = ',\n\n'.join(processed_svgs)

    with open(app_js_file, 'r', encoding='utf-8') as f:
        app_js_content = f.read()

    # Replace pages array in app.js
    # Find const pages = [ ... ];
    pattern = re.compile(r'const pages = \[.*?\];', re.DOTALL)
    new_app_js = pattern.sub(f'const pages = [\n{pages_array_content}\n];', app_js_content)

    with open(app_js_file, 'w', encoding='utf-8') as f:
        f.write(new_app_js)

    print("Successfully updated app.js with exact SVGs from HTML file.")

if __name__ == '__main__':
    main()
