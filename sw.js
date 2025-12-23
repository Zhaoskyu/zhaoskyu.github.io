// sw.js - 越南语点读助手 Service Worker
const CACHE_NAME = 'vietnamese-audio-v2'; // 修改此版本号可强制刷新缓存
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',     // 如果你有 CSS 文件
  '/app.js',        // 如果你有 JS 文件（可选）
  // === 所有音频文件（共 127 个）===
  '/audio/xin_chao.mp3',
  '/audio/ban_khoe_khong.mp3',
  '/audio/chao_buoi_sang.mp3',
  '/audio/chao_buoi_chieu.mp3',
  '/audio/chao_buoi_toi.mp3',
  '/audio/tam_biet.mp3',
  '/audio/cam_on.mp3',
  '/audio/cam_on_nhieu.mp3',
  '/audio/khong_co_gi.mp3',
  '/audio/xin_loi.mp3',
  '/audio/khong_sao.mp3',
  '/audio/duoc.mp3',
  '/audio/khong_duoc.mp3',
  '/audio/roi.mp3',
  '/audio/khong_van_de.mp3',
  '/audio/doi_mot_chut.mp3',
  '/audio/nhanh_len.mp3',
  '/audio/cham_lai.mp3',
  '/audio/toi_khong_hieu.mp3',
  '/audio/noi_lai_mot_lan.mp3',
  '/audio/toi_nghe_khong_hieu.mp3',
  '/audio/an_com_chua.mp3',
  '/audio/an_com.mp3',
  '/audio/ngon.mp3',
  '/audio/khong_ngon.mp3',
  '/audio/nuoc.mp3',
  '/audio/nuoc_nong.mp3',
  '/audio/nuoc_lanh.mp3',
  '/audio/bao_nhieu_tien.mp3',
  '/audio/mua_cai_nay.mp3',
  '/audio/di_lam.mp3',
  '/audio/tan_ca.mp3',
  '/audio/nghi.mp3',
  '/audio/tang_ca.mp3',
  '/audio/hom_nay.mp3',
  '/audio/ngay_mai.mp3',
  '/audio/hom_qua.mp3',
  '/audio/co_van_de.mp3',
  '/audio/khong.mp3',
  '/audio/mot.mp3',
  '/audio/hai.mp3',
  '/audio/ba.mp3',
  '/audio/bon.mp3',
  '/audio/nam.mp3',
  '/audio/sau.mp3',
  '/audio/bay.mp3',
  '/audio/tam.mp3',
  '/audio/chin.mp3',
  '/audio/muoi.mp3',
  '/audio/muoi_mot.mp3',
  '/audio/hai_muoi.mp3',
  '/audio/hai_muoi_mot.mp3',
  '/audio/hai_muoi_lam.mp3',
  '/audio/ba_muoi.mp3',
  '/audio/bon_muoi_lam.mp3',
  '/audio/chin_muoi_chin.mp3',
  '/audio/mot_tram.mp3',
  '/audio/mot_nghin.mp3',
  '/audio/mot_ngan.mp3',
  '/audio/muoi_nghin.mp3',
  '/audio/mot_tram_nghin.mp3',
  '/audio/mot_trieu.mp3',
  '/audio/hai_trieu.mp3',
  '/audio/nam_trieu.mp3',
  '/audio/muoi_trieu.mp3',
  '/audio/da.mp3',
  '/audio/tu_tu.mp3',
  '/audio/duoc_roi.mp3',
  '/audio/toi_khong_hieu_tieng_viet.mp3',
  '/audio/noi_cham_lai_mot_chut.mp3',
  '/audio/noi_lai_mot_lan_duoc_khong.mp3',
  '/audio/dong.mp3',
  '/audio/nam_nghin_dong.mp3',
  '/audio/muoi_nghin_dong.mp3',
  '/audio/nam_muoi_nghin_dong.mp3',
  '/audio/mot_tram_nghin_dong.mp3',
  '/audio/ba_tram_nghin_dong.mp3',
  '/audio/nam_tram_nghin_dong.mp3',
  '/audio/mot_trieu_dong.mp3',
  '/audio/hai_trieu_dong.mp3',
  '/audio/nam_trieu_dong.mp3',
  '/audio/muoi_trieu_dong.mp3',
  '/audio/dat_qua.mp3',
  '/audio/bot_di_mot_chut.mp3',
  '/audio/chi_ba_tram_nghin_thoi.mp3',
  '/audio/cai_nay_hai_trieu_ruoi.mp3',
  '/audio/tra_bang_the_duoc_khong.mp3',
  '/audio/toi_tra_tien_mat.mp3',
  '/audio/co_the_giam_gia_khong.mp3',
  '/audio/lam_on_cho_hoa_don.mp3',
  '/audio/cho_hoi_di_ga_xe_lua_the_nao.mp3',
  '/audio/o_day_cach_trung_tam_xa_khong.mp3',
  '/audio/re_trai.mp3',
  '/audio/re_phai.mp3',
  '/audio/di_thang.mp3',
  '/audio/nga_tu_tiep_theo.mp3',
  '/audio/tram_xe_buyt_o_dau.mp3',
  '/audio/ga_tau_dien_ngam_o_dau.mp3',
  '/audio/gan_day_co_cua_hang_tien_loi_khong.mp3',
  '/audio/goi_mot_chiec_grab.mp3',
  '/audio/di_den_cho_nay.mp3',
  '/audio/di_san_bay_bao_nhieu_tien.mp3',
  '/audio/tra_tien_mat_duoc_khong.mp3',
  '/audio/bat_dieu_hoa_giup_toi.mp3',
  '/audio/dung_o_day_giup_toi.mp3',
  '/audio/co_cho_thue_xe_may_khong.mp3',
  '/audio/mu_bao_hiem_o_dau.mp3',
  '/audio/con_phong_trong_khong.mp3',
  '/audio/mot_dem_bao_nhieu_tien.mp3',
  '/audio/toi_muon_dat_mot_phong.mp3',
  '/audio/co_wifi_khong.mp3',
  '/audio/an_sang_co_kem_theo_khong.mp3',
  '/audio/gio_tra_phong_la_may_gio.mp3',
  '/audio/co_the_tra_phong_muon_duoc_khong.mp3',
  '/audio/phong_co_nuoc_nong_khong.mp3',
  '/audio/toi_bi_benh.mp3',
  '/audio/toi_bi_sot.mp3',
  '/audio/toi_dau_dau.mp3',
  '/audio/toi_dau_bung.mp3',
  '/audio/benh_vien_gan_nhat_o_dau.mp3',
  '/audio/toi_can_gap_bac_si.mp3',
  '/audio/toi_bi_di_ung.mp3',
  '/audio/thuoc_nay_co_can_toa_khong.mp3',
  '/audio/lam_on_goi_xe_cap_cuu.mp3',
  '/audio/co_thuc_don_khong.mp3',
  '/audio/mon_gi_ngon.mp3',
  '/audio/toi_lay_mon_nay.mp3',
  '/audio/dung_cho_cay.mp3',
  '/audio/dung_cho_rau_mui.mp3',
  '/audio/them_mot_ly_nuoc.mp3',
  '/audio/co_the_goi_mang_ve_khong.mp3',
  '/audio/tinh_tien_cam_on.mp3',
  '/audio/co_the_tinh_rieng_khong.mp3',
  '/audio/co_do_chay_khong.mp3',
  '/audio/cuu_toi_voi.mp3',
  '/audio/lam_on_goi_canh_sat_giup_toi.mp3',
  '/audio/vi_tien_cua_toi_bi_mat_roi.mp3',
  '/audio/ho_chieu_cua_toi_bi_mat_roi.mp3',
  '/audio/toi_bi_lac_duong_roi.mp3',
  '/audio/chay_roi.mp3',
  '/audio/co_nguoi_bi_thuong.mp3',
  '/audio/goi_canh_sat_giup_toi.mp3',
  '/audio/o_day_rat_nguy_hiem.mp3',
  '/audio/toi_muon_doi_tien.mp3',
  '/audio/ty_gia_do_la_my_sang_dong_la_bao_nhieu.mp3',
  '/audio/co_thu_phi_khong.mp3',
  '/audio/o_day_co_dung_duoc_the_unionpay_khong.mp3',
  '/audio/may_atm_gan_nhat_o_dau.mp3',
  '/audio/han_muc_rut_tien_moi_ngay_la_bao_nhieu.mp3',
  '/audio/co_the_doi_nhan_dan_te_khong.mp3',
  '/audio/lam_on_cho_toi_bien_lai.mp3'
];

// 安装时缓存资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// 激活时清理旧缓存
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 拦截请求，优先走网络，失败则用缓存
self.addEventListener('fetch', (event) => {
  // 只处理 GET 请求
  if (event.request.method !== 'GET') return;

  // 对于音频等静态资源，使用缓存优先策略
  if (event.request.destination === 'audio' || event.request.url.includes('/audio/')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return fetch(event.request).then((response) => {
          // 更新缓存
          if (response && response.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, response.clone());
            });
          }
          return response;
        }).catch(() => {
          // 网络失败，返回缓存
          return cached || fetch(event.request);
        });
      })
    );
  } else {
    // 其他资源（HTML/CSS/JS）：网络优先
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  }
});