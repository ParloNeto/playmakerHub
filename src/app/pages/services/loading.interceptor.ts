import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import {inject} from "@angular/core";
import {finalize} from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import { SkipLoading } from "../../shared/components/loader/skip-loading.component";

export const loadingInterceptor: HttpInterceptorFn =
  (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    if(req.context.get(SkipLoading)) {
     return next(req);
    }
    const loading = inject(NgxSpinnerService)
    loading.show();
    return next(req)
      .pipe(
        finalize(() => {
          loading.hide()
        })
      )
  }
