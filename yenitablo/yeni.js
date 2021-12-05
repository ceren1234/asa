let globalEditID;
$(document).ready(function() {
    // Activate tooltip
    $('[data-toggle="tooltip"]').tooltip();
    loadTable(data);
});

function loadTable(array) {
    $("#body").empty();
    for (let i = 0; i < array.length; i++) {
        $("#body").append(
            `<tr>` +
            `<td>${array[i].ad}</td>` + // Adi
            `<td>${array[i].soyad}</td>` + // Soyadi
            `<td>${array[i].yas}</td>` + // yas
            `<td>` +
            `   <a href="#" data-id="${array[i].id}" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>` +
            `   <a href="#" class="delete" data-index="${i}" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>` +
            `</td>` +
            `</tr>`
        );
    }
    $('[data-toggle="tooltip"]').tooltip();
}
$(document).on("click", "#modalEkle", function() {
    $("#addModalTitle").text("Ekle");
    $("#ekle").val("Ekle");
});
$(document).on("click", "#ekle", function() {
    let val = $(this).val();
    console.log(val);
    if (val == "Ekle") {
        ekle();
    } else {
        duzenle(globalEditID);
    }
});

function ekle() {
    let ad = $("#ad").val(); // değer alma  // $("#ad").val("gazihan"); // -->> değer atama 
    let soyad = $("#soyad").val();
    let yas = $("#yas").val();
    data.push({ // eklemek 
        "id": data[data.length - 1].id + 1,
        "ad": ad,
        "soyad": soyad,
        "yas": yas
    })
    loadTable(data); // tabloyu doldur
    $("#addEmployeeModal").modal("hide"); // modalın kapanması
    temizle();
}

function bul(id) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            $("#ad").val(data[i].ad);
            $("#soyad").val(data[i].soyad);
            $("#yas").val(data[i].yas);
        }
    }
}
$(document).on("click", ".edit", function() {
    $("#addModalTitle").text("Düzenle");
    $("#ekle").val("Düzenle");
    let id = $(this).attr("data-id");
    $("#addEmployeeModal").modal("show"); // modalın açılması
    temizle();
    globalEditID = id;
    bul(id);
});

function duzenle(id) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) { // buldum
            data[i].ad = $("#ad").val();
            data[i].soyad = $("#soyad").val();
            data[i].yas = $("#yas").val();
        }
    }
    loadTable(data); // tabloyu doldur
    $("#addEmployeeModal").modal("hide"); // modalın kapanması
    temizle();
}
$(document).on("click", ".delete", function() {
    let index = $(this).attr("data-index");
    data.splice(index, 1);
    loadTable(data); // tabloyu doldur
});

function ara(kelime) {
    let array = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].ad.includes(kelime)) {
            array.push(data[i]);
        }
    }
    loadTable(array);
}
$(document).on("keyup", "#search", function(e) {
    let val = $(this).val();
    if (e.keyCode === 13) {
        e.preventDefault();
        console.log(val);
        if (val == "") {
            console.log("val bos")
            loadTable(data);
        } else {
            ara(val);
        }
    }
})
function ara(kelime) {
    let array = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].soyad.includes(kelime)) {
            array.push(data[i]);
        }
    }
    loadTable(array);
}
$(document).on("keyup", "#search", function(e) {
    let val = $(this).val();
    if (e.keyCode === 13) {
        e.preventDefault();
        console.log(val);
        if (val == "") {
            console.log("val bos")
            loadTable(data);
        } else {
            ara(val);
        }
    }
})


function temizle() {
    $("#ad").val("");
    $("#soyad").val("");
    $("#yas").val("");
}
let data = [{
        "id": 0,
        "ad": "Gazihan",
        "soyad": "Demir",
        "yas": 25
    },
    {
        "id": 1,
        "ad": "Ceren",
        "soyad": "Madenli",
        "yas": 20
    },
    {
        "id": 2,
        "ad": "Cihad",
        "soyad": "ağanoğlu",
        "yas": 30
    },
    {
        "id": 3,
        "ad": "Samet",
        "soyad": "ağanoğlu",
        "yas": 27
    }
]