// Course brochure links mapping
// Update these links with your actual Google Drive PDF links for each course

export const courseBrochureLinks: { [key: string]: string } = {
  // Individual course brochures
  'C': 'https://drive.google.com/file/d/17dLCh0c6D13elYE3p3aqI8FFpOA-DnT0/view?usp=sharing',
  'C++': 'https://drive.google.com/file/d/1PUEcp9u7Zem1PnAgvvMnjcpvnslU94P8/view?usp=sharing',
  'Python': 'https://drive.google.com/file/d/1lRVIwBDoHQFIofJ7jFDj5PX5WTZwS0tw/view?usp=sharing',
  'Java': 'https://drive.google.com/file/d/1PuCLrMu2zF4KFiX8IqaVpR5B-OlTobeK/view?usp=sharing',
  'Power BI': 'https://drive.google.com/file/d/1sDHLDzegR7BcciGBeszsfiyV9_8jkYGV/view?usp=sharing',
  'ETL Library': 'https://drive.google.com/file/d/1KyqLppjSAxiVYo96gCDiS4Ju9O5OMgdO/view?usp=sharing',
  'Adv. Excel': 'https://drive.google.com/file/d/1sdxMvRwZAoc0i23ag1GgBY1NfdU78BT-/view?usp=sharing',
  'HTML, CSS': 'https://drive.google.com/file/d/1j1woPAxfwQEvcWr-ruwes8MsTDAinI2o/view?usp=sharing',
  'JavaScript': 'https://drive.google.com/file/d/1H2GgKoHRPRS8stfWcgxphsSDT3sIUAUA/view?usp=sharing',
  'Cyprus': 'https://drive.google.com/file/d/12JyYtu-7udxIDAbqdLDzKIt-vkYvCVZj/view?usp=sharing',
  'Flutter': 'https://drive.google.com/file/d/1DBmeXvwqMb-On-FbBiuwpdWAZLzc00SB/view?usp=sharing',
  'MySQL': 'https://drive.google.com/file/d/1Mynf5LrZ-92VdQCVahifgCvKGhdHyLPI/view?usp=sharing',
  'C, C++, Python, Java, HTML, CSS, JavaScript': 'https://drive.google.com/file/d/YOUR_COMBO_BROCHURE_ID/view?usp=drive_link',
  'AI ML': 'https://drive.google.com/file/d/1cxRNL1zU52icXUfEg5yaBdOjwXRIqad3/view?usp=sharing',
  'Gen AI': 'https://drive.google.com/file/d/1lHgWAoVLjGyWZRjrMOJ7wvhg-behs7RD/view?usp=sharing',
  'Full Stack/Combo Course': 'https://drive.google.com/file/d/YOUR_FULLSTACK_BROCHURE_ID/view?usp=drive_link',
  'Data Analytics': 'https://drive.google.com/file/d/12V_ZYASR9QKosGq7Z-rPk7SxmQaTk_5l/view?usp=sharing',
  'School Python': 'https://drive.google.com/file/d/1b-peSw8VidByYUmrs4_gTGv77pbIz4w_/view?usp=sharing',
  'School Java': 'https://drive.google.com/file/d/1Py1pH_KCFuhsXeIzwP1EybhVGJ86VwDF/view?usp=sharing',
  'School AI & Web': 'https://drive.google.com/file/d/1EADgd5C5lJD5nxmzyAzhZH5XnSjp7DFz/view?usp=sharing',
};

// All courses comprehensive brochure link
export const allCoursesBrochureLink = 'https://drive.google.com/file/d/1gVnHlsy6KOKJDJxKKF0SpUv5eTiDfFbW/view?usp=drive_link';

// Function to get brochure link for a specific course
export function getCourseBrochureLink(courseName: string): string {
  return courseBrochureLinks[courseName] || allCoursesBrochureLink;
} 