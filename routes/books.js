var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

router.get('/categories', function(req, res, next) {
    dbConn.query('SELECT * FROM efoodcategory ORDER BY catId desc',function(err,rows)     {
        if(err) {
            req.flash('error', err);
            res.render('books/categories',{data:''});   
        } else {
            res.render('books/categories',{data:rows});
        }
    });
});
router.get('/menuItems', function(req, res, next) {
    dbConn.query('SELECT * FROM fooditem ORDER BY foodId desc',function(err,rows){
        if(err) {
            req.flash('error', err);
            res.render('books/menuItems',{data:''});   
        } else {
            res.render('books/menuItems',{data:rows});
        }
    });
});
router.get('/foodCategory', function(req, res, next) {
    dbConn.query('SELECT * FROM efoodcategory',function(err,rows)     {
        if(err) {
            req.flash('error', err);
            res.render('books/foodCategory',{data:''});   
        } else {
            res.render('books/foodCategory',{data:rows});
        }
    });
});
router.get('/food/(:catId)', function(req, res, next) {
    let catId = req.params.catId;
    dbConn.query('SELECT * FROM food_has_category INNER JOIN fooditem ON fooditem.foodId = food_has_category.foodId INNER JOIN efoodcategory ON efoodcategory.catId = food_has_category.catId WHERE food_has_category.catId =' + catId,function(err,rows)     {
        if(err) {
            req.flash('error', err);
            res.render('books/food',{data:''});   
        } else {
            res.render('books/food',{data:rows});
        }
    });
});
//----------------------------------------------------------------- ADD Categories
// display add book page
router.get('/addCategories', function(req, res, next) {    
    res.render('books/addCategories', {
        catName         : '',
        catDescription  : '',    
        catImage        : ''   
    })
})
router.post('/addCategories', function(req, res, next) {    

    let catName         = req.body.catName;
    let catDescription  = req.body.catDescription;
    let errors          = false;

    if (!req.files)
		return res.status(400).send('No files were uploaded.');
 
    var file = req.files.catImage;
    let catImage=file.name;
    
    if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" )
    {               
        file.mv('public/stylesheets/images/'+file.name, function(err) 
        {         
            if (err)
                return res.status(500).send(err);
                if(catName.length === 0 || catDescription.length === 0 ) {
                errors = true;
                // set flash message
                req.flash('error', "Please enter name");
                // render to add.ejs with flash message
                res.render('books/addCategories', {
                    catName    : catName,
                    catDescription   : catDescription,
                    catImage   : catImage
                })
            }
            // if no error
            if(!errors) {
                var form_data = {
                    catName : catName,
                    catDescription: catDescription,
                    catImage: catImage
                }
                
                // insert query
                dbConn.query('INSERT INTO efoodcategory SET ?', form_data, function(err, result) {
                    //if(err) throw err
                    if (err) {
                        req.flash('error', err)
                        // render to add.ejs
                        res.render('books/addCategories', {
                            catName: form_data.catName,
                            catDescription: form_data.catDescription,
                            catImage: form_data.catImage
                        })
                    } else {                
                        req.flash('success', 'ITEM successfully added');
                        res.redirect('/books/categories');
                    }
                })
            }
        });
    }
})
// --------------------------------------------------------------- Edit Categories
router.get('/editCategories/(:catId)', function(req, res, next) {
    let catId = req.params.catId;
    dbConn.query('SELECT * FROM efoodcategory WHERE catId = ' + catId, function(err, rows, fields) {
        if(err) throw err
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Category not found with catId = ' + catId)
            res.redirect('/books/editCategories')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('books/editCategories', {
                title: 'Edit Category', 
                catId: rows[0].catId,
                catName: rows[0].catName,
                catDescription: rows[0].catDescription,
                catImage: rows[0].catImage
            })
        }
    })
})

// update book data
router.post('/updateCat/:catId', function(req, res, next) {
    if (!req.files) {
        let catId           = req.params.catId;
        let catName         = req.body.catName;
        let catDescription  = req.body.catDescription;
        let catImage        = req.body.catImage;
        let errors          = false;
        
        if(catName.length === 0 || catDescription.length === 0) {
            errors = true;
            
            // set flash message
            req.flash('error', "Please enter name");
            // render to add.ejs with flash message
            res.render('books/editCategories', {
                catId:          req.params.catId,
                catName:        catName,
                catDescription: catDescription,
                catImage:       catImage
            })
        }
        // if no error
        if( !errors ) {   
     
            var form_data = {
                catName:        catName,
                catDescription: catDescription,
                catImage:       catImage
            }
            // update query
            dbConn.query('UPDATE efoodcategory SET ? WHERE catId = ' + catId, form_data, function(err, result) {
                //if(err) throw err
                if (err) {
                    // set flash message
                    req.flash('error', err)
                    // render to edit.ejs
                    res.render('books/editCategories', {
                        catId:          req.params.catId,
                        catName:        form_data.catName,
                        catDescription: form_data.catDescription,
                        catImage:       form_data.catImage
                    })
                } else {
                    req.flash('success', 'Category successfully updated');
                    res.redirect('/books/categories');
                }
            })
        }
    } else
    {
        let catId           = req.params.catId;
        let catName         = req.body.catName;
        let catDescription  = req.body.catDescription;
        let errors          = false;
        var file        = req.files.catImage;
        let catImage   = file.name;
    
        if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" )
        {   
            file.mv('public/stylesheets/images/'+file.name, function(err) 
            { 
                if(catName.length === 0 || catDescription.length === 0) {
                    errors = true;
                    // set flash message
                    req.flash('error', "Please enter informations");
                    // render to add.ejs with flash message
                    res.render('books/editCategories', {
                        catId:          req.params.catId,
                        catName:        catName,
                        catDescription: catDescription,
                        catImage:       catImage
                    })
                }
                // if no error
                if( !errors ) {   
            
                    var form_data = {
                        catName:        catName,
                        catDescription: catDescription,
                        catImage:       catImage
                    }
                    // update query
                    dbConn.query('UPDATE efoodcategory SET ? WHERE catId = ' + catId, form_data, function(err, result) {
                        //if(err) throw err
                        if (err) {
                            // set flash message
                            req.flash('error', err)
                            // render to edit.ejs
                            res.render('books/editCategories', {
                                catId:          req.params.catId,
                                catName:        form_data.catName,
                                catDescription: form_data.catDescription,
                                catImage:       catImage
                            })
                        } else {
                            req.flash('success', 'Category successfully updated');
                            res.redirect('/books/categories');
                        }
                    })
                }
            });
        }
    }
})
// --------------------------------------------------------------- End Edit Categories
// --------------------------------------------------------------- Delete Category
// delete book
router.get('/deleteCat/(:catId)', function(req, res, next) {

    let catId = req.params.catId;
     
    dbConn.query('DELETE FROM efoodcategory WHERE catId = ' + catId, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            res.redirect('/books/categories')
        } else {
            // set flash message
            req.flash('success', 'Category successfully deleted! ID = ' + catId)
            res.redirect('/books/categories')
        }
    })
})
// --------------------------------------------------------------- End Delete Category


//----------------------------------------------------------------- ADD FoodItem
router.get('/foodAdd', function(req, res, next) {    
    // render to add.ejs
    res.render('books/foodAdd', {
        foodName         : '',
        foodDescription  : '',
        foodPrice: '',    
        foodImage        : ''   
    })
})
// add a new book
router.post('/foodAdd', function(req, res, next) {    

    let foodName            = req.body.foodName;
    let foodDescription     = req.body.foodDescription;
    let foodPrice           = req.body.foodPrice;
    let errors              = false;

    if (!req.files)
		return res.status(400).send('No files were uploaded.');
 
    var file = req.files.foodImage;
    let foodImage=file.name;
    
    if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" )
    {   
        file.mv('public/stylesheets/images/'+file.name, function(err) 
        {         
            if(foodName.length === 0 || foodDescription.length === 0 ) {
                errors = true;
                // set flash message
                req.flash('error', "Please enter informations");
                // render to add.ejs with flash message
                res.render('books/foodAdd', {
                    foodName    : foodName,
                    foodDescription   : foodDescription,
                    foodPrice   : foodPrice,
                    foodImage   : foodImage
                })
            }
            // if no error
            if(!errors) {
                var form_data = {
                    foodName : foodName,
                    foodDescription: foodDescription,
                    foodPrice: foodPrice,
                    foodImage: foodImage
                }
                
                // insert query
                dbConn.query('INSERT INTO fooditem SET ?', form_data, function(err, result) {
                    //if(err) throw err
                    if (err) {
                        req.flash('error', err)
                        // render to add.ejs
                        res.render('books/foodAdd', {
                            foodName: form_data.foodName,
                            foodDescription: form_data.foodDescription,
                            foodPrice: form_data.foodPrice,
                            foodImage: form_data.foodImage
                        })
                    } else {                
                        req.flash('success', 'Food successfully added');
                        res.redirect('/books/menuItems');
                    }
                })
            }
        });
    }
})
//---------------------------------------------------------------- END Add FoodItem
// --------------------------------------------------------------- Edit FoodItem
// display edit book page
router.get('/foodEdit/(:foodId)', function(req, res, next) {
    let foodId = req.params.foodId;
    dbConn.query('SELECT * FROM fooditem WHERE foodId = ' + foodId, function(err, rows, fields) {
        if(err) throw err
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Food not found with foodId = ' + foodId)
            res.redirect('/books/foodEdit')
        }
        else {
            // render to edit.ejs
            res.render('books/foodEdit', {
                title: 'Edit Food ITEM', 
                foodId: rows[0].foodId,
                foodName: rows[0].foodName,
                foodDescription: rows[0].foodDescription,
                foodPrice: rows[0].foodPrice,
                foodImage: rows[0].foodImage
            })
        }
    })
})

// update book data
router.post('/updateFod/:foodId', function(req, res, next) {

    if (!req.files) 
    {
        let foodId           = req.params.foodId;
        let foodName         = req.body.foodName;
        let foodDescription  = req.body.foodDescription;
        let foodPrice        = req.body.foodPrice;
        let foodImage        = req.body.foodImage;
        let errors          = false;

        if(foodName.length === 0 || foodDescription.length === 0) {
            errors = true;
            
            // set flash message
            req.flash('error', "Please enter informations");
            // render to add.ejs with flash message
            res.render('books/foodEdit', {
                foodId:             req.params.foodId,
                foodName:           foodName,
                foodDescription:    foodDescription,
                foodPrice:          foodPrice,
                foodImage:          foodImage
            })
        }
        // if no error
        if( !errors ) {   
     
            var form_data = {
                foodName:        foodName,
                foodDescription: foodDescription,
                foodPrice:       foodPrice,
                foodImage:       foodImage,
            }
            // update query
            dbConn.query('UPDATE fooditem SET ? WHERE foodId = ' + foodId, form_data, function(err, result) {
                //if(err) throw err
                if (err) {
                    // set flash message
                    req.flash('error', err)
                    // render to edit.ejs
                    res.render('books/foodEdit', {
                        foodId:          req.params.foodId,
                        foodName:        form_data.foodName,
                        foodDescription: form_data.foodDescription,
                        foodPrice:       form_data.foodPrice,
                        foodImage:       form_data.foodImage
                    })
                } else {
                    req.flash('success', 'Food successfully updated');
                    res.redirect('/books/menuItems');
                }
            })
        }
    }else
    {
        let foodId           = req.params.foodId;
        let foodName         = req.body.foodName;
        let foodDescription  = req.body.foodDescription;
        let foodPrice        = req.body.foodPrice;
        let errors          = false;

        if (!req.files)
            return res.status(400).send('No files were uploaded.');
    
        var file        = req.files.foodImage;
        let foodImage   = file.name;
        
        if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" )
        {   
            file.mv('public/stylesheets/images/'+file.name, function(err) 
            { 
                if(foodName.length === 0 || foodDescription.length === 0) {
                    errors = true;
                    
                    // set flash message
                    req.flash('error', "Please enter informations");
                    // render to add.ejs with flash message
                    res.render('books/foodEdit', {
                        foodId:             req.params.foodId,
                        foodName:           foodName,
                        foodDescription:    foodDescription,
                        foodPrice:          foodPrice,
                        foodImage:          foodImage
                    })
                }
                // if no error
                if( !errors ) {   
            
                    var form_data = {
                        foodName:        foodName,
                        foodDescription: foodDescription,
                        foodPrice:       foodPrice,
                        foodImage:       foodImage,
                    }
                    // update query
                    dbConn.query('UPDATE fooditem SET ? WHERE foodId = ' + foodId, form_data, function(err, result) {
                        //if(err) throw err
                        if (err) {
                            // set flash message
                            req.flash('error', err)
                            // render to edit.ejs
                            res.render('books/foodEdit', {
                                foodId:          req.params.foodId,
                                foodName:        form_data.foodName,
                                foodDescription: form_data.foodDescription,
                                foodPrice:       form_data.foodPrice,
                                foodImage:       foodImage
                            })
                        } else {
                            req.flash('success', 'Food successfully updated');
                            res.redirect('/books/menuItems');
                        }
                    })
                }
            });
        }
    }
})
// --------------------------------------------------------------- End Edit FoodItem
// --------------------------------------------------------------- Delete FoodItem
// delete book
router.get('/deleteFod/(:foodId)', function(req, res, next) {
    let foodId = req.params.foodId;
    dbConn.query('DELETE FROM fooditem WHERE foodId = ' + foodId, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to books page
            res.redirect('/books/menuItems')
        } else {
            // set flash message
            req.flash('success', 'Food Item successfully deleted! ID = ' + foodId)
            // redirect to books page
            res.redirect('/books/menuItems')
        }
    })
})
// --------------------------------------------------------------- End Delete FoodItem
module.exports = router;