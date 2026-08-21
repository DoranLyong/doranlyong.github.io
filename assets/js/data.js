/* ==========================================================================
   data.js — 사이트의 모든 콘텐츠는 이 파일에서만 수정합니다.
   (HTML/CSS/main.js 는 건드릴 필요 없음)

   - SITE   : 이름, 소속, 링크, CV 경로 등 기본 정보
   - BIO    : 초청 강연/위원회 제출용 3인칭 소개문 ("Copy bio" 버튼용)
   - NEWS   : 최신순 뉴스. date 는 ISO(YYYY-MM-DD)
   - THEMES : 논문 필터 칩 (All 탭에서 표시, key: 표시명)
   - PUBS   : 논문 목록. Selected|All 탭 — selected:true 인 항목이 Selected 탭에 노출,
              All 탭은 연도별 나열. category 는 표시 밀도에만 사용
              ('domestic' | 'patent' 는 썸네일 없는 컴팩트 행으로 렌더링)

   서지 정보는 DBLP / arXiv / Crossref 에서 검증됨 (2026-07-21).
   date 는 정렬용 근사치입니다.
   ========================================================================== */

const SITE = {
  name: "Guhnoo Yun",
  position: "Ph.D. Candidate",
  affiliation: "Korea University · KIST",
  affiliationLink: "https://www.korea.ac.kr",
  // 이메일은 크롤러 수집 방지를 위해 user/domain 분리 (main.js 에서 조립)
  emailUser: "cheeryun",
  emailDomain: "gmail.com",
  scholar: "https://scholar.google.com/citations?user=L47h01YAAAAJ",
  github: "https://github.com/DoranLyong",
  linkedin: "https://www.linkedin.com/in/guhnoo-yun-71b40b178",
  twitter: "https://twitter.com/doranlyong219",
  blog: "https://ai-studynote.blogspot.com/",
  // CV PDF 를 assets/pdf/ 에 넣은 뒤 경로를 지정하면 버튼이 자동으로 나타납니다.
  cvLink: null, // 예: "assets/pdf/Guhnoo_Yun_CV.pdf"
  rsLink: null, // Research statement PDF (있으면 버튼 자동 표시)
  portrait: "assets/img/profile.webp",
  canonical: "https://doranlyong.github.io/",
  updated: "2026-08-21",
};

/* 3인칭 소개문 — "Copy bio" 버튼이 이 문자열을 복사합니다. */
const BIO =
  "Guhnoo Yun received his B.S. degree in Control and Measurement Engineering from " +
  "Gyeongsang National University (GNU), Jinju, Korea, in 2016, and his M.S. degree in " +
  "Mechatronics from Gwangju Institute of Science and Technology (GIST), Gwangju, Korea, " +
  "in 2018. He is currently pursuing a Ph.D. degree in Computer Science and Engineering " +
  "at Korea University, Seoul, Korea. From 2018 to 2019, he was an intern researcher at " +
  "the Center for Intelligent Robotics, Korea Institute of Science and Technology (KIST), " +
  "and he has been a student researcher at the Intelligence and Interaction Research " +
  "Center, KIST, since 2019. His current research interests are in computer vision, " +
  "pattern recognition, machine learning, deep learning architecture, and their " +
  "applications including object detection, instance segmentation, and 3D vision.";

/* 홈 About 문단 (HTML 허용) — 신상·소속만. 연구 내용은 Research Interests 로. */
const ABOUT_HTML = `
<p>I am a Ph.D. candidate in Computer Science and Engineering at
<a href="https://www.korea.ac.kr" target="_blank" rel="noopener">Korea University</a>,
and a student researcher at the
<a href="https://www.kist.re.kr" target="_blank" rel="noopener">Korea Institute of Science and Technology (KIST)</a>,
where I work with Dr. Dong Hwan Kim.</p>
<p>Before joining Korea University, I received my M.S. in Mechatronics from the
Gwangju Institute of Science and Technology (GIST) and my B.S. in Control and
Measurement Engineering from Gyeongsang National University.</p>
<p>I will complete my Ph.D. in early 2027 and am
<strong><em style="color:var(--heading)">actively looking for a postdoctoral position starting
in Spring 2027</em></strong> — ideally one where I can dig into fundamental challenges, even in an
entirely new domain. Feel free to reach out.</p>
`;

/* Research Interests 서두 문단 — 불릿 목록 위에 렌더링 (HTML 허용, 없으면 생략) */
const INTERESTS_INTRO_HTML = `
<p>My research goal is to understand <strong>what deep neural networks actually see in the
spectral domain</strong>, and to turn that understanding into <strong>principled architecture
design</strong>. Currently, my research interests include:</p>
`;

/* Research Interests 마무리 문단 — 불릿 목록 아래 렌더링 (HTML 허용, 없으면 생략) */
const INTERESTS_OUTRO_HTML = `
<p>I am deeply interested in understanding the <strong>theoretical foundations of
machine learning</strong> and its applications in vision, healthcare, and robotics.</p>
`;

/* Research Interests — 항목별 한 줄 (영역명: 키워드 나열) */
const INTERESTS = [
  "<strong>Spectral Understanding of Deep Networks</strong>: frequency responses of convolution &amp; self-attention, graph spectral analysis, inductive biases.",
  "<strong>Architecture Design</strong>: token mixers, backbone networks, general-purpose vision architectures.",
  "<strong>Video Understanding &amp; 3D Vision</strong>: temporal modeling, shape from focus.",
  "<strong>Vision for Robotics &amp; Healthcare</strong>: human-robot interaction, gesture interfaces, health monitoring.",
];

/* 뉴스 — 최신순. html 안에서 #id 로 딥링크 가능
   ⚠ 날짜는 근사치입니다. 정확한 날짜로 수정해 주세요. */
const NEWS = [
  {
    date: "2026-07-29",
    html: 'Two papers on context-aware daily-life monitoring with egocentric vision and EEG have been accepted to <strong>EMBC 2026</strong>. <a href="#arousal2026">[paper 1]</a> <a href="#pebci2026">[paper 2]</a>',
  },
  {
    date: "2026-05-01",
    html: 'SPANetV2 (<em>Spectral-Adaptive Modulation Networks for Visual Perception</em>) has been accepted to <strong>IEEE TPAMI</strong>! <a href="#spanetv22026">[paper]</a> <a href="https://github.com/DoranLyong/SPANetV2-official" target="_blank" rel="noopener">[code]</a>',
  },
  {
    date: "2024-11-07",
    html: 'Our paper on single-handed gesture recognition for drone control is published in <em>Applied Sciences</em>. <a href="#gesture2024">[paper]</a>',
  },
  {
    date: "2023-07-14",
    html: '<strong>SPANet</strong> has been accepted to <strong>ICCV 2023</strong>! <a href="#spanet2023">[paper]</a> <a href="https://doranlyong.github.io/projects/spanet/" target="_blank" rel="noopener">[project]</a>',
  },
  {
    date: "2023-06-30",
    html: 'Our robot-assisted isolation-ward system paper has been accepted to <strong>IROS 2023</strong>. <a href="#iros2023">[paper]</a>',
  },
];

/* 필터 칩 (Publications 의 All 탭) — key 는 PUBS[].theme 과 일치해야 합니다. */
const THEMES = {
  spectral: "Spectral Learning & Token Mixers",
  robotics: "Robotics & Healthcare",
  sff: "Shape from Focus",
};

/* ==========================================================================
   PUBS — 논문 데이터 (DBLP/arXiv/Crossref 검증, 2026-07-21)
   links: [{label, url}]  순서대로 버튼 생성, 첫 링크가 제목 링크가 됩니다.
   thumb: 190×112 이상 이미지 (없으면 자동 생략). SVG/WebP 권장.
   ========================================================================== */
const PUBS = [
  {
    id: "spanetv22026",
    category: "journal",
    theme: "spectral",
    selected: true,
    date: "2026-05-01",
    title: "Spectral-Adaptive Modulation Networks for Visual Perception",
    authors:
      "Guhnoo Yun, Juhan Yoo, Kijung Kim, Jeongho Lee, Paul Hongsuck Seo, Dong Hwan Kim",
    venue:
      "IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI), Early Access",
    badgeShort: "TPAMI",
    thumb: "assets/img/pub-tpami2026.webp",
    abstract:
      "Recent studies have shown that 2D convolution and self-attention exhibit distinct spectral behaviors, and optimizing their spectral properties can enhance vision model performance. However, theoretical analyses remain limited in explaining why 2D convolution is more effective in high-pass filtering than self-attention and why larger kernels favor shape bias, akin to self-attention. In this paper, we employ graph spectral analysis to theoretically simulate and compare the frequency responses of 2D convolution and self-attention within a unified framework. Our results corroborate previous empirical findings and reveal that node connectivity, modulated by window size, is a key factor in shaping spectral functions. Leveraging this insight, we introduce a spectral-adaptive modulation (SPAM) mixer, which processes visual features in a spectral-adaptive manner using multi-scale convolutional kernels and a spectral re-scaling mechanism to refine spectral components. Based on SPAM, we develop SPANetV2 as a novel vision backbone. Extensive experiments demonstrate that SPANetV2 outperforms state-of-the-art models across multiple vision tasks, including ImageNet-1K classification, COCO object detection, and ADE20K semantic segmentation.",
    links: [
      { label: "Paper", url: "https://doi.org/10.1109/TPAMI.2026.3690455" },
      { label: "arXiv", url: "https://arxiv.org/abs/2503.23947" },
      { label: "Code", url: "https://github.com/DoranLyong/SPANetV2-official" },
    ],
    bibtex:
      "@article{yun2026spanetv2,\n  title   = {Spectral-Adaptive Modulation Networks for Visual Perception},\n  author  = {Yun, Guhnoo and Yoo, Juhan and Kim, Kijung and Lee, Jeongho and Seo, Paul Hongsuck and Kim, Dong Hwan},\n  journal = {IEEE Transactions on Pattern Analysis and Machine Intelligence},\n  year    = {2026},\n  doi     = {10.1109/TPAMI.2026.3690455},\n  note    = {Early Access}\n}",
  },
  {
    id: "arousal2026",
    category: "international",
    theme: "robotics",
    selected: false,
    date: "2026-07-29",
    title:
      "Context-Aware Daily-Life Arousal Monitoring Using Egocentric Vision and EEG",
    authors:
      "Wooseok Hyung, Minsu Kim, Ye-Sung Kim, Joshua Lee, Byungha Ko, Guhnoo Yun, Dong Hwan Kim, Chang-Hwan Im",
    venue:
      "Annual International Conference of the IEEE Engineering in Medicine and Biology Society (EMBC)",
    badgeShort: "EMBC",
    thumb: null,
    links: [
      {
        label: "Program",
        url: "https://cmsworkshops.com/EMBC2026/view_paper.php?PaperNum=5021&SessionID=1198",
      },
    ],
  },
  {
    id: "pebci2026",
    category: "international",
    theme: "robotics",
    selected: false,
    date: "2026-07-29",
    title:
      "PeBCI: Vision-Guided Brain-Computer Interface for Context-Aware Neural Decoding in Daily Life",
    authors:
      "Ye-Sung Kim, Minsu Kim, Wooseok Hyung, Byungha Ko, Guhnoo Yun, Dong Hwan Kim, Chang-Hwan Im",
    venue:
      "Annual International Conference of the IEEE Engineering in Medicine and Biology Society (EMBC)",
    badgeShort: "EMBC",
    thumb: null,
    links: [
      {
        label: "Program",
        url: "https://cmsworkshops.com/EMBC2026/view_paper.php?PaperNum=4958&SessionID=1198",
      },
    ],
  },
  {
    id: "ioi2026",
    category: "preprint",
    theme: "robotics",
    selected: false,
    date: "2026-05-11",
    title:
      "Initiation of Interaction Detection Framework using a Nonverbal Cue for Human-Robot Interaction",
    authors: "Guhnoo Yun, Juhan Yoo, Kijung Kim, Dong Hwan Kim",
    venue: "arXiv preprint",
    badgeShort: "arXiv",
    thumb: null,
    abstract:
      "This paper describes an initiation of interaction(IoI) detection framework without keywords for human-robot interaction(HRI) based on audio and vision sensor fusion in a domestic environment. In the proposed framework, the robot has its own audio and vision sensors, and can employ external vision sensor for stable human detection and tracking. When the user starts to speak while looking at the robot, the robot can localize his or her position by its sound source localization together with human tracking information. Then the robot can detect the IoI if it perceives the face of the speaker faces the robot. In case that the user does not speak directly, the robot can also detect the IoI if he or she looks at the robot for more than predefined periods of time. A state transition model for the proposed IoI detection framework is designed and verified by experiments with a mobile robot. In order to implement and associate our model in a robot architecture, all the components are implemented and integrated in the Robot Operating System(ROS) environment.",
    links: [{ label: "arXiv", url: "https://arxiv.org/abs/2605.10087" }],
    bibtex:
      "@article{yun2026initiation,\n  title   = {Initiation of Interaction Detection Framework using a Nonverbal Cue for Human-Robot Interaction},\n  author  = {Yun, Guhnoo and Yoo, Juhan and Kim, Kijung and Kim, Dong Hwan},\n  journal = {arXiv preprint arXiv:2605.10087},\n  year    = {2026},\n  doi     = {10.48550/arXiv.2605.10087}\n}",
  },
  {
    id: "gesture2024",
    category: "journal",
    theme: "robotics",
    selected: false,
    date: "2024-11-07",
    title: "Single-Handed Gesture Recognition with RGB Camera for Drone Motion Control",
    authors: "Guhnoo Yun, Hwykuen Kwak, Dong Hwan Kim",
    venue: "Applied Sciences, 14(22), 10230",
    badgeShort: "Appl. Sci.",
    thumb: "assets/img/pub-appli2024.webp",
    abstract:
      "Recent progress in hand gesture recognition has introduced several natural and intuitive approaches to drone control. However, effectively maneuvering drones in complex environments remains challenging. Drone movements are governed by four independent factors: roll, yaw, pitch, and throttle. Each factor includes three distinct behaviors—increase, decrease, and neutral—necessitating hand gesture vocabularies capable of expressing at least 81 combinations for comprehensive drone control in diverse scenarios. In this paper, we introduce a new set of hand gestures for precise drone control, leveraging an RGB camera sensor. These gestures are categorized into motion-based and posture-based types for efficient management. Then, we develop a lightweight hand gesture recognition algorithm capable of real-time operation on even edge devices, ensuring accurate and timely recognition. Subsequently, we integrate hand gesture recognition into a drone simulator to execute 81 commands for drone flight. Overall, the proposed hand gestures and recognition system offer natural control for complex drone maneuvers.",
    links: [
      { label: "Paper", url: "https://www.mdpi.com/2076-3417/14/22/10230" },
    ],
    bibtex:
      "@article{yun2024gesture,\n  title   = {Single-Handed Gesture Recognition with RGB Camera for Drone Motion Control},\n  author  = {Yun, Guhnoo and Kwak, Hwykuen and Kim, Dong Hwan},\n  journal = {Applied Sciences},\n  volume  = {14},\n  number  = {22},\n  pages   = {10230},\n  year    = {2024},\n  doi     = {10.3390/app142210230}\n}",
  },
  {
    id: "spanet2023",
    category: "international",
    theme: "spectral",
    selected: true,
    date: "2023-10-01",
    title:
      "SPANet: Frequency-balancing Token Mixer using Spectral Pooling Aggregation Modulation",
    authors: "Guhnoo Yun, Juhan Yoo, Kijung Kim, Jeongho Lee, Dong Hwan Kim",
    venue:
      "IEEE/CVF International Conference on Computer Vision (ICCV), pp. 6090–6101",
    badgeShort: "ICCV",
    thumb: "assets/img/pub-iccv2023.webp",
    abstract:
      "Recent studies show that self-attentions behave like low-pass filters (as opposed to convolutions) and enhancing their high-pass filtering capability improves model performance. Contrary to this idea, we investigate existing convolution-based models with spectral analysis and observe that improving the low-pass filtering in convolution operations also leads to performance improvement. To account for this observation, we hypothesize that utilizing optimal token mixers that capture balanced representations of both high- and low-frequency components can enhance the performance of models. We verify this by decomposing visual features into the frequency domain and combining them in a balanced manner. To handle this, we replace the balancing problem with a mask filtering problem in the frequency domain. Then, we introduce a novel token-mixer named SPAM and leverage it to derive a MetaFormer model termed as SPANet. Experimental results show that the proposed method provides a way to achieve this balance, and the balanced representations of both high- and low-frequency components can improve the performance of models on multiple computer vision tasks.",
    links: [
      {
        label: "CVF",
        url: "https://openaccess.thecvf.com/content/ICCV2023/html/Yun_SPANet_Frequency-balancing_Token_Mixer_using_Spectral_Pooling_Aggregation_Modulation_ICCV_2023_paper.html",
      },
      { label: "arXiv", url: "https://arxiv.org/abs/2308.11568" },
      { label: "Project Page", url: "https://doranlyong.github.io/projects/spanet/" },
      { label: "Code", url: "https://github.com/DoranLyong/SPANet-official" },
    ],
    bibtex:
      "@inproceedings{yun2023spanet,\n  title     = {SPANet: Frequency-balancing Token Mixer using Spectral Pooling Aggregation Modulation},\n  author    = {Yun, Guhnoo and Yoo, Juhan and Kim, Kijung and Lee, Jeongho and Kim, Dong Hwan},\n  booktitle = {Proceedings of the IEEE/CVF International Conference on Computer Vision (ICCV)},\n  pages     = {6090--6101},\n  year      = {2023},\n  doi       = {10.1109/ICCV51070.2023.00562}\n}",
  },
  {
    id: "iros2023",
    category: "international",
    theme: "robotics",
    selected: true,
    date: "2023-10-01",
    title:
      "Heterogeneous Robot-Assisted Services in Isolation Wards: A System Development and Usability Study",
    authors:
      "Youngsun Kwon, Soyeon Shin, Kyonmo Yang, Seongah Park, Soomin Shin, Hwawoo Jeon, Kijung Kim, Guhnoo Yun, Sangyong Park, Jeewon Byun, Sang Hoon Kang, Kyoung-Ho Song, Doik Kim, Dong Hwan Kim, Kapho Seo, Sonya S. Kwak, Yoonseob Lim",
    venue:
      "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), pp. 8069–8076",
    badgeShort: "IROS",
    thumb: "assets/img/pub-iros2023.webp",
    abstract:
      "Isolation wards operate in quarantine rooms to prevent cross-contamination caused by infectious diseases. Behind the benefits, medical personnel can have the infection risk from patients and the heavy workload due to the isolation. This work proposes a robot-assisted system to alleviate these problems in isolation wards. We conducted a survey about the medical staff's difficulties and envisioning robots. Using the investigation result, we devised three valuable services using two kinds of heterogeneous robots: telemedicine, emergency alert, and delivery services by care robots and delivery robots. Our system also provides user-interactive components such as a dashboard for medical staff and a patient app for inpatients. To manage the services efficiently, we suggest the robotic system based on a central control server and a hierarchical management architecture. Through a user study, we reviewed the usability of the developed system and its future directions.",
    links: [
      { label: "Paper", url: "https://doi.org/10.1109/IROS55552.2023.10341857" },
      {
        label: "Project Page",
        url: "https://sites.google.com/view/hbum/projects/development-of-robot-and-ai-technology-for-smart-hospital/robot-boho-for-connecting-isolated-patient",
      },
      { label: "Video", url: "https://youtu.be/8c2EBUW0WF8" },
    ],
    bibtex:
      "@inproceedings{kwon2023heterogeneous,\n  title     = {Heterogeneous Robot-Assisted Services in Isolation Wards: A System Development and Usability Study},\n  author    = {Kwon, Youngsun and Shin, Soyeon and Yang, Kyonmo and Park, Seongah and Shin, Soomin and Jeon, Hwawoo and Kim, Kijung and Yun, Guhnoo and Park, Sangyong and Byun, Jeewon and Kang, Sang Hoon and Song, Kyoung-Ho and Kim, Doik and Kim, Dong Hwan and Seo, Kapho and Kwak, Sonya S. and Lim, Yoonseob},\n  booktitle = {2023 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)},\n  pages     = {8069--8076},\n  year      = {2023},\n  doi       = {10.1109/IROS55552.2023.10341857}\n}",
  },
  {
    id: "icpr2022",
    category: "international",
    theme: "robotics",
    selected: true,
    date: "2022-08-21",
    title:
      "Efficient Fall Detection for a Healthcare Robot System Based on 3-Axis Accelerometer and Depth Sensor Fusion with LSTM Networks",
    authors: "Kijung Kim, Guhnoo Yun, Sung-Kee Park, Dong Hwan Kim",
    venue:
      "International Conference on Pattern Recognition (ICPR), pp. 2207–2212",
    badgeShort: "ICPR",
    thumb: "assets/img/pub-icpr2022.webp",
    abstract:
      "Fall detection is one of the most important functions for a healthcare robot system because falls are very dangerous for older people and might lead to death if failed to provide prompt and adequate treatment. In this paper, we propose an efficient fall detection method based on 3-axis accelerometer and depth sensor fusion. LSTM networks are applied to handle temporal information. Simple low-level motion and pose features are obtained from each sensor data, and then fed into the LSTM networks that can learn high-level feature representations to classify falls from other daily life activities. Also, various learning tricks are combined to improve the performance. Experimental results show that the proposed fall detection method outperforms existing methods.",
    links: [{ label: "Paper", url: "https://doi.org/10.1109/ICPR56361.2022.9956418" }],
    bibtex:
      "@inproceedings{kim2022fall,\n  title     = {Efficient Fall Detection for a Healthcare Robot System Based on 3-Axis Accelerometer and Depth Sensor Fusion with LSTM Networks},\n  author    = {Kim, Kijung and Yun, Guhnoo and Park, Sung-Kee and Kim, Dong Hwan},\n  booktitle = {2022 26th International Conference on Pattern Recognition (ICPR)},\n  pages     = {2207--2212},\n  year      = {2022},\n  doi       = {10.1109/ICPR56361.2022.9956418}\n}",
  },
  {
    id: "mrt2021",
    category: "journal",
    theme: "sff",
    selected: false,
    date: "2021-10-01",
    title: "A new focus measure operator for enhancing image focus in 3D shape recovery",
    authors: "Hoon-Seok Jang, Guhnoo Yun, Husna Mutahira, Mannan Saeed Muhammad",
    venue: "Microscopy Research and Technique, 84(10), pp. 2483–2493",
    badgeShort: "MRT",
    thumb: null,
    abstract:
      "Measuring the image focus is an important issue in Shape from Focus methods. Conventionally, the Sum of Modified Laplacian, Gray Level Variance (GLV), and Tenengrad techniques have been used frequently among various focus measure operators for estimating the focus levels in a sequence of images. However, they have various issues such as fixed window size and suboptimal focus quality. To solve these problems, a new focus measure operator based on the adaptive sum of weighted modified Laplacian is proposed. First, the adaptive window size selection algorithm based on the GLV is applied. Next, appropriate weights are assigned to the Modified Laplacian values in the image window based on the distance between the center pixel and neighboring pixels. Finally, the Weighted Modified Laplacian values in the image window are summed. Experimental results demonstrate the effectiveness of the proposed method.",
    links: [{ label: "Paper", url: "https://doi.org/10.1002/jemt.23781" }],
    bibtex:
      "@article{jang2021focus,\n  title   = {A new focus measure operator for enhancing image focus in 3{D} shape recovery},\n  author  = {Jang, Hoon-Seok and Yun, Guhnoo and Mutahira, Husna and Muhammad, Mannan Saeed},\n  journal = {Microscopy Research and Technique},\n  volume  = {84},\n  number  = {10},\n  pages   = {2483--2493},\n  year    = {2021},\n  doi     = {10.1002/jemt.23781}\n}",
  },
  {
    id: "icce2020",
    category: "international",
    theme: "sff",
    selected: false,
    date: "2020-01-04",
    title: "Optimal Sampling for Shape from Focus by Using Gaussian Process Regression",
    authors: "Hoon-Seok Jang, Guhnoo Yun, Muhammad Tariq Mahmood, Min-Koo Kang",
    venue: "IEEE International Conference on Consumer Electronics (ICCE), pp. 1–4",
    badgeShort: "ICCE",
    thumb: null,
    abstract:
      "Shape from Focus (SFF) is one of passive optical methods for estimating 3D shape of an object. In SFF, a large number of 2D images with different focus levels are required. The number of images may affect the complexity and the accuracy of the results. In this manuscript, a Gaussian process regression (GPR) method is proposed to get 3D shape from the minimum number of 2D images. The proposed method (SFF.GPR) is applied to fit focus curves, which are obtained by applying one of focus measure operators. Experimental results demonstrate the effectiveness of the proposed method.",
    links: [{ label: "Paper", url: "https://doi.org/10.1109/ICCE46568.2020.9043150" }],
    bibtex:
      "@inproceedings{jang2020sampling,\n  title     = {Optimal Sampling for Shape from Focus by Using Gaussian Process Regression},\n  author    = {Jang, Hoon-Seok and Yun, Guhnoo and Mahmood, Muhammad Tariq and Kang, Min-Koo},\n  booktitle = {2020 IEEE International Conference on Consumer Electronics (ICCE)},\n  pages     = {1--4},\n  year      = {2020},\n  doi       = {10.1109/ICCE46568.2020.9043150}\n}",
  },
  {
    id: "kalman2019",
    category: "journal",
    theme: "sff",
    selected: false,
    date: "2019-08-09",
    title: "Sampling Based on Kalman Filter for Shape from Focus in the Presence of Noise",
    authors: "Hoon-Seok Jang, Mannan Saeed Muhammad, Guhnoo Yun, Dong Hwan Kim",
    venue: "Applied Sciences, 9(16), 3276",
    badgeShort: "Appl. Sci.",
    thumb: null,
    abstract:
      "Recovering three-dimensional (3D) shape of an object from two-dimensional (2D) information is one of the major domains of computer vision applications. Shape from Focus (SFF) is a passive optical technique that reconstructs 3D shape of an object using 2D images with different focus settings. When a 2D image sequence is obtained with constant step size in SFF, mechanical vibrations, referred as jitter noise, occur in each step. Since the jitter noise changes the focus values of 2D images, it causes erroneous recovery of 3D shape. In this paper, a new filtering method for estimating optimal image positions is proposed. Kalman filter as the proposed method is designed and applied for removing jitter noise. The proposed method is experimented by using image sequences of synthetic and real objects, and the performance is evaluated through various metrics to show the effectiveness in terms of reconstruction accuracy and computational complexity.",
    links: [{ label: "Paper", url: "https://www.mdpi.com/2076-3417/9/16/3276" }],
    bibtex:
      "@article{jang2019kalman,\n  title   = {Sampling Based on Kalman Filter for Shape from Focus in the Presence of Noise},\n  author  = {Jang, Hoon-Seok and Muhammad, Mannan Saeed and Yun, Guhnoo and Kim, Dong Hwan},\n  journal = {Applied Sciences},\n  volume  = {9},\n  number  = {16},\n  pages   = {3276},\n  year    = {2019},\n  doi     = {10.3390/app9163276}\n}",
  },
  {
    id: "embc2019",
    category: "international",
    theme: "robotics",
    selected: false,
    date: "2019-07-23",
    title:
      "Fall Detection for the Elderly Based on 3-Axis Accelerometer and Depth Sensor Fusion with Random Forest Classifier",
    authors: "Kijung Kim, Guhnoo Yun, Sung-Kee Park, Dong Hwan Kim",
    venue:
      "Annual International Conference of the IEEE Engineering in Medicine and Biology Society (EMBC), pp. 4611–4614",
    badgeShort: "EMBC",
    thumb: null,
    abstract:
      "In this paper, we propose a new fall detection method that combines 3-axis accelerometer and depth sensors. By combining vision and acceleration-derived features we managed to minimize the false detection rate that is considerably higher when the decision is based on just one type of feature. Also, using machine learning has led to good generalization performance. In addition, we newly created fall database that are more realistic than previous ones. Experiment results show that the proposed method can efficiently detect falls.",
    links: [{ label: "Paper", url: "https://doi.org/10.1109/EMBC.2019.8856698" }],
    bibtex:
      "@inproceedings{kim2019fall,\n  title     = {Fall Detection for the Elderly Based on 3-Axis Accelerometer and Depth Sensor Fusion with Random Forest Classifier},\n  author    = {Kim, Kijung and Yun, Guhnoo and Park, Sung-Kee and Kim, Dong Hwan},\n  booktitle = {2019 41st Annual International Conference of the IEEE Engineering in Medicine and Biology Society (EMBC)},\n  pages     = {4611--4614},\n  year      = {2019},\n  doi       = {10.1109/EMBC.2019.8856698}\n}",
  },
  {
    id: "ur2019",
    category: "international",
    theme: "robotics",
    selected: false,
    date: "2019-06-24",
    title:
      "A Monitoring System to Support Home Health Care for the Elderly with Dementia by Detecting Going Out Activities Based on RGB-D Sensors",
    authors: "Guhnoo Yun, Kijung Kim, Sung-Kee Park, Dong Hwan Kim",
    venue: "International Conference on Ubiquitous Robots (UR), pp. 71–76",
    badgeShort: "UR",
    thumb: null,
    abstract:
      "This paper proposes a monitoring system which can be used with health care robots. As an aging society is arriving, the interest of health care for dementia patients has been increasing. However, the problem of an aging society is that the number of care workers has been decreasing. In order to supplement this shortage, developing health care robots is a hot agenda including home health care service these days. In developing a dementia health care robot, it should be able to manage some difficulties of patients and emergency situations. Especially, the missing problem of people with developing dementia is serious because it can be directly connected to death. Thus, in this paper, we propose a monitoring system to prevent the disappearance of dementia patients in advance and, which can also support health care robots.",
    links: [{ label: "Paper", url: "https://doi.org/10.1109/URAI.2019.8768598" }],
    bibtex:
      "@inproceedings{yun2019monitoring,\n  title     = {A Monitoring System to Support Home Health Care for the Elderly with Dementia by Detecting Going Out Activities Based on RGB-D Sensors},\n  author    = {Yun, Guhnoo and Kim, Kijung and Park, Sung-Kee and Kim, Dong Hwan},\n  booktitle = {2019 16th International Conference on Ubiquitous Robots (UR)},\n  pages     = {71--76},\n  year      = {2019},\n  doi       = {10.1109/URAI.2019.8768598}\n}",
  },
];

/* Experience */
const EXPERIENCE = [
  {
    when: "2019 – present",
    title: "Student Researcher",
    sub: 'Korea Institute of Science and Technology (KIST), Seoul — with Dr. Dong Hwan Kim',
    bullets: [
      "Spectral analysis of vision backbones; token mixer design (SPANet, SPANetV2)",
      "Vision-based human-robot interaction: gesture control, fall detection",
    ],
  },
  {
    when: "2018 – 2019",
    title: "Intern Researcher",
    sub: "KIST Center for Intelligent Robotics, Seoul",
    bullets: ["Perception for healthcare and assistive robotics"],
  },
];

/* Education */
const EDUCATION = [
  {
    when: "exp. Feb 2027",
    title: "Ph.D. in Computer Science and Engineering (expected Feb 2027)",
    sub: "Korea University, Seoul",
  },
  {
    when: "2016 – 2018",
    title: "M.S. in Mechatronics",
    sub: "Gwangju Institute of Science and Technology (GIST), Gwangju",
  },
  {
    when: "– 2016", // ⚠ 입학연도 확인 필요 (졸업 2016 만 확인됨)
    title: "B.S. in Control and Measurement Engineering",
    sub: "Gyeongsang National University, Jinju",
  },
];

/* Honors & Awards — 항목을 추가하면 섹션이 자동으로 나타납니다.
   예: { year: "2023", text: "Best Poster Award, ..." }  */
const AWARDS = [
  {
    year: "2026",
    text: "Outstanding Student Researcher Scholarship, Korea Institute of Science and Technology (KIST)",
  },
  {
    year: "2020",
    text: "<strong>Presidential Award</strong>, 2020 International Robot Contest — Humanoid Robot Sports (Deep Learning Algorithm), Ministry of the Interior and Safety",
  },
];

/* Services & Skills */
const SERVICES = {
  reviewer: [], // 예: "IEEE TPAMI", "CVPR 2026"
  skills: ["Python", "PyTorch", "C++", "MATLAB"],
  openSource: [
    {
      text: 'Official implementations: <a href="https://github.com/DoranLyong/SPANet-official" target="_blank" rel="noopener">SPANet</a>, <a href="https://github.com/DoranLyong/SPANetV2-official" target="_blank" rel="noopener">SPANetV2</a> — more on <a href="https://github.com/DoranLyong" target="_blank" rel="noopener">GitHub</a>',
    },
  ],
};
