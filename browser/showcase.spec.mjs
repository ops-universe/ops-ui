import {test,expect} from '@playwright/test';import {assertAccessible,observeBrowserErrors,assertNoHorizontalOverflow,assertMainNavigation} from './helpers.mjs';
test('search opens by keyboard, filters and returns focus',async({page})=>{await page.goto('/');const trigger=page.getByRole('button',{name:/Search/});await trigger.focus();await page.keyboard.press('Control+k');const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible();await expect(dialog.getByRole('searchbox')).toBeFocused();await dialog.getByRole('searchbox').fill('engineering');await expect(dialog.getByRole('link',{name:/Documentation/})).toBeVisible();await expect(dialog.getByRole('link',{name:/Components/})).toHaveCount(0);await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(trigger).toBeFocused();});
test('mobile disclosure opens and closes',async({page})=>{await page.setViewportSize({width:390,height:844});await page.goto('/');const menu=page.getByRole('button',{name:'Menu'});await expect(menu).toBeVisible();await menu.click();await expect(menu).toHaveAttribute('aria-expanded','true');await expect(page.getByRole('navigation',{name:'Mobile navigation'})).toBeVisible();await page.keyboard.press('Escape');await expect(menu).toHaveAttribute('aria-expanded','false');});
test('theme persists and palette changes',async({page})=>{await page.goto('/');await page.getByRole('button',{name:'dark',exact:true}).click();await page.getByLabel('Project palette').selectOption('evalops');await expect(page.locator('.ops-root')).toHaveAttribute('data-project','evalops');await page.reload();await expect(page.locator('.ops-root')).toHaveAttribute('data-theme','dark');});
test('showcase and open search accessibility',async({page})=>{await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');for(const theme of ['light','dark']){await page.getByRole('button',{name:theme,exact:true}).click();await assertAccessible(page);}await page.getByRole('button',{name:/Search/}).click();await assertAccessible(page);});

test('shared browser smoke checks at desktop and mobile sizes', async ({page}) => {
  const errors=observeBrowserErrors(page);
  try {
    for (const width of [1280,390]) {
      await page.setViewportSize({width,height:844});
      await assertMainNavigation(page,{path:'/',name:'Engineer with a shared language.'});
      await assertNoHorizontalOverflow(page);
    }
    errors.assertClean();
  } finally { errors.dispose(); }
});
test('shared error observer detects errors and detaches', async ({page}) => {
  const errors=observeBrowserErrors(page);
  await page.goto('/');
  const seen=page.waitForEvent('console',{predicate:m=>m.type()==='error'});
  await page.evaluate(()=>console.error('synthetic browser error'));
  await seen;
  expect(()=>errors.assertClean()).toThrow(/synthetic browser error/);
  errors.dispose();
});
