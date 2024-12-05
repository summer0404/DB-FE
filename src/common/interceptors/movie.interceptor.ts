import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class MovieInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    console.log(request.body.directors);
    console.log(request.body.actors);
    console.log(request.body.genres);

    if (
      request?.body?.directors != undefined &&
      typeof request?.body?.directors != undefined &&
      request?.body?.directors != null
    ) {
      let hihi = request.body.directors;
      if (request?.body?.directors.indexOf("Map ") != -1) {
        hihi = hihi.replace(/"Map/g, "");
        hihi = hihi.replace(/Map/g, "");
        hihi = hihi.replace(/}"/g, "}");
        hihi = hihi.replace(/\\/g, "");
        if (hihi[0] != "[") {
          hihi = "[" + hihi + "]";
        }
      }
      // let elements = request?.body?.directors.split("},Map {");
      // const n = elements.length;
      // for (let i = 0; i < n; i++) {
      //   if (i == 0) {
      //     elements[i] = elements[i].slice(4);
      //     elements[i] += "}";
      //   } else if (i < n - 1) {
      //     elements[i] = "{" + elements[i];
      //     elements[i] += "}";
      //   } else {
      //     elements[i] = "{" + elements[i];
      //   }
      // }

      // let hihi = "";
      // elements.map((item) => {
      //   hihi += item + ",";
      // });
      // hihi = hihi.slice(0, -1);
      // hihi = "[" + hihi + "]";

      request.body.directors = JSON.parse(hihi);
    }

    if (
      request?.body?.actors != undefined &&
      typeof request?.body?.actors != undefined &&
      request?.body?.actors != null
    ) {
      let hihi = request.body.actors;
      if (request?.body?.actors.indexOf("Map ") != -1) {
        hihi = hihi.replace(/"Map/g, "");
        hihi = hihi.replace(/Map/g, "");
        hihi = hihi.replace(/}"/g, "}");
        hihi = hihi.replace(/\\/g, "");
        if (hihi[0] != "[") {
          hihi = "[" + hihi + "]";
        }
      }
      // console.log(request.body.actors);
      // let elements = request?.body?.actors.split("},Map {");
      // const n = elements.length;
      // for (let i = 0; i < n; i++) {
      //   if (i == 0) {
      //     elements[i] = elements[i].slice(4);
      //     elements[i] += "}";
      //   } else if (i < n - 1) {
      //     elements[i] = "{" + elements[i];
      //     elements[i] += "}";
      //   } else {
      //     elements[i] = "{" + elements[i];
      //   }
      // }

      // let hihi = "";
      // elements.map((item) => {
      //   hihi += item + ",";
      // });
      // hihi = hihi.slice(0, -1);
      // hihi = "[" + hihi + "]";
      // console.log("hihi ", hihi);
      request.body.actors = JSON.parse(hihi);
    }

    if (
      request?.body?.genres != undefined &&
      typeof request?.body?.genres != undefined &&
      request?.body?.genres != null
    ) {
      let hihi = request.body.genres;
      if (request?.body?.genres.indexOf("Map ") != -1) {
        hihi = hihi.replace(/"Map/g, "");
        hihi = hihi.replace(/Map/g, "");
        hihi = hihi.replace(/}"/g, "}");
        hihi = hihi.replace(/\\/g, "");
        if (hihi[0] != "[") {
          hihi = "[" + hihi + "]";
        }
      }
      // let elements = request?.body?.genres.split("},Map {");
      // const n = elements.length;
      // for (let i = 0; i < n; i++) {
      //   if (i == 0) {
      //     elements[i] = elements[i].slice(4);
      //     elements[i] += "}";
      //   } else if (i < n - 1) {
      //     elements[i] = "{" + elements[i];
      //     elements[i] += "}";
      //   } else {
      //     elements[i] = "{" + elements[i];
      //   }
      // }

      // let hihi = "";
      // elements.map((item) => {
      //   hihi += item + ",";
      // });
      // hihi = hihi.slice(0, -1);
      // hihi = "[" + hihi + "]";
      request.body.genres = JSON.parse(hihi);
    }

    console.log("direc ", request.body.directors);
    console.log("acto ", request.body.actors);
    console.log("gen ", request.body.genres);

    return next.handle();
  }
}
