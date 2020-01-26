INSERT INTO role (id, name) 
VALUES (1, 'USER');

INSERT INTO ingredient (id, alc, gas, name, price, taste, vol)
VALUES (1, false, true, 'mirinda', 4.50, 'slodki', 0);

INSERT INTO ingredient (id, alc, gas, name, price, taste, vol)
VALUES (2, true, false, 'jim beam', 35.00, 'debowy', 40);

INSERT INTO ingredient (id, alc, gas, name, price, taste, vol)
VALUES (3, false, true, 'cola', 4.50, 'slodki', 0);

INSERT INTO ingredient (id, alc, gas, name, price, taste, vol)
VALUES (4, false, false, 'sok pomaranczowy', 4.50, 'slodki', 0);

INSERT INTO ingredient (id, alc, gas, name, price, taste, vol)
VALUES (5, true, true, 'vodka', 25.00, 'gorzki', 40);

INSERT INTO ingredient (id, alc, gas, name, price, taste, vol)
VALUES (6, false, false, 'blue curacao', 20, 'slodki', 0);

INSERT INTO ingredient (id, alc, gas, name, price, taste, vol)
VALUES (7, false, false, 'sok zurawinowy', 10, 'slodki', 0);

INSERT INTO ingredient (id, alc, gas, name, price, taste, vol)
VALUES (8, false, true, 'schnapps brzoskwiniowy', 15, 'slodki', 0);

INSERT INTO drink (id, drink_desc, name, photo_path, price, taste, vol)
VALUES (1, 'najpierw welawamy wodke, nastepnie sok pomaranczowy, potem sprite, na koniec blue curacao. Jak gesty sok opadnie na samo dno mieszamy wszystko razem', 'zielona zabka', 'zielona_zabka.jpg', 10, 'slodki cytryowy delikatnie gazowany', 10);

INSERT INTO drink (id, drink_desc, name, photo_path, price, taste, vol)
VALUES (2, 'Wszystkie skladniki, poza sokiem zurawinowym, wlewamy do shakera i wstrzasamy. Do szklanki, wypełnionej do połowy kostkami lodu, przelewamy zawartosc shakera i dolewamy sok zurawinowy. Całość ozdabiamy np. kawałkiem pomaranczy', 'sex on the beach', 'Sex-On-The-Beach.jpg', 15, 'gesty mocno odczuwalna słodycz', 10);

INSERT INTO amount (id, amount, drink_id, ingredient_id)
VALUES (1, 40, 2, 5);

INSERT INTO amount (id, amount, drink_id, ingredient_id)
VALUES (2, 40, 2, 4);

INSERT INTO amount (id, amount, drink_id, ingredient_id)
VALUES (3, 40, 2, 7);

INSERT INTO amount (id, amount, drink_id, ingredient_id)
VALUES (4, 20, 2, 8);

INSERT INTO amount (id, amount, drink_id, ingredient_id)
VALUES (5, 40, 1, 5);

INSERT INTO amount (id, amount, drink_id, ingredient_id)
VALUES (6, 30, 1, 6);

INSERT INTO amount (id, amount, drink_id, ingredient_id)
VALUES (7, 120, 1, 4);
