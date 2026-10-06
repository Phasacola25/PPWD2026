$(document).ready(function () {
    let cart = [];
    $('.btn-tambah').click(function () {
        let nama = $(this).data('nama');
        let harga = Number(
            $(this).data('harga')
        );
        let produk = cart.find(function (item) {
            return item.nama === nama;
        });
        if (produk) {
            produk.qty++;
        } else {
            cart.push({
                nama: nama,
                harga: harga,
                qty: 1
            });
        }
        updateCartUI();
    });
    function updateCartUI() {
        $('#cartItems').empty();
        if (cart.length === 0) {
            $('#cartItems').html(
                '<p>Keranjang masih kosong.</p>'
            );
            $('#cartSubtotal').text('Rp0');
            $('#cartDiscount').text('Rp0');
            $('#cartTotal').text('Rp0');
            return;
        }
        cart.forEach(function (item, index) {
            let subtotal =
                item.harga * item.qty;
            let itemHTML = `
                <div class="item-cart">
                    <strong>
                        ${item.nama}
                    </strong>
                    <br>
                    Rp${item.harga.toLocaleString('id-ID')}
                    × ${item.qty}
                    =
                    Rp${subtotal.toLocaleString('id-ID')}
                    <button
                        class="btn-hapus"
                        data-index="${index}">
                        Hapus
                    </button>
                </div>
            `;
            $('#cartItems').append(
                itemHTML
            );
        });
        let totalHarga = cart.reduce(
            function (sum, item) {
                return sum +
                    (item.harga * item.qty);
            },
            0
        );
        let diskon = 0;
        if (totalHarga > 100000) {
            diskon =
                totalHarga * 0.1;
        }
        let totalBayar =
            totalHarga - diskon;
        $('#cartSubtotal').text(
            'Rp' +
            totalHarga.toLocaleString('id-ID')
        );
        $('#cartDiscount').text(
            'Rp' +
            diskon.toLocaleString('id-ID')
        );
        $('#cartTotal').text(
            'Rp' +
            totalBayar.toLocaleString('id-ID')
        );
    }
    $(document).on(
        'click',
        '.btn-hapus',
        function () {
            let index =
                $(this).data('index');
            cart.splice(index, 1);
            updateCartUI();
        }
    );
    $('#btnCheckout').click(function () {
        if (cart.length === 0) {
            alert(
                'Keranjang masih kosong.'
            );
            return;
        }
        $('#modalPembeli').fadeIn();
    });
    $('#btnBatal').click(function () {
        $('#modalPembeli').fadeOut();
    });
    $('#formPembeli').submit(
        function (event) {
            event.preventDefault();
            $('.pesan-error')
                .hide()
                .text('');
            let nama =
                $('#nama')
                    .val()
                    .trim();
            let alamat =
                $('#alamat')
                    .val()
                    .trim();
            let nohp =
                $('#nohp')
                    .val()
                    .trim();
            let valid = true;
            if (nama === '') {
                $('#errorNama')
                    .text(
                        'Nama wajib diisi.'
                    )
                    .show();
                valid = false;
            } else if (nama.length < 3) {
                $('#errorNama')
                    .text(
                        'Nama minimal 3 karakter.'
                    )
                    .show();
                valid = false;
            }
            if (alamat === '') {
                $('#errorAlamat')
                    .text(
                        'Alamat wajib diisi.'
                    )
                    .show();
                valid = false;
            }
            let hpRegex =
                /^[0-9]+$/;
            if (nohp === '') {
                $('#errorHp')
                    .text(
                        'No HP wajib diisi.'
                    )
                    .show();
                valid = false;
            } else if (
                !hpRegex.test(nohp)
            ) {
                $('#errorHp')
                    .text(
                        'No HP hanya boleh berisi angka.'
                    )
                    .show();
                valid = false;
            }
            if (valid) {
                let totalHarga =
                    cart.reduce(
                        function (sum, item) {
                            return sum +
                                (item.harga * item.qty);
                        },
                        0
                    );
                let diskon = 0;
                if (totalHarga > 100000) {
                    diskon =
                        totalHarga * 0.1;
                }
                let totalBayar =
                    totalHarga - diskon;
                let totalQty =
                    cart.reduce(
                        function (sum, item) {
                            return sum + item.qty;
                        },
                        0
                    );
                simpanRiwayat(
                    totalBayar,
                    totalQty
                );
                $('#hasilNama')
                    .text(nama);
                $('#hasilAlamat')
                    .text(alamat);
                $('#hasilHp')
                    .text(nohp);
                $('#hasilQty')
                    .text(totalQty);
                $('#hasilTotal')
                    .text(
                        'Rp' +
                        totalBayar.toLocaleString('id-ID')
                    );
                $('#hasilCheckout')
                    .fadeIn();
                $('#modalPembeli')
                    .fadeOut();
                cart = [];
                updateCartUI();
                $('#formPembeli')[0].reset();
            }
        }
    );
    function simpanRiwayat(total, qty) {
        const riwayat =
            JSON.parse(
                localStorage.getItem(
                    'riwayat'
                )
            ) || [];
        riwayat.push({
            tanggal:
                new Date().toISOString(),
            total: total,
            qty: qty
        });
        localStorage.setItem(
            'riwayat',
            JSON.stringify(riwayat)
        );
    }
});