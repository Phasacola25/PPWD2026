
// Mengurangi animasi jika pengguna memilih reduced motion
jQuery.fx.off = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


$(document).ready(function () {

    // 1. DROPDOWN NAVBAR
    // Event: mouseenter dan mouseleave
    // Effect: slideDown dan slideUp

    $(".dropdown").on("mouseenter", function () {

        $(this).find(".dropdown-menu")
            .stop(true, true)
            .slideDown(200);

    });

    $(".dropdown").on("mouseleave", function () {

        $(this).find(".dropdown-menu")
            .stop(true, true)
            .slideUp(200);

    });


    // 2. TAB PRODUK
    // Event: click
    // Effect: fadeIn dan fadeOut

    $(".tab").on("click", function () {

        const target = $(this).data("target");

        // Menghapus status aktif dari semua tab
        $(".tab").removeClass("active");

        // Mengaktifkan tab yang dipilih
        $(this).addClass("active");

        // Menyembunyikan seluruh panel
        $(".tab-panel").hide();

        // Menampilkan panel yang dipilih
        $(target).stop(true, true).fadeIn(300);

    });


    // 3. ANIMASI KARTU PRODUK
    // Event: mouseenter dan mouseleave
    // Effect: animate

    $(".menu-card").on("mouseenter", function () {

        $(this).stop(true).animate({
            top: "-6px"
        }, 200);

    });

    $(".menu-card").on("mouseleave", function () {

        $(this).stop(true).animate({
            top: "0px"
        }, 200);

    });


    // 4. FORM FOCUS DAN BLUR

    $(".form-box input, .form-box select, .form-box textarea")
        .on("focus", function () {

            $(this).removeClass("is-error");

        })
        .on("blur", function () {

            // Contoh interaksi ketika input ditinggalkan
            if ($(this).val().trim() === "") {
                $(this).addClass("is-error");
            }

        });


    // 5. TOAST NOTIFICATION

    function tampilkanToast(pesan, tipe) {

        $("#toast")
            .stop(true, true)
            .removeClass("toast-success toast-error")
            .addClass(tipe)
            .text(pesan)
            .fadeIn(250)
            .delay(2500)
            .fadeOut(400);

    }


    // 6. CUSTOM VALIDATION NOMOR HP

    $.validator.addMethod(
        "nomorHp",
        function (value, element) {

            return this.optional(element) ||
                /^08[0-9]{8,11}$/.test(value);

        },
        "Nomor HP harus diawali 08 dan berisi 10-13 digit."
    );


    // 7. JQUERY VALIDATION PLUGIN

    const validator = $("#formPesan").validate({

        rules: {

            nama: {
                required: true,
                minlength: 3
            },

            email: {
                required: true,
                email: true
            },

            hp: {
                required: true,
                nomorHp: true
            },

            alamat: {
                required: true,
                minlength: 10
            },

            produk: {
                required: true
            },

            jumlah: {
                required: true,
                digits: true,
                min: 1,
                max: 99
            },

            pembayaran: {
                required: true
            }

        },


        messages: {

            nama: {
                required: "Nama wajib diisi.",
                minlength: "Nama minimal 3 karakter."
            },

            email: {
                required: "Email wajib diisi.",
                email: "Format email tidak valid."
            },

            hp: {
                required: "Nomor HP wajib diisi."
            },

            alamat: {
                required: "Alamat wajib diisi.",
                minlength: "Alamat minimal 10 karakter."
            },

            produk: {
                required: "Silakan pilih produk."
            },

            jumlah: {
                required: "Jumlah pembelian wajib diisi.",
                digits: "Jumlah harus berupa angka.",
                min: "Minimal pembelian 1 produk.",
                max: "Maksimal pembelian 99 produk."
            },

            pembayaran: {
                required: "Silakan pilih metode pembayaran."
            }

        },


        errorElement: "label",
        errorClass: "pesan-error",

        highlight: function (element) {

            $(element)
                .addClass("is-error")
                .removeClass("is-valid");

        },

        unhighlight: function (element) {

            $(element)
                .removeClass("is-error")
                .addClass("is-valid");

        },


        // Jika seluruh validasi berhasil
        submitHandler: function (form) {

            const nama = $("#nama").val().trim();
            const produk = $("#produkPilihan").val();
            const jumlah = $("#jumlah").val();

            tampilkanToast(
                "Pesanan " + produk +
                " sebanyak " + jumlah +
                " unit atas nama " + nama +
                " berhasil dibuat!",
                "toast-success"
            );

            // Mengosongkan form setelah berhasil
            form.reset();

            // Menghapus status validasi sebelumnya
            validator.resetForm();

            $("#formPesan input, #formPesan select, #formPesan textarea")
                .removeClass("is-error is-valid");

            return false;

        }

    });


    // 8. BACK TO TOP
    // Event: scroll dan click
    // Effect: fadeIn, fadeOut, animate

    const btnTop = $("#backToTop");

    $(window).on("scroll", function () {

        if ($(this).scrollTop() > 300) {

            btnTop.stop(true, true).fadeIn(200);

        } else {

            btnTop.stop(true, true).fadeOut(200);

        }

    });

    btnTop.on("click", function () {

        $("html, body").animate({
            scrollTop: 0
        }, 500);

    });


    // 9. SMOOTH SCROLL NAVIGASI

    $('a[href^="#"]').on("click", function (e) {

        const href = $(this).attr("href");

        if (href.length < 2) {
            return;
        }

        const tujuan = $(href);

        if (tujuan.length === 0) {
            return;
        }

        e.preventDefault();

        $("html, body").animate({
            scrollTop: tujuan.offset().top - 65
        }, 500);

    });

});
