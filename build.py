import os
import shutil
import glob
import subprocess

# Delete prior outputted files
def delete_output():
    image_files = glob.glob('docs/assets/img/**/*.png', recursive=True)
    html_files = glob.glob('docs/math/**/*.html', recursive=True)
    pdf_files = glob.glob('pdf/**/*.pdf', recursive=True)
    files_to_delete = image_files + html_files + pdf_files

    for f in files_to_delete:
        os.remove(f)

# Convert LaTeX files to HTML and copy to posts folders
def output_html():
    latex_files = glob.glob('src/**/*.tex', recursive=True)
    for f in latex_files:
        output_dir = 'docs/math/' + '/'.join(f.split('/')[1:-2]) + '/_posts'
        output_filename = f.split('/')[-1].split('.')[0] + '.html'

        subprocess.run(['pandoc', f, '-o', output_dir + '/' + output_filename, '--mathjax'])

# Convert LaTeX files to PDF and copy to PDF folder
def output_pdf():
    latex_files = glob.glob('src/**/*.tex', recursive=True)
    for f in latex_files:
        output_dir = 'pdf/' + '/'.join(f.split('/')[1:-2])
        output_filename = f.split('/')[-1].split('.')[0] + '.pdf'

        subprocess.run(['pandoc', '-s', f, '-o', output_dir + '/' + output_filename])

# Adjust src attribute of img tags to reference assets folder
def fix_img_src():
    html_files = glob.glob('docs/math/**/*.html', recursive=True)
    for filepath in html_files:
        with open(filepath, 'r+') as f:
            content = f.read().replace('img src="', 'img src="/math/assets/img/')
            f.seek(0)
            f.write(content)
            f.truncate()

# Copy over images to assets folder
def copy_images():
    image_files = glob.glob('src/**/*.png', recursive=True)
    for f in image_files:
        shutil.copy2(f, 'docs/assets/img')

if __name__ == '__main__':
    delete_output()
    output_html()
    # output_pdf()
    fix_img_src()
    copy_images()